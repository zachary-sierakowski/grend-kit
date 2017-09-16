import React, { PureComponent } from "react";
import { Grid, Menu } from "semantic-ui-react";

import ErrorBoundary from "../ErrorBoundary";

import { ErrorExample, MailExample, ServiceExample } from "../../components";
import { getServiceHealth } from "../../utils/requests";

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  async componentWillMount() {
    const serviceHealth = await getServiceHealth();
    if (!serviceHealth || !serviceHealth.ok) {
      this.setState(() => ({
        error: "Service is not running"
      }));
    }
  }

  render() {
    if (this.state.error) {
      throw Error(this.state.error);
    }
    return (
      <Grid columns={3} divided className="centered" inverted>
        <Grid.Row>
          <Grid.Column>
            <ErrorBoundary>
              <ErrorExample />
            </ErrorBoundary>
          </Grid.Column>
          <Grid.Column>
            <ErrorBoundary>
              <MailExample />
            </ErrorBoundary>
          </Grid.Column>
          <Grid.Column>
            <ServiceExample />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
