import { Analytics } from "analytics";
import simpleAnalyticsPlugin from "@analytics/simple-analytics";

const analytics = Analytics({
  app: "lets-plan",
  version: "100",
  plugins: [
    simpleAnalyticsPlugin({
      customDomain: process.env.REACT_APP_SIMPLE_ANALYTICS_URL,
    }),
  ],
});

export default analytics;
