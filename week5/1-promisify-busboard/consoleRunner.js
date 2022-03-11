import { createInterface } from "readline";
import { URL } from "url";
import request from "request";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const POSTCODES_BASE_URL = "https://api.postcodes.io";
const TFL_BASE_URL = "https://api.tfl.gov.uk";

// Original: https://github.com/CorndelWithSoftwire/promisify-busboard-js/blob/master/consoleRunner.js
export default class ConsoleRunner {
  promptForPostcode() {
    return new Promise((resolve) => {
      readline.question("\nEnter your postcode: ", function (postcode) {
        readline.close();
        resolve(postcode);
      });
    });
  }

  displayStopPoints(stopPoints) {
    stopPoints.forEach((point) => {
      console.log(point.commonName);
    });
  }

  buildUrl(url, endpoint, parameters) {
    const requestUrl = new URL(endpoint, url);
    parameters.forEach((param) =>
      requestUrl.searchParams.append(param.name, param.value)
    );
    return requestUrl.href;
  }

  makeGetRequest(baseUrl, endpoint, parameters) {
    const url = this.buildUrl(baseUrl, endpoint, parameters);

    return new Promise((resolve, reject) =>
      request.get(url, (err, response, body) => {
        if (err) return reject(err);
        if (response.statusCode !== 200)
          return reject({ status: response.statusCode });

        return resolve(body);
      })
    );
  }

  async getLocationForPostCode(postcode) {
    const res = await this.makeGetRequest(
      POSTCODES_BASE_URL,
      `postcodes/${postcode}`,
      []
    );

    const jsonBody = JSON.parse(res);
    return {
      latitude: jsonBody.result.latitude,
      longitude: jsonBody.result.longitude,
    };
  }

  async getNearestStopPoints(latitude, longitude, count) {
    const res = await this.makeGetRequest(TFL_BASE_URL, `StopPoint`, [
      { name: "stopTypes", value: "NaptanPublicBusCoachTram" },
      { name: "lat", value: latitude },
      { name: "lon", value: longitude },
      { name: "radius", value: 1000 },
      { name: "app_id", value: "" /* Enter your app id here */ },
      { name: "app_key", value: "" /* Enter your app key here */ },
    ]);

    return JSON.parse(res)
      .stopPoints.map((entity) => ({
        naptanId: entity.naptanId,
        commonName: entity.commonName,
      }))
      .slice(0, count);
  }

  async run() {
    const that = this;

    const postcode = (await that.promptForPostcode()).replace(/\s/g, "");
    try {
      const location = await that.getLocationForPostCode(postcode);

      const stopPoints = await that.getNearestStopPoints(
        location.latitude,
        location.longitude,
        5
      );

      that.displayStopPoints(stopPoints);
    } catch (err) {
      // Could've split this into several try-catches here but got a bit lazy
      if (err.code === "ENOTFOUND") console.error("Host not found");
      else if (err.status === 404) console.error("Postcode not found");
      else if (err.status >= 500) console.error("Server error");
      else console.error("Something's wrong 🤷");
    }
  }
}
