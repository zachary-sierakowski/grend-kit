import React, { PureComponent } from "react";
import { Row, Col } from "antd";

import ErrorBoundary from "../ErrorBoundary";
import { ErrorExample, MailExample, ServiceExample } from "../../components";

class Home extends PureComponent {
  render() {
    return (
      <Row gutter={16}>
        <Col span={8}>
          <ErrorBoundary>
            <ErrorExample />
          </ErrorBoundary>
        </Col>
        <Col span={8}>
          <ErrorBoundary>
            <MailExample />
          </ErrorBoundary>
        </Col>
        <Col span={8}>
          <ServiceExample />
        </Col>
      </Row>
    );
  }
}

export default Home;
