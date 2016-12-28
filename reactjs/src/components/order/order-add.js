/**
 * Created by wangji on 12/19/2016.
 */
import React from "react";
import ReactDOM from "react-dom"
import {Button, Overlay, Popover} from "react-bootstrap"
import OrderDispatcher from "../../actions/order/order-creator";
import OrderAction from "../../stores/order/order-store";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';
import * as RequestUrl from "../../constants/request-url-constants";
import ResultHeader from "../../components/order/order-item-header";
import ResultRow from "../../components/order/order-item-row";
import DatePicker from "react-datepicker";
import NumericInput from 'react-numeric-input';
import moment from "moment"
import cookie from 'react-cookie';
import PrintDispatcher from '../../actions/print/print-creator';

export default class OrderAdd extends React.Component{
    constructor(props){
        super(props);
        this.getClient = this.getClient.bind(this);
        this.onClientSelected = this.onClientSelected.bind(this);
        this.onAddItemClicked = this.onAddItemClicked.bind(this);
        this.onRemoveItemClicked = this.onRemoveItemClicked.bind(this);
        this.onItemChanged = this.onItemChanged.bind(this);
        this.onBtnSubmit = this.onBtnSubmit.bind(this);
        this.onBtnSubmitCallback = this.onBtnSubmitCallback.bind(this);
        this.state = {
            selectedClient:"",
            items:[],
            totalPrice:0,
            totalActPrice:0,
            comment:"",
            deliveryDate:moment(),
            isPrint: true,
            showMessage: false,
            message:"",
        }
    }
    componentDidMount() {
        OrderAction.addGetClientListener(this.getClient);
        OrderAction.addItemUpdatedListener(this.onItemChanged);
        OrderAction.addItemAddListener(this.onItemChanged);
        OrderAction.addItemRemoveListener(this.onRemoveItemClicked);
        OrderAction.addOrderSubmitListener(this.onBtnSubmitCallback);
        console.log("Order Add Module is Loaded");
    }
    componentWillUnmount(){
        OrderAction.removeGetClientListener(this.getClient);
        OrderAction.removeItemUpdatedListener(this.onItemChanged);
        OrderAction.removeItemAddListener(this.onItemChanged);
        OrderAction.removeItemRemoveListener(this.onRemoveItemClicked);
        OrderAction.removeOrderSubmitListener(this.onBtnSubmitCallback);
        OrderAction.dispose();
    }
    getClient(){

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
    onAddItemClicked(){
        let items = this.state.items;
        var uniqueId = new Date().getUTCMilliseconds();

        //ResultRow组件在 didMount的时候, 会自动执行add事件,将自己添加到Store中.
        items.push(<ResultRow key={uniqueId} id={uniqueId} />)
        this.setState({items:items});

    }
    onRemoveItemClicked(){
        var currentItem = OrderAction.getCurrentItem();
        console.log(currentItem);

        let items = this.state.items;
        var index = -1;
        for(var i=0;i<items.length;i++){
            if(items[i].props.id == currentItem.id){
                index = i;
                console.log("Find Match at " + index);
            }
        }
        if(index > -1) {
            items.splice(index, 1);
        }
        this.setState({items:items});
    }
    onItemChanged(){
       let items = OrderAction.getFinalItems();
       var  totalPrice = 0;
       var  totalActPrice = 0;
       for(var i=0;i<items.length;i++){
           console.log(items[i]);
           if(items[i].price=="")items[i].price = 0;
           if(items[i].actPrice=="")items[i].actPrice = 0;

           var price = parseFloat(items[i].num) * parseFloat(items[i].price);
           var actPrice =  parseFloat(items[i].num) * parseFloat(items[i].actPrice);

           totalPrice += price;
           totalActPrice += actPrice;
       }
        console.log("totalPrice: " + totalPrice + " totalActPrice: " + totalActPrice);
        this.setState({
            totalPrice:totalPrice,
            totalActPrice:totalActPrice
        });
    }
    onClientSelected(val) {
        this.setState({selectedClient: val});
    }
    handleChange(name, event){
        var newState = {};
        switch (name){
            case "isPrint":
                newState[name] = !this.state.isPrint;
                break;
            case "deliveryDate":
                newState[name] = event;
                break;
            default:
                newState[name] = event.target.value;
        }
        this.setState(newState);
    }
    onBtnSubmit(){
        let items = OrderAction.getFinalItems();
        console.log(this.state.selectedClient);
        let data = {items: items,
                    clientId:this.state.selectedClient.value,
                    totalPrice:this.state.totalPrice,
                    totalActPrice:this.state.totalActPrice,
                    deliveryDate:this.state.deliveryDate.format("YYYY-MM-DD") ,
                    comment:this.state.comment
        }
        console.log(data);
        OrderDispatcher.OrderSubmitAction(data);
    }

    onBtnSubmitCallback(){
        let response = OrderAction.getServerResponse();
        this.setState({showMessage:true, message:response.message});
         if(this.state.isPrint  && response.result == true) {
             console.log(response.data);
             // PrintDispatcher.PrintOrderAction(response.data);
        }
    }

    render(){
        return (<div className="wrapper wrapper-content">
                    <div className="row">
                        <div className="col-lg-6">
                        <Select.Async name="form-field-name"
                                      loadOptions={this.getOptions}
                                      isLoading={true}
                                      value={this.state.selectedClient}
                                      onChange={this.onClientSelected}/>
                        </div>
                        <div className="col-lg-6">
                            <Button className="btn btn-primary" onClick={this.onAddItemClicked}>添加</Button>
                        </div>
                    </div>
                    <div className="hr-line-dashed"></div>

                    <div className="row">
                        <div className="col-lg-16">
                            <table className="table table-bordered" >

                                <ResultHeader />
                                <tbody>
                                    {this.state.items}
                                </tbody>
                            </table>
                        </div>
                    </div>
            <div className="hr-line-dashed"></div>
            <div className="row">
                <div className="col-lg-16">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>总金额</td>
                            <td><input type="text" className="form-control"  readOnly  onChange={this.handleChange.bind(this, "totalPrice")} value={this.state.totalPrice || '0'} /></td>
                            <td>实付金额</td>

                            <td><input step={0.1} type="number" value={this.state.totalActPrice || "0"} onChange={this.handleChange.bind(this, "totalActPrice")}  className="form-control"/></td>
                            <td>备注</td>
                            <td><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "comment")} value={this.state.comment || ''} /></td>
                            <td>送货日期</td>
                            <td>
                                <DatePicker className="form-control" dateFormat="YYYY-MM-DD" selected={this.state.deliveryDate}   onChange={this.handleChange.bind(this, "deliveryDate")}  />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <input type="checkbox" checked={this.state.isPrint} onChange={this.handleChange.bind(this, "isPrint")}/> &nbsp;是否打印
                            </td>
                            <td><Button className="btn btn-default" onClick={this.onBtnSubmit} ref="target">保存订单</Button></td>
                            <Overlay show={this.state.showMessage} rootClose={true} container={this}
                                     onHide={() => this.setState({ showMessage: false })}
                                     target={()=>ReactDOM.findDOMNode(this.refs.target)}
                                     placement="top">
                                <Popover id="overload-top" title="提示信息"> {this.state.message}</Popover>
                            </Overlay>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>)
    }
}



