import React, { PureComponent } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

import Home from "../Home";

class App extends PureComponent {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ height: "50px" }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">HELLO GREND</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px 50px" }}>
          <BrowserRouter key="app-body">
            <Route path="/" component={Home} />
          </BrowserRouter>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2017 Created by Zachary Sierakowski
        </Footer>
      </Layout>
    );
  }
}

export default App;
