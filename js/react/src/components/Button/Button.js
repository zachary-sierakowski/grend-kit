import React, { PureComponent } from "react";

class Button extends PureComponent {
  render() {
    return <button {...this.props} />;
  }
}

export default Button;
