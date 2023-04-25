const config = require("../config/dependency.config.js");
const axios = require("axios");
const client = axios.create({ baseURL: config.decisionEngine.url });

const { loanOutcome, sheet } = require("../mock/mock.js");

exports.requestOutcome = (req, res) => {
  const {
    apiType = "mock",
    businessName,
    loanAmount,
    yearEstablished,
    balanceSheet = sheet,
  } = req.body;
  let preAssessment = 20;

  const profit12Months = balanceSheet
    .slice(0, 12)
    .reduce((acc, curr) => acc + curr.profitOrLoss, 0);

  const assets12MonthsAverage =
    balanceSheet.slice(0, 12).reduce((acc, curr) => acc + curr.assetsValue, 0) /
      balanceSheet.length >
    12
      ? 12
      : balanceSheet.length;

  if (profit12Months > 0) {
    preAssessment = 60;
  }

  if (assets12MonthsAverage > loanAmount) {
    preAssessment = 100;
  }

  const summary = balanceSheet.reduce((acc, entry) => {
    {
      const key = entry["year"];
      acc[key] = acc[key] || 0;
      acc[key] += entry["profitOrLoss"];
      return acc;
    }
  });
  if (apiType === "mock") {
    return res.status(200).json({
      success: true,
      outcome: loanOutcome(loanAmount, preAssessment),
    });
  }
  return client
    .post("/request_decision", {
      businessDetails: {
        name: businessName,
        yearEstablished,
        summary,
      },
      preAssessment,
    })
    .then((outcome) => {
      return res.status(200).json({
        success: true,
        outcome,
      });
    })
    .catch((e) => {
      return res.status(501).json({
        success: false,
        message: "Request to request decision outcome",
      });
    });
};
