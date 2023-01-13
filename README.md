<p align="center">
  <a href="https://lets-plan.ninja">
    <img src="https://raw.githubusercontent.com/dylmye/lets-plan/main/logo.png" alt="Let's Plan logo" height="96">
  </a>
</p>

<p align="center">
  <a href="https://github.com/dylmye/lets-plan/actions/workflows/firebase-hosting-merge.yml"><img alt="The status badge for this project's build" src="https://img.shields.io/github/actions/workflow/status/dylmye/lets-plan/firebase-hosting-merge.yml?logo=github"></a>
  <a href="https://github.com/dylmye/lets-plan/blob/main/LICENSE"><img alt="The status badge for the licence of this project" src="https://img.shields.io/github/license/dylmye/lets-plan"></a>
  <a href="https://snyk.io"><img alt="The status badge for the Snyk-detected vulnerabilities count for this project" src="https://img.shields.io/snyk/vulnerabilities/github/dylmye/lets-plan?logo=snyk"></a>
</p>

---

A simple React/Redux based trip planner. Let's Plan is designed to be mobile- and offline- first, with added support for sync and sharing with friends. Cloud services (accounts, sync, image hosting) are provided through Firebase.

## Current roadmap/to-do

Check the GitHub project board for feature to-dos and roadmap.

Right now, all commits trigger a new prod build. Once MVP is feature-complete, this will be changed to prod builds per version tag, and a development

## Development

Before you start, create a Firebase project with a web app to host storage for images. There is currently no option to store images in local storage.

First, install dependencies:

`> yarn`

Secondly, if you're not using Firebase for hosting you can remove `.firebaserc`, `.firebase.json` and the firebase scripts in the `.github` folder.

Copy the `.env.example` file and rename it `.env`. Set the parameters as so:

- `REACT_APP_GMAP_JS_API_KEY`: To use the global address lookup, this project uses Google Maps API. Set this value to your API key, and make sure you have [Places API](https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com) enabled for your project.
- `REACT_APP_FIREBASE_*`: Please plug in the values from the `firebaseConfig` provided when you make a web app. You can find them in the "your apps" section of the project settings.
- `REACT_APP_SIMPLE_ANALYTICS_URL`: You can disregard this if you're not using [Simple Analytics](https://simpleanalytics.com/). If you're not using a custom domain, set this to `scripts.simpleanalyticscdn.com`. Otherwise set it to your `custom.domain.com`.
- `REACT_APP_SIMPLE_ANALYTICS_PIXEL_URL`: You can disregard this if you're not using [Simple Analytics](https://simpleanalytics.com/). If you're not using a custom domain, set this to `queue.simpleanalyticscdn.com`. Otherwise set it to your `custom.domain.com`.
- `REACT_APP_UBER_API_CLIENT_ID`: You can disregard this if you're not using the Uber API for taxi journey links. This is for the "CLIENT_ID" parameter for Uber's Ride Requests API, which is used to link to Uber in taxi itinerary items ([see here](https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction#ride-requests).)
- `REACT_APP_HCAPTCHA_SITE_KEY`: You can disregard this if you're not using HCaptcha (an anti-bot tool like Recaptcha). This is the site key from the dev portal linked to your domain.
- `REACT_APP_RELEASE_VERSION`: Used in the app to display what version of LP is running. Useful for debugging. (optional)
- `REACT_APP_RAPIDAPI_KEY`: Used for the [Aviation Reference Data API](https://rapidapi.com/proground/api/aviation-reference-data), to get airlines and airports. Get one by signing up at [RapidAPI](https://rapidapi.com). You can disregard this if you don't want this feature.

To make this project your own, you also need to:

- Remove the scripts and HTML comments from public/index.html
- Set the `homepage` field in the package.json to the URL you'll be hosting the website on (to make the service worker work)
- Remove `helpers/analytics.ts` + any references to it, or change it to use the analytics package you use
- Remove the credit footer in the Navbar component

Now you can run `yarn start` to spin up the local webserver.

## Build

If you want to use Firebase Hosting, this project will deploy to your hosting URL on every push to main branch. Follow the [instructions here](https://create-react-app.dev/docs/deployment/#firebase) for setup.

To manually build, run `yarn build`.

> Note: if you're using Simple Analytics and converting this project to use SSR, you need to install it manually. The Simple Analytics ESM plugin [doesn't support SSR](https://github.com/DavidWells/analytics/blob/master/packages/analytics-plugin-simple-analytics/src/node.js).

## Data Structure Explainer

TBC

## Credits

> This project was bootstrapped with [Create React App](https://create-react-app.dev/), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

> Logo - Travel by Iconstock from NounProject.com
