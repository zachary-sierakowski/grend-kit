import React, { PureComponent } from "react";
import { Input, Button } from "semantic-ui-react";

import { sendMail } from "../../utils/requests";

class MailExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      subject: "",
      error: null
    };
  }

  sendEmail = async () => {
    const [error, response] = await sendMail(this.state);
    if (error) {
      this.setState(() => ({
        error
      }));
      return;
    }
    console.log(response);
  };

  isSubmitReady = () => this.state.name !== "" && this.state.subject !== "";

  render() {
    if (this.state.error) {
      throw Error(this.state.error);
    }
    return (
      <div>
        <h4>Grend Express Mail Example</h4>
        <div>
          <Input
            fluid
            placeholder="Full name"
            onChange={(e, data) =>
              this.setState(() => ({
                name: data.value
              }))}
          />
          <Input
            fluid
            placeholder="Email subject"
            value={this.state.subject}
            onChange={(e, data) =>
              this.setState(() => ({
                subject: data.value
              }))}
          />
          <Button
            onClick={this.sendEmail}
            disabled={!this.isSubmitReady()}
            content="Submit"
          />
        </div>
      </div>
    );
  }
}

export default MailExample;
