# Let's Plan

A React based trip planner, stored in your local storage. Images are stored in Firebase and the project is set up to be hosted in Firebase.

## Development

Before you start, create a Firebase project with a web app to host storage for images. There is currently no option to store images in local storage.

First, install dependencies:

`> yarn`

Secondly, if you're not using Firebase for hosting you can remove `.firebaserc`, `.firebase.json` and the firebase scripts in the `.github` folder.

Copy the `.env.example` file and rename it `.env`. Set the parameters as so:

* `REACT_APP_GMAP_JS_API_KEY`: To use the global address lookup, this project uses Google Maps API. Set this value to your API key, and make sure you have [Places API](https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com) enabled for your project.
* `REACT_APP_FIREBASE_*`: Please plug in the values from the `firebaseConfig` provided when you make a web app. You can find them in the "your apps" section of the project settings.
* `REACT_APP_UUID_NAMESPACE`: Set this to the domain you'll use to host your project - it's just for generating IDs for items, so you can just set it to any URL if you want.

## Build

If you want to use Firebase Hosting, this project will deploy to your hosting URL on every push to main branch.

To manually build, run `yarn build`.

## Credits

> This project was bootstrapped with [Create React App](https://create-react-app.dev/), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
