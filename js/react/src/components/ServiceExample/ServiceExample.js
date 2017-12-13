import React, { PureComponent } from "react";
import { Card } from "antd";

import { getServiceHealth } from "../../utils/requests";

class ServiceExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      response: "not yet requested"
    };
  }

  healthRequest = async () => {
    const [err, response] = await getServiceHealth();
    if (err) return;

    const responseText = await response.text();
    this.setState(() => ({
      response: responseText
    }));
  };

  render() {
    return (
      <Card
        title="Golang Request Example"
        extra={<a onClick={this.healthRequest}>Health Request</a>}
        style={{ minHeight: "200px" }}
      >
        <b>response:</b>
        <p>{this.state.response}</p>
      </Card>
    );
  }
}

export default ServiceExample;
