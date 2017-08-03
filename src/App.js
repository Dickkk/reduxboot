import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Provider, connect } from 'react-redux';
import store from './redux/store.js'
import dic_data from './trade/dic_data/component.js'
import 'antd/dist/antd.min.css'
import './App.css'
import Headercom from './components/main/header.js'
import createHistory from 'history/createBrowserHistory'
import Sider from './components/main/sider';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content } = Layout;
const history = createHistory()
class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
          collapse: true
      }
  }
    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse,
        })
    }
  render() {
      const collapse = this.state.collapse;
      let userprofile={name:"lizhi",age:"29",sex:"女"}
    return (

       <Provider store={store}>
           <Router history = {history}>
            <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                <aside className="ant-layout-sider">
                    <div className="ant-layout-logo">
                        <img style={{width:"100%"}}    alt="Company" />
                    </div>
                    <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
                        {collapse ? <Icon type="right" /> : <Icon type="left" />}
                    </div>
                    <Sider collapse={this.state.collapse}/>

                </aside>
                <div className="ant-layout-main">

                    <div className="ant-layout-header">
                        <Headercom user={userprofile}/>
                    </div>


                    <div className="ant-layout-container">
                        <div className="ant-layout-content " >
                            <div >
                                <Route exact path="/" component={dic_data}/>
                                <Route path="/plan" component={dic_data} />

                                </div>
                            </div>
                        </div>
                    <div className="ant-layout-footer">
                        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                    </div>

                </div>
            </div>
           </Router>
      </Provider>
    );
  }
}

export default App



