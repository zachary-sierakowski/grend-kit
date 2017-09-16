import React, { PureComponent } from "react";
import { Button } from "semantic-ui-react";

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
    return (
      <div>
        <h4>React v16 Error Boundary Example</h4>
        <Button onClick={this.triggerError}>Trigger an error</Button>
      </div>
    );
  }
}

export default ErrorExample;
