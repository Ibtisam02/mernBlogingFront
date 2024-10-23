import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import axios from "axios";

import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";

axios.defaults.baseURL = 'http://localhost:4000/api/v1';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
    </BrowserRouter>
  </StrictMode>
);
