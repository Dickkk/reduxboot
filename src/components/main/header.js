/**
 * Created by chaoice3240 on 2017/7/27.
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types'
import {Icon} from 'antd'
import  {Navbar,NavDropdown,Nav,MenuItem,NavItem,Image} from 'react-bootstrap'
class HeaderCom extends Component {
    static defaultProps = {
        user:{name:"zhangchao",age:"28",sex:"男"}
    };
    constructor(props){
        super(props);
    }


    render() {

        return (

            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"><img style={{width:150,paddingBottom:30}} src="http://fs.tangongye.com/upload/images/2015/12/16/FDD61FA4391771D5.png"   alt="东华软件" ></img></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#"><Icon type="message" /><span >信息</span></NavItem>
                    <NavItem eventKey={2} href="#"><Icon type="tag" /><span >通知</span></NavItem>
                    <NavDropdown eventKey={3}  title={this.props.user.name} id="basic-nav-dropdown" >
                        <MenuItem eventKey={3.1}>详情</MenuItem>
                        <MenuItem eventKey={3.2}>管理</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>退出</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>

        )
    }
}
HeaderCom.propTypes={
    user:PropTypes.object
}
export  default HeaderCom;
