import React, { PureComponent } from "react";
import { Input, Button } from "antd";

import { sendMail } from "../../utils/requests";

class MailExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      subject: "",
      loading: false,
      error: null
    };
  }

  sendEmail = async () => {
    this.setState(() => ({
      loading: true
    }));
    const [error, response] = await sendMail(this.state);
    if (error) {
      return this.setState(() => ({
        error
      }));
    }
  };

  isSubmitReady = () => this.state.name !== "" && this.state.subject !== "";

  render() {
    if (this.state.error) {
      throw Error(this.state.error);
    }
    return [
      <h4 key="mailEx">Grend Express Mail Example</h4>,
      <div key="mailExDiv">
        <Input
          placeholder="Full name"
          onChange={e => {
            e.persist();
            this.setState(() => ({
              name: e.target.value
            }));
          }}
        />
        <Input
          placeholder="Email subject"
          value={this.state.subject}
          onChange={e => {
            e.persist();
            this.setState(() => ({
              subject: e.target.value
            }));
          }}
        />
        <Button disabled={!this.isSubmitReady()} onClick={this.sendEmail}>
          Submit
        </Button>
      </div>
    ];
  }
}

export default MailExample;

/*

        <Dimmer active={this.state.loading}>
          <Loader>Sending mail...</Loader>
        </Dimmer>
*/
