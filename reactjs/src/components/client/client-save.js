import React from "react";
import {Modal, Button} from "react-bootstrap";
import ClientListDispatcher from "../../actions/client/client-list-creator";

import ClientSaveDispatcher from "../../actions/client/client-save-creator";
import ClientSaveStore from "../../stores/client/client-save-store";

export default class ClientSave extends React.Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.initLevels = this.initLevels.bind(this);
        this.state = {
            Name: this.props.data.name,
            Gender:this.props.data.gender,
            Phone:this.props.data.phone,
            Age:this.props.data.age,
            DeliveryAddress:this.props.data.deliveryaddress,
            WeChatID:this.props.data.wechatid,
            QQ:this.props.data.qq,
         //   lastshoppeddate:this.props.data.lastshoppeddate,
        //    total:this.props.data.total,
         //   prepaidbalance:this.props.data.prepaidbalance,
            LevelId:this.props.data.levelid,
            LevelSubject:"",
            Id:this.props.data.id,
            levels:[],
        }
    }
    close(){
        this.props.callback();
    }
    componentDidMount(){

        //注册事件
        ClientSaveStore.addChangeListener(this.initLevels);

        //触发事件
        ClientSaveDispatcher.InitMemberLevelAction("");
    }
    componentWillUnmount(){
        ClientSaveStore.removeChangeListener(this.initLevels);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.showModal==true){
            let newState = {
                Name: nextProps.data.name,
                Gender:nextProps.data.gender || "男",
                Phone:nextProps.data.phone,
                Age:nextProps.data.age,
                DeliveryAddress:nextProps.data.deliveryaddress,
                WeChatID:nextProps.data.wechatid,
                QQ:nextProps.data.qq,
                LevelId:nextProps.data.levelid || "1",
                LevelSubject:"",
                Id:nextProps.data.id,
            }
            this.setState(newState);
        }
    }

    initLevels(){
        let newState = {
            levels : ClientSaveStore.getMemberLevels(),
        }
        this.setState(newState);
    }

    getLevels(){
        var rows=[];
        for(var i=0;i<this.state.levels.length;i++){
            rows.push(<option value={this.state.levels[i].Id} key={i}>{this.state.levels[i].Subject}</option>)
        }
        return rows;
    }

    onSubmit(e){
        e.preventDefault();
        ClientListDispatcher.ClientModifyCompleteAction(this.state);
    }
    handleChange(name, event){
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    }
    render(){
        return(
                <Modal show={this.props.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>客户信息管理</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit.bind(this)} method="post">

                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">姓名</label>
                                    <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Name")} value={this.state.Name || ''} /></div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">性别</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" value={this.state.Gender || "男"}  onChange={this.handleChange.bind(this, "Gender")}>
                                            <option value="男">男</option>
                                            <option value="女">女</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">年龄</label>
                                    <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Age")} value={this.state.Age || ''} /></div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">会员等级</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" value={this.state.LevelId || 1}  onChange={this.handleChange.bind(this, "LevelId")}>
                                            {this.getLevels()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">电话</label>
                                    <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Phone")} value={this.state.Phone || ''}  /></div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">寄送地址</label>
                                    <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "DeliveryAddress")} value={this.state.DeliveryAddress || ''}  /></div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">微信</label>
                                    <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "WeChatID")} value={this.state.WeChatID || ''} /></div>
                                </div>
                            </div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">QQ</label>
                                    <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "QQ")} value={this.state.QQ || ''} /></div>
                                </div>
                            </div>
                            <input type="hidden" className="form-control"   onChange={this.handleChange.bind(this, "id")} value={this.state.Id || ''}  />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button onClick={this.onSubmit.bind(this)}>保存</Button>
                    </Modal.Footer>
                </Modal>


        )
    }
}