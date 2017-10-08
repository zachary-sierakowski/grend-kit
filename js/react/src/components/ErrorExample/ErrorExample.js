import React, { PureComponent } from "react";
import { Button } from "antd";

class ErrorExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  triggerError = () => {
    this.setState(() => ({ error: "Triggered an error" }));
  };

  render() {
    if (this.state.error) {
      throw Error(this.state.error);
    }
    return [
      <h4 key="boundaryEx">React v16 Error Boundary Example</h4>,
      <Button key="boundaryExBtn" onClick={this.triggerError}>
        Trigger an error
      </Button>
    ];
  }
}

export default ErrorExample;
