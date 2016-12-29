
import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import {Button, Modal, Overlay, Popover} from "react-bootstrap";
import * as RequestUrl from "../../constants/request-url-constants";
import PrepaidListView from "./prepaid-list";
import PrepaidStore from "../../stores/prepaid/prepaid-stores";
import PrepaidDispatcher from "../../actions/prepaid/prepaid-creator";
import moment from "moment";
import cookie from 'react-cookie';
import PrintDispatcher from '../../actions/print/print-creator';
import PrintStore from '../../stores/print/print-store';

export default class Prepaid extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onBtnSubmit = this.onBtnSubmit.bind(this);
        this.onBtnSubmitCallback = this.onBtnSubmitCallback.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.onPrintClick = this.onPrintClick.bind(this);
        this.state = {
            selectedClient : "",
            amount:0,
            actAmount:0,
            description:"",
            showModal:false,
        }
    }
    componentDidMount(){
        PrepaidStore.addSaveListener(this.onBtnSubmitCallback);
     }
    componentWillUnmount(){
        PrepaidStore.removeSaveListener(this.onBtnSubmitCallback);
     }

     onPrintClick(){
        var items = PrepaidStore.getSelection();

        var result = {client:this.state.selectedClient, items}

        PrintDispatcher.PrintPrepaidReceiptAction(result);
     }

    getOptions(input){
        return fetch(RequestUrl.POST_GET_CLIENTS+"?search_name="+input+"&token="+cookie.load('token')).then((response)=>{
            return response.json();
        }).then((json)=>{
            var rows = [];
            rows.push({"value":"", "label":"请选择客户"});
            json.data.forEach(function (item) {
                rows.push({"value":item.Id, "label":item.Name});
            })
            return {options:rows}
        });
    }

    handleChange(name, event) {
        var newState = {};
        switch (name){
            case "selectedClient":
                newState[name] = event;
                PrepaidStore.dispose();
                PrepaidDispatcher.PrepaidGetList(event.value);
                break;
            default:
                newState[name] = event.target.value;
                break;
        }
        this.setState(newState);
    }

    onBtnSubmit(){
        var data = {
            ClientId:this.state.selectedClient.value,
            Id:"",
            Amount:this.state.amount,
            ActAmount:this.state.actAmount,
            CreatedDate:new moment().format("YYYY-MM-DD HH:mm:ss"),
            Description:this.state.description,
            Balance:0,
        }
        PrepaidDispatcher.PrepaidSaveAction(data);
    }
    onBtnSubmitCallback(){
        var response = PrepaidStore.getResult();

        if(response.result == true){
            this.setState({showModal:false});
            PrepaidDispatcher.PrepaidGetList(this.state.selectedClient.value);
        }
        else{
            console.log(response);
        }

    }
    onClose(){
        this.setState({showModal:false});
    }
    onShowModal(){
        console.log(this.state.selectedClient);
        this.setState({showModal:true});
    }
    render(){
        return (<div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <Select.Async name="form-field-name"
                                          loadOptions={this.getOptions}
                                          isLoading={true}
                                          value={this.state.selectedClient}
                                          onChange={this.handleChange.bind(this, "selectedClient")}/>
                        </div>
                    </div>
                <div className="hr-line-dashed"></div>
                <div className="row">
                        <div className="form-group">
                            <label className="col-sm-1 control-label">充值金额</label>
                            <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "actAmount")} value={this.state.actAmount || 0} /></div>

                        <label className="col-sm-1 control-label">可用金额</label>
                        <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "amount")} value={this.state.amount || 0} /></div>


                        <label className="col-sm-1 control-label">备注</label>
                        <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "description")} value={this.state.description || ""} /></div>

                        <div className="col-sm-3">
                            <Button onClick={this.onShowModal}>提交</Button>&nbsp;
                            <Button onClick={this.onPrintClick}>打印记录</Button>
                        </div>
                    </div>
                </div>
                <div className="hr-line-dashed"></div>
                <PrepaidListView />
                <Modal show={this.state.showModal} onHide={this.onClose}>
                    <Modal.Header>
                        <Modal.Title>操作提醒</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        你确定要给客户<span className="label label-primary">{this.state.selectedClient.label}</span>充值金额<span className="label label-danger">{this.state.actAmount}</span>?
                        <br/>本次充值可使用金额为<span className="label label-danger">{this.state.amount}</span>?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.onClose}>取消</Button>
                        <Button bsStyle="primary"onClick={this.onBtnSubmit} >Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}