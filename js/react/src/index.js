import React from "react";
import { render } from "react-dom";
import { Router, hashHistory } from "react-router";
import Routes from "./routes";

import "./style/index.scss";

const ELEMENT_TO_BOOTSTRAP = "root";
const BootstrapedElement = document.getElementById(ELEMENT_TO_BOOTSTRAP);

render(
  <Router history={hashHistory}>
    {Routes}
  </Router>,
  BootstrapedElement
);
