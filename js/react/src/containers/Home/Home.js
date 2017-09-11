import React, { PureComponent } from "react";

import { Button } from "../../components";
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

  triggerError = () => {
    this.setState(() => ({ error: "Triggered an error" }));
  };

  render() {
    if (this.state.error) {
      throw Error(this.state.error);
    }
    return (
      <div>
        <p>React 16 helloworld</p>
        <Button onClick={this.triggerError}>Trigger an error</Button>
      </div>
    );
  }
}

export default Home;
