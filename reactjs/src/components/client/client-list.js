/**
 * Created by wangji on 12/12/2016.
 */

import React from "react";
import {Pagination, Button} from "react-bootstrap"

import ClientSearchStore from "../../stores/client/client-search-store";
import ClientListStore from "../../stores/client/client-list-store";
import ClientListDispatcher from "../../actions/client/client-list-creator";

import AppDispatcher from "../../actions/client/client-search-creator";
import ClientSaveView from "./client-save";
import ClientSearchView from "./client-search";


export default class ClientList extends  React.Component{
    constructor(props){
        super(props);
        this.onSearchCallback = this.onSearchCallback.bind(this);
        this.getRows = this.getRows.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.showPopupCallback = this.showPopupCallback.bind(this);
        this.closePopup = this.closePopup.bind(this);

        this.state = {
            "data":"",
            "page":1,
            "totalPages":1,
            "pageSize":50,
            "showModal":false,
            "selectedRow":""
        }
    }
    onSearchCallback(){
        console.log("clientlist onSearchCallback has been executed.");
        var result = ClientSearchStore.getResult();
        console.log(result);
        var newState = {
            "data":result.data,
            "page":1,
            "totalPages":result.totalPages,
            "pageSize":result.pageSize,
        }
        this.setState(newState);
    }
    componentDidMount(){
        ClientSearchStore.addChangeListener(this.onSearchCallback);
        ClientListStore.addChangeListener(this.showPopupCallback);
        ClientListStore.addClientSaveListener(this.closePopup);
    }
    componentWillUnmount(){
        ClientSearchStore.removeChangeListener(this.onSearchCallback);
        ClientListStore.removeChangeListener(this.showPopupCallback);
        ClientListStore.removeClientSaveListener(this.closePopup);
    }
    handleSelect(eventKey){
        this.setState({"page":eventKey}, function () {
            let condition = ClientSearchStore.getCondition();
            condition.page = this.state.page;
            AppDispatcher.ClientSearchAction(condition);
        }.bind(this));
    }
    getRows(){
        var rows = [];
        for(var i=0;i<this.state.data.length;i++){
             rows.push(
                <ResultRow
                    name = {this.state.data[i].Name}
                    gender = {this.state.data[i].Gender}
                    phone = {this.state.data[i].Phone}
                    age = {this.state.data[i].Age}
                    deliveryaddress = {this.state.data[i].DeliveryAddress}
                    lastshoppeddate = {this.state.data[i].LastShoppedDate}
                    total = {this.state.data[i].Total}
                    prepaidbalance = {this.state.data[i].PrepaidBalance}
                    levelsubject = {this.state.data[i].LevelSubject}
                    levelid = {this.state.data[i].LevelId}
                    wechatid = {this.state.data[i].WeChatID}
                    qq = {this.state.data[i].QQ}
                    id = {this.state.data[i].Id}
                    key = {i}
                />
            )
        }
        return rows;
    }
    showPopupCallback(){
        this.setState({showModal:true, selectedRow:ClientListStore.getClient()});
    }
    closePopup(){
        this.setState({showModal:false});
        let condition = ClientSearchStore.getCondition();
        AppDispatcher.ClientSearchAction(condition);
    }

    render(){
        return(<div className="wrapper wrapper-content">
            <ClientSaveView showModal={this.state.showModal} data={this.state.selectedRow}  callback={this.closePopup} />
            <ClientSearchView />
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center m-t-lg">
                        <table className="table table-bordered">
                            {<ResultHeader/>}
                            <tbody>
                            {this.getRows()}
                            </tbody>
                        </table>
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.state.totalPages}
                            maxButtons={5}
                            activePage={this.state.page}
                            onSelect={this.handleSelect}
                        />
                    </div>
                </div>
            </div>
        </div>)
    }
}

class ResultRow extends React.Component{
    constructor(props){
        super(props)
        this.editClick = this.editClick.bind(this);
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    editClick(){
        console.log("ResultRow editClick");
        ClientListDispatcher.ClientEditAction(this.props);
    }
    render(){
        return <tr>
            <td>{this.props.name}</td>
            <td>{this.props.gender}</td>
            <td>{this.props.phone}</td>
            <td>{this.props.age}</td>
            <td>{this.props.deliveryaddress}</td>
            <td>{this.props.lastshoppeddate}</td>
            <td>{this.props.total}</td>
            <td>{this.props.prepaidbalance}</td>
            <td>{this.props.levelsubject}</td>
            <td>{this.props.wechatid}</td>
            <td>{this.props.qq}</td>
            <td><Button onClick={this.editClick} className="btn btn-default">修改</Button></td>
        </tr>
    }
}

class ResultHeader extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <thead>
        <tr>
            <td>姓名</td>
            <td>性别</td>
            <td>联系电话</td>
            <td>年龄</td>
            <td>送货地址</td>
            <td>上次购买日期</td>
            <td>总消费金额</td>
            <td>预付款余额</td>
            <td>会员等级</td>
            <td>微信</td>
            <td>QQ</td>
            <td></td>
        </tr>
        </thead>
    }
}