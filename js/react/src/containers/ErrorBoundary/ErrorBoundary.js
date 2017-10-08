import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, errorInfo: info });
  }
  render() {
    const { children } = this.props;
    if (this.state.hasError) {
      return [
        <h4 key="errorMsg">Something went wrong.</h4>,
        <details key="errorDetails" style={{ whiteSpace: "pre-wrap" }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      ];
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  error: PropTypes.object
};

export default ErrorBoundary;
