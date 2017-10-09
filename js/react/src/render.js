import React from "react";
import { render } from "react-dom";
import { AppContainer as HotLoaderContainer } from "react-hot-loader";

import App from "./containers/App";

const ELEMENT_TO_BOOTSTRAP = "root";
const renderApp = ApplicationComponent => {
  render(
    <HotLoaderContainer>
      <ApplicationComponent />
    </HotLoaderContainer>,
    document.getElementById(ELEMENT_TO_BOOTSTRAP)
  );
};
renderApp(App);

if (module.hot) {
  module.hot.accept("./containers/App", () => {
    render(App);
  });
}
