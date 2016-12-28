/**
 * Created by wangji on 12/23/2016.
 */
import React from "react";
import {Button} from "react-bootstrap";
import  OrderSearchAction from "../../stores/order/order-search-store";
import  OrderSearchDispatcher from "../../actions/order/order-search-creator";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment"
import PrintDispatcher from '../../actions/print/print-creator';

export default class OrderSearch extends React.Component{
    constructor(props){
        super(props);
        this.onInitStatus = this.onInitStatus.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.state = {
            batchId:"",
            clientName:"",
            startCreateDate:moment().startOf("month"),
            endCreateDate:moment(),
            startDeliveryDate:moment().startOf("month"),
            endDeliveryDate:moment().endOf("month"),
            selectedStatus:"",
            status:[],
            page:1,
        }
    }
    componentDidMount() {
        OrderSearchAction.addInitStatusListener(this.onInitStatus);
        OrderSearchDispatcher.InitStatusListAction("");
        OrderSearchDispatcher.SearchAction(this.state);
    }
    componentWillUnmount(){
        OrderSearchAction.removeInitStatusListener(this.onInitStatus);
    }

    onInitStatus(){
        var result = OrderSearchAction.getStatus();
        console.log(result);
        this.setState({status: result })
    }
    getStatus(){
        var rows = [];
        rows.push(<option value="" key={0}>全部订单</option>);
        this.state.status.forEach(function (item) {
            rows.push(<option value={item.Id} key={item.Id}>{item.Subject}</option>);
        });
        return rows;
    }

    handleChange(name, event){
        var newState = {};
        switch (name){
            case "startCreateDate":
            case "endCreateDate":
            case "startDeliveryDate":
            case "endDeliveryDate":
                newState[name] = event;
                break;
            default:
                newState[name] = event.target.value;
        }

        this.setState(newState);
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        OrderSearchDispatcher.SearchAction(this.state);
    }
    onPrint(){
        var orders = OrderSearchAction.getSelections();
        console.log("Print Orders:");
        console.log(orders);
        PrintDispatcher.PrintOrderAction(orders);
    }
    render(){
        return(
        <form   className="form-horizontal">
            <div className="row">
                <div className="form-group">
                    <label className="col-sm-1 control-label">订单创建日期(开始)</label>
                    <div className="col-sm-2"><DatePicker className="form-control" selected={this.state.startCreateDate || ''} dateFormat="YYYY-MM-DD" onChange={this.handleChange.bind(this, "startCreateDate")} /></div>

                    <label className="col-sm-1 control-label">订单创建日期(结束)</label>
                    <div className="col-sm-2"><DatePicker className="form-control" selected={this.state.endCreateDate || ''} dateFormat="YYYY-MM-DD"  onChange={this.handleChange.bind(this, "endCreateDate")} /></div>

                    <label className="col-sm-1 control-label">送货日期&nbsp;&nbsp;(开始)</label>
                    <div className="col-sm-2"><DatePicker className="form-control" selected={this.state.startDeliveryDate || ''} dateFormat="YYYY-MM-DD"  onChange={this.handleChange.bind(this, "startDeliveryDate")} /></div>

                    <label className="col-sm-1 control-label">送货日期&nbsp;&nbsp;(结束)</label>
                    <div className="col-sm-2"><DatePicker className="form-control" selected={this.state.endDeliveryDate || ''} dateFormat="YYYY-MM-DD"  onChange={this.handleChange.bind(this, "endDeliveryDate")} /></div>
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <label className="col-sm-1 control-label">批次ID</label>
                    <div className="col-sm-2"><input type="text" className="form-control"  value={this.state.batchId || ''}   onChange={this.handleChange.bind(this, "batchId")} /></div>

                    <label className="col-sm-1 control-label">姓名</label>
                    <div className="col-sm-2"><input type="text" className="form-control"  value={this.state.clientName || ''}   onChange={this.handleChange.bind(this, "clientName")} /></div>

                    <label className="col-sm-1 control-label">状态</label>
                    <div className="col-sm-2">
                        <select className="form-control" value={this.state.selectedStatus || ''}    onChange={this.handleChange.bind(this, "selectedStatus")} >
                            {this.getStatus()}
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <Button className=" btn btn-primary" onClick={this.onSubmit.bind(this)} >查询</Button>&nbsp;
                        <Button className="btn btn-default" onClick={this.onPrint.bind(this)}>打印订单</Button>
                    </div>

                </div>
            </div>
        </form>)
    }
}