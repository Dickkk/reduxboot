/**
 * Created by chaoice3240 on 2017/7/30.
 */
import { Card,Button } from 'antd';
import React,{Component} from 'react';
class CardComp extends  Component{
    constructor(props){
        super(props);
    }
    static defaultProps = {
        item:{url:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",name:"cif_per_inf.income_lvl",tag:"值：[8000,10000)",content:{}}
    };
    modify_click(){
        this.props.modify_click(this.props.item.content);
    }
    del_click(){
        this.props.del_click(this.props.item.content);
    }
    render(){
        return (
            <Card style={{ width: 240,margin:10 }} bodyStyle={{ padding: 10 }}>
                <div className="custom-image">
                    <img alt="图片正在飞" width="100%" src={this.props.item.url} />
                </div>
                <div className="custom-card">
                    <h3>{this.props.item.name}</h3>
                    <p>{this.props.item.tag}</p>
                    <Button icon="search" onClick={this.modify_click.bind(this)}>修改</Button>
                    <Button icon="search" onClick={this.del_click.bind(this)}>删除</Button>
                </div>
            </Card>
        );
    }
}
export default CardComp;