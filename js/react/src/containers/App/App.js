import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

class App extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Menu borderless fixed="top" inverted>
          <Menu.Item>
            HELLO GREND
          </Menu.Item>
        </Menu>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
