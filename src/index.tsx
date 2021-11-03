import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline, ThemeProvider } from "@mui/material";
import customTheme from "./theme/customTheme";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
