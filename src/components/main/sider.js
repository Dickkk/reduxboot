/**
 * Created by chaoice3240 on 2017/7/27.
 */
import { Menu, Icon, Switch } from 'antd';
import React ,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import * as PropTypes from "react/lib/ReactDOMFactories";
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
    state = {
        theme: 'light',
        current: '1'
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    
    handleClick = (e) => {
        console.log('click ', e);
        const { match, location, history } = this.props
        history.push(e.key);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick.bind(this)}

                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={ <span><Icon type="setting" />{this.props.collapse?'':<span className="nav-text">产品工厂</span>}</span>}>
                        <Menu.Item key="/">数据字典维护</Menu.Item>
                        <Menu.Item key="/plan">柜员维护</Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={ <span><Icon type="setting" />{this.props.collapse?'':<span className="nav-text">基础参数</span>}</span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={ <span><Icon type="setting" />{this.props.collapse?'':<span className="nav-text">导航二</span>}</span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>

        );
    }
}

export  default withRouter(Sider);