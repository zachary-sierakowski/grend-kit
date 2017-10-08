import React from "react";
import { render } from "react-dom";

import App from "./containers/App";

const ELEMENT_TO_BOOTSTRAP = "root";
render(<App />, document.getElementById(ELEMENT_TO_BOOTSTRAP));
