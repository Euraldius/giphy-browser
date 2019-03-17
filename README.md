# Giphy Browser

Let's get you some gifs.

![Oh my gosh there are so many!](https://media.giphy.com/media/xT5LMKqlcoLeHC10xa/giphy.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Developer Setup

### Prereqs

A version of Node matching the version in `.nvmrc`.

### 1. Clone the repo

```
git clone git@github.com:Euraldius/giphy-browser.git
```

### 2. Install dependencies

```
npm install
```

### 3. Start server

```
npm start
```

This command will launch the application in your browser on `localhost:3000`.
It runs the app in the development mode.<br>
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Testing

### E2E Testing

This codebase uses [Nightwatch.js](http://nightwatchjs.org/) for E2E coverage.
You can run the suite with:

```
npm run nightwatch
```

You can run a specific test with:

```
npm run nightwatch -- path/to/test.js
```

This will:

1. Run the app on `localhost:3001`.
2. Run a fake giphy server on `localhost:3002`.
    This server is a simple Express app that can be found in `./tests/support`.
3. Run all nightwatch tests in the `./tests/integration` folder.

#### Debugging Nightwatch tests

Nightwatch brings up a Firefox browser to run the tests in. You can use
`debugger` and `console.log` in that browser as you normally would, but
Nightwatch will only keep it open as long as it needs to run the tests.

To get Nightwatch to keep the browser open, add `browser.pause(LOTS_OF_MILLISECONDS)`
to any Nightwatch test.

### Unit tests

The unit tests are written with [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/). They can be run with:

```
npm test
```

This will launch the test runner in interactive watch mode.

## Deployment

In the project directory, you can run:

```
npm run build
```

This builds the app for production to the `build` folder.
