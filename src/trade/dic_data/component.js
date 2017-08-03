import React, { Component } from 'react'
import CardComp from '../../components/common/cardcomp';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import {dic_init,dic_search} from '../../trade/dic_data/action';
import{Row,Col,Input,Icon,Button,Modal,Form,message,Pagination} from 'antd';
import config from '../../data/config';
import request from 'superagent';
var FormItem=Form.Item;
class dic_data extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pr_code: '',
			content: '',
			moditem:{},
			visible:false,
			pageNumber:1
		}
	}
	ajxadd(item)
{
	request
		.post(config.baseurl+"dic_data/add")
		.type('json')
		.send([item])
		.set('Content-Type', 'application/json')
		.end(function (err,data){
			if(err||"0000"!=data.body.errCode)
			{
				message.error(err==null?data.body.errMsg:err);
			}
			else {
				message.success("添加数据成功");
				this.ajxsearch();
			}
		}.bind(this))

}
	ajxupd(items)
{
	request
		.post(config.baseurl+"dic_data/deletebycodetheninsert")
		.type('json')
		.send(items)
		.set('Content-Type', 'application/json')
		.end(function (err,data){
			if(err||"0000"!=data.body.errCode)
			{
				message.error(err==null?data.body.errMsg:err);
			}
			else {
				message.success("修改数据成功");
				this.ajxinit();
			}
		}.bind(this))

}
	ajxdel(item)
{
	request
		.post(config.baseurl+"dic_data/delete")
		.type('json')
		.send(item)
		.set('Content-Type', 'application/json')
		.end(function (err,data){
			if(err||"0000"!=data.body.errCode)
			{
				message.error(err==null?data.body.errMsg:err);
			}
			else {
				message.success("删除数据成功");
				this.ajxsearch();
			}
		}.bind(this))

}
	ajxinit()
{
	request
		.post(config.baseurl+'dic_data')
		.type('application/json')
		.set('Content-Type', 'application/json')
		.query({pageNumber:this.state.pageNumber})
		.send({pr_code:this.state.pr_code,content:this.state.content})
		.end(function (err,data){
			if(err)
			{
				message.error(err);
			}
			else {
				store.dispatch(dic_init(data.body));
			}
		}.bind(this))

}
	ajxsearch()
{
	request
		.post(config.baseurl+'dic_data')
		.type('application/json')
		.set('Content-Type', 'application/json')
		.send({pr_code:this.state.pr_code,content:this.state.content})
		.end(function (err,data){
			if(err)
			{
				message.error(err);
			}
			else {
				store.dispatch(dic_search(data.body));
			}
		}.bind(this))

}
	add_click(){
		console.log("add click");
		this.setState({
			visible: true,
			opt:'add'
		});
		this.props.form.resetFields();
	}
	modify_click(item){
		console.log("modify click"+item);
		this.setState({
			visible: true,
			opt:'upd',
			moditem:item
		});
		this.props.form.setFieldsValue({'pr_code':item.pr_code,'pr_seq':item.pr_seq,'content':item.content,
		'order_rule':item.order_rule,'filler':item.filler});
	}
	onChange(pageNumber)
{
	this.setState({
		pageNumber:pageNumber
	});
	this.ajxinit();
}
	del_click(item){
		console.log("del click"+item);
		this.ajxdel(item);
	}
	copy_click(){
		console.log("cpy click");
	}
	search_click(){
		console.log("search click");
		this.ajxsearch();
	}
	handleItemChage (str, e) {
		this.setState({
			item:Object.assign({}, this.state.item, {[str]: e.target.value})
		});
	}
	handleChage (str, e) {
		this.setState({
			[str]: e.target.value
		})
	}
	handleOk = (e) => {
		console.log(e);
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if(this.state.opt=="add") {
					this.ajxadd(this.props.form.getFieldsValue());
				}
				else {
					this.ajxupd([this.props.form.getFieldsValue(),this.state.moditem]);
				}
				this.setState({
					visible: false,
				});
			}
		});

	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	render () {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<h1 className="title">首页</h1>
					<Row gutter={16} className="searchAread">
						<Col  span={8} offset={2}>
							<Input  onChange={this.handleChage.bind(this, 'pr_code')} placeholder="关键字" />
						</Col>
						<Col  span={8} offset={4}>
							<Input onChange={this.handleChage.bind(this, 'content')} placeholder="描述"/>
						</Col>
						<Col>
							<Button onClick={this.search_click.bind(this)}>
								<Icon type="search" className="certain-category-icon" />
							</Button>
						</Col>
					</Row>
					<div className="tradeContent">
							<Row gutter={16}>
							{
								this.props.diclist.diclist.map((item, index) => {
									return (
										<Col span={8}>
											<CardComp modify_click={this.modify_click.bind(this)} del_click={this.del_click.bind(this)} item={{url:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",name:item.pr_code,tag:item.content,content:item}}></CardComp>
										</Col>
									)
								})
							}
							<Col span={8}>
								<Button  size="Large" style={{width:'100%',height:'120%',padding :10, margin:10, fontSize: 50}} icon= "file-add" onClick={this.add_click.bind(this)}>新增</Button>
							</Col>
						</Row>
						<Pagination showQuickJumper defaultCurrent={1} total={this.props.diclist.total} onChange={this.onChange.bind(this)} />
					</div>
				<Modal
					title="维护"
					visible={this.state.visible}
					width={700}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Row gutter={50} className="addcontent">

						<Col  span={12} >
							<FormItem label={`关键字`} labelCol= { {span: 7} } wrapperCol= {{ span: 17} } hasFeedback={true}>
								{getFieldDecorator('pr_code', {
									rules: [{ required: true, message: '关键字不能为空!' },
										{max:50,message:'最大长度为50'}]
								})(
							<Input span={19}  placeholder="关键字" />
								)}
							</FormItem>
						</Col>
						<Col  span={12} >
							<FormItem label={`取值`} labelCol= { {span: 7} } wrapperCol= {{ span: 17} } hasFeedback={true}>
								{getFieldDecorator('pr_seq', {
									rules: [{ required: true, message: '取值不能为空!' },
										{max:8,message:'最大长度为8'}]
								})(
							<Input   placeholder="取值"  />
								)}
							</FormItem>
						</Col>
						<Col  span={12} >
							<FormItem label={`内容`} labelCol= { {span: 7} } wrapperCol= {{ span: 17} } hasFeedback={true}>
								{getFieldDecorator('content', {
									rules: [{ required: true, message: '内容不能为空!' },
										{max:40,message:'最大长度为40'}]
								})(
							<Input  placeholder="内容"  />
								)}
							</FormItem>
						</Col>
						<Col  span={12} >
							<FormItem label={`序号`} labelCol= { {span: 7} } wrapperCol= {{ span: 17} } hasFeedback={true}>
								{getFieldDecorator('order_rule', {
									rules: [{ required: true, message: '排序字段不能为空!' },
										{max:4,message:'最大长度为4'}]
								})(
							<Input   placeholder="排序" />
								)}
							</FormItem>
						</Col>
						<Col  span={12} >
							<FormItem label={`说明`} labelCol= { {span: 7} } wrapperCol= {{ span: 17} } hasFeedback={true}>
								{getFieldDecorator('filler', {
									rules: [{ required: true, message: '说明不能为空!' },
										{max:20,message:'最大长度为20'}]
								})(
							<Input   placeholder="说明"  />
								)}
							</FormItem>
						</Col>
					</Row>

				</Modal>
			</div>


		)
	}
	}
const mapStateToProps = function(store) {
	return {
		diclist: store.diclist
	};
};

export default connect(mapStateToProps)(Form.create()(dic_data));