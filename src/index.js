import React from "react";

import "./index.css";
import App from "./App";
import imgSearchReducer from "./imgSearch";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ImageSearch from "./ImageSearch";
import ReactDOM from "react-dom";

const store = createStore(imgSearchReducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <div className="container mt-4 d-flex flex-column">
      <div className=" p-2 mt-4">
        <ImageSearch />
      </div>
    </div>
  </Provider>,
  document.getElementById("root")
);
