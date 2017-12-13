import React, { PureComponent } from "react";
import { Row, Col } from "antd";

import { MailExample, ServiceExample } from "../../components";

class Home extends PureComponent {
  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <ServiceExample />
        </Col>
        <Col span={12}>
          <MailExample />
        </Col>
      </Row>
    );
  }
}

export default Home;
