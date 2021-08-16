# Password Manager Sample App

## About
Almost every componet has been dsigned with heavy generalization in mind. Could have been done much simpler but the key here is to have components that can be used in different proyects without too much effort. Most of them are self explanatory.
### Core components
#### [Form](./src/components/Form)
Responsible of providing form contexts and input validation.

#### [StepsView](./src/components/StepsView)
Handles any kind of component should be splited into different views or steps.

#### [PasswordManger](./src/views/PasswordManager)
Manages business logic, it uses Form and StepsView to provide the form submiting experience into splitted views.


### Testing
Testing covers core functionality. It uses react-testing-library to reproduce a real user behaviour.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.
### `yarn build`

Builds the app for production to the `build` folder.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.