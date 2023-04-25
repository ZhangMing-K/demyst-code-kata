import http from "./http";

class HttpService {
  async initiate() {
    return http
      .get("/application/initiate")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("[Service] Failed to initiate: " + error);
        return null;
      });
  }

  async fetchBalanceSheet() {
    return http
      .get("/accountProvider/fetchBalanceSheet")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("[Service] Failed to fetch balance sheet: " + error);
        return null;
      });
  }

  async fetchProvidersList() {
    return http
      .get("/accountProvider/fetchProviders")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("[Service] Failed to fetch providers list: " + error);
        return null;
      });
  }

  async requestOutcome(businessDetails) {
    const params = { ...businessDetails };
    return http
      .post("/decision/requestOutcome", params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("[Service] Failed to request outcome: " + error);
        return null;
      });
  }
}

const service = new HttpService();
export default service;
