import React, { PureComponent } from "react";
import { Button } from "antd";

import { sendServiceRequest } from "../../utils/requests";

class ServiceExample extends PureComponent {
  render() {
    return [
      <h4 key="serviceEx">Grend Service Request Example</h4>,
      <Button key="serviceExBtn" onClick={sendServiceRequest}>
        Send Health Request
      </Button>
    ];
  }
}

export default ServiceExample;
