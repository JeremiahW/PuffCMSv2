/**
 * Created by wangji on 12/19/2016.
 */
import React from "react";
import {Pagination, Button, Popover, OverlayTrigger} from "react-bootstrap"
import  OrderSearchAction from "../../stores/order/order-search-store";
import  OrderSearchDispatcher from "../../actions/order/order-search-creator";
import OrderSearch from "./order-search";


export default class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.initList = this.initList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getRows = this.getRows.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);

        this.state = {
            "data":[],
            "page":1,
            "totalPages":1,
            "pageSize":50,
            "showModal":false,
            "selectedRow":"",
            selectedIndexes:0,
        }
    }
    componentDidMount() {
        OrderSearchAction.addSearchListener(this.initList);
        OrderSearchAction.addOrderSelectionChangedListener(this.onSelectionChanged);
    }
    componentWillUnmount(){
        OrderSearchAction.removeSearchListener(this.initList);
        OrderSearchAction.removeOrderSelectionChangedListener(this.onSelectionChanged);
    }
    initList(){
        var result = OrderSearchAction.getOrders();
        this.setState({data:result.data, totalPages:result.totalPages})
        console.log(result);
    }
    handleSelect(eventKey){
        this.setState({"page":eventKey}, function () {
            let condition = OrderSearchAction.getCondition();
            condition.page = this.state.page;
            OrderSearchDispatcher.SearchAction(condition);
        }.bind(this));
    }
    onSelectionChanged(){
        var selectedItems = OrderSearchAction.getSelections();
        console.log(selectedItems);
    }
    getRows(){
        var rows = [];

        for(var i=0; i<this.state.data.length;i++){
            rows.push(
                <OrderRow key={this.state.data[i].Id}
                          batchId = {this.state.data[i].Id}
                          createdTime= {this.state.data[i].CreatedTime}
                          deliveryDate= {this.state.data[i].DeliveryDate}
                          totalAmount= {this.state.data[i].TotalAmount}
                          actAmount= {this.state.data[i].ActAmount}
                          comment= {this.state.data[i].Comment}
                          status= {this.state.data[i].orderStatus}
                          orderItems= {this.state.data[i].orderItems}
                          client= {this.state.data[i].client}
                          prepaidDetails = {this.state.data[i].prepaidDetails}
                />

            )
        }
        return rows;
    }
    render(){
        return <div className="wrapper wrapper-content">
                <OrderSearch/>
            <table className="table table-bordered">
                <OrderHeader />
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
    }
}

class OrderHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <thead>
                <tr>
                    <td></td>
                    <td>姓名</td>
                    <td>电话</td>
                    <td>下单日期</td>
                    <td>订单总额</td>
                    <td>实际金额</td>
                    <td>现金支付</td>
                    <td>余额支付</td>
                    <td>本次余额</td>
                    <td>送货日期</td>
                    <td>订单状态</td>
                    <td>送货地址</td>
                    <td>备注</td>
                </tr>
            </thead>
        )
    }
}

class OrderRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            batchId:this.props.batchId,
            createdTime:this.props.createdTime,
            deliveryDate:this.props.deliveryDate,
            totalAmount:this.props.totalAmount,
            actAmount:this.props.actAmount,
            comment:this.props.comment,
            status:this.props.status,
            orderItems:this.props.orderItems,
            client:this.props.client,
            isSelected:false,
            prepaidDetails:this.props.prepaidDetails,
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }

    handleChange(name, event){
        var newState = {};
        switch (name){
            case "isSelected":
                newState[name] = !this.state.isSelected;
                let state = {isChecked:!this.state.isSelected, data:this.state};
                OrderSearchDispatcher.OrderSelectionChanged(state);
                break;
            default:
                newState[name] = event.target.value;
        }
        this.setState(newState);
    }

    itemsDetails(){
        var style = {"maxWidth": "none"};

      return ( <Popover id="popover-positioned-right" title="订单明细" style={style}>
          {<ItemDetails items={this.state.orderItems}/>}
        </Popover>)
    }
    /*const onMouseOver = (event) =>{

     };*/
    render(){
        return (<tr>
            <td><input type="checkbox" checked={this.state.isSelected} onChange={this.handleChange.bind(this, "isSelected")}/></td>
            <td>
                <OverlayTrigger trigger="focus" placement="right" overlay={this.itemsDetails()}>
                    <Button className="btn btn-info">{this.state.client.Name}</Button>
                </OverlayTrigger>
            </td>
            <td>{this.state.client.Phone}</td>
            <td>{this.state.createdTime}</td>
            <td>{this.state.totalAmount}</td>
            <td>{this.state.actAmount}</td>
            <td>{this.state.prepaidDetails.CashExpense}</td>
            <td>{this.state.prepaidDetails.PrepaidExpense}</td>
            <td>{this.state.prepaidDetails.PrepaidBalance}</td>
            <td>{this.state.deliveryDate}</td>
            <td>{this.state.status.Subject}</td>
            <td>{this.state.client.DeliveryAddress}</td>
            <td>{this.state.comment}</td>
        </tr>)
    }
}


class ItemDetails extends React.Component{
    constructor(props) {
        super(props);
        this.getItems = this.getItems.bind(this);
        this.state = {
            items: this.props.items
        }

        console.log(this.props.items);
    }

    getItems(){
        var rows = [];
        for(var i=0;i<this.state.items.length;i++)
        {
            rows.push(<tr key={this.state.items[i].Id}>
                <td>{this.state.items[i].ItemName}</td>
                <td>{this.state.items[i].ItemPrice}</td>
                <td>{this.state.items[i].ItemActPrice}</td>
                <td>{this.state.items[i].ItemNum}</td>
                <td>{this.state.items[i].ItemTotalPrice}</td>
                <td>{this.state.items[i].ItemUnit}</td>
            </tr>)
        }
        return rows;
    }

     render(){
         return (
             <table className="table table-bordered">
                 <thead>
                 <tr>
                     <td>项目名称</td>
                     <td>原价</td>
                     <td>折扣价</td>
                     <td>购买数量</td>
                     <td>项目总价</td>
                     <td>单位</td>
                 </tr>
                 </thead>
                 <tbody>
                 {this.getItems()}
                 </tbody>
             </table>
         )
     }
}