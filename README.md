# Contacts

This is a sample project, a crud of a contact list made with React and Next js, along with its system tests using Playwright.

## Architecture

There is a small back end made with json-server, which creates a REST API. Then, the front end connects to that back end. It is made with the Next js framework, which uses the React library. Next js makes it easy to build a scalable router, which supports mixed requests, either handled by the client or the server, allowing to get data in different ways as appropriate. To facilitate state and cache handling, React Query is used, which greatly simplifies the handling of data loading and its synchronization with the back end. Formik together with Yup is used to build forms. The former facilitates form state management in isolation, centralizing validations and errors, as well as its lifecycle. The second is a library that acts as a helper to write validations more quickly.

## Development

Install packages with `npn install` or `yarn install`.

To run the project in development mode you must start the api server, made with json-server, and the front end made in Next js.

In separate terminals run:

```bash
npm run dev or yarn dev
npm run json-server --watch db.json --port 3001 or yarn json-server --watch db.json --port 3001
```

## Tests

The tests are system tests that cover the 5 crucial methods of a crud, i.e. show all, show one, create, update and delete. For this, Playwright is used, which, running a headless browser, navigates the page, checking that the expected elements exist or filling out forms and then testing the changes.

To run the tests run `npm run test:e2e` or `yarn test:e2e`.

The first time, Playwright will probably ask to install additional dependencies, such as browsers. Follow the instructions that appear.
