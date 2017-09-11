import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import ErrorBoundary from "../ErrorBoundary";

class App extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
