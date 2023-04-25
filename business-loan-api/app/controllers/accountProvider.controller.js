const config = require("../config/dependency.config.js");
const axios = require("axios");
const { sheet } = require("../mock/mock.js");
const client = axios.create({ baseURL: config.accountProvider.url });

exports.fetchProviders = (req, res) => {
  return res.status(200).json({
    success: true,
    providers: [
      {
        name: "Xero",
      },
      {
        name: "MYOB",
      },
    ],
  });
};

exports.fetchBalanceSheet = (req, res) => {
  const {
    apiType = "mock",
    loanAmount,
    businessName,
    providerOption, // could be Xero, MYOB and more in the future
  } = req.query;
  if (apiType === "mock") {
    return res.status(200).json({
      success: true,
      sheet: sheet,
    });
  }
  return client
    .get("/balanceSheet", {
      businessName,
      loanAmount,
      providerOption,
    })
    .then((balanceSheet) => {
      return res.status(200).json({
        success: true,
        sheet: balanceSheet,
      });
    })
    .catch((e) => {
      return res.status(501).json({
        success: false,
        sheet: [],
        message: "Request to fetch balance sheet failed",
      });
    });
};
