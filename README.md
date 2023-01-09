# Ticketing managing application

Build a ticket managing app, where the user can _add_, _filter_ (by status), _assign_, and _complete_ tickets.

- The app should have two screens:

  1. the list screen and
  2. the details screen.

- You can use any state management library you want (or none at all). e.g. Redux, NgRx, XState, MobX, etc.

- Write a couple of tests. The goal here is not to build a production-quality app, so don't test every single detail. Two or three tests should be good enough.


## React App


Install the packages, and you're good to go!

```bash
yarn

# run app (react)
yarn start:react

# run tests
yarn test:react
```

### Server / API

The server application is available at http://localhost:4200/api when you run `yarn start:react`.

Note that there is an intentional artificial delay on the API - PLEASE DO NOT REMOVE IT! We've added it in as a way to check your frontend application's ability to handle race conditions/loading and pending states.

Please see the [API docs here](./apps/server/README.md).

## My solution - comments
- I have written my application in React.
- Since the app is small, I choose not to use any state management library. I would add Redux if the app grows.
- The loader needs to be improved. Right now loader causes unnecessary re-render, but it is there so the user can see that data is loading.
- To create a new ticket, user needs to click "Save" button (enter key doesn't work yet).
- Given the time, I decided to use Tailwind CSS to spend more time writing a working app than styling it.
- I spent about 3 hours on this solution