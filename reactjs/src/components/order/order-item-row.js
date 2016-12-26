/**
 * Created by wangji on 12/22/2016.
 */
import React from "react";
import OrderDispatcher from "../../actions/order/order-creator";
import OrderAction from "../../stores/order/order-store";
import {Button} from "react-bootstrap"
import NumericInput from 'react-numeric-input';

export default class ResultRow extends React.Component{
    constructor(props){
        super(props);
        this.onBtnRemoveClick = this.onBtnRemoveClick.bind(this);
        this.initItems = this.initItems.bind(this);
        this.getItems = this.getItems.bind(this);
         this.state = {
            selectedItem:"",
            price:"",
            actPrice:"",
            unit:"",
             num:1,
            description:"",
            items:[],
            id:this.props.id,
        }
    }
    componentDidMount(){
        OrderAction.addGetAvailableItemsListener(this.initItems);
        OrderDispatcher.GetAvailableItemsAction("");

        //将当前的Item项添加到数据池中.
        OrderDispatcher.OrderItemAddAction(this.state);
    }
    componentWillUnmount(){
        OrderAction.removeGetAvailableItemsListener(this.initItems);
    }
    componentDidUpdate(prevProps, prevState){
    }
    componentWillUpdate(nextProps, nextState){
    }

    initItems(){
        let items = OrderAction.getAvailableItems();
        this.setState({items:items});
    }
    getItems(){
        var rows=[];
        rows.push(<option value="-1" key="-1">请选择项目</option>);
        this.state.items.forEach(function (item) {
            rows.push(<option value={item.ID} key={item.ID}>{item.Subject}</option>)
        })
        return rows;
    }
    onBtnRemoveClick(){
        //先调用事件, 将Store中数据删除.  再调用父级页面的Callback刷新子UI.
        OrderDispatcher.OrderItemRemoveAction(this.state);
        OrderDispatcher.OrderItemUpdatedAction("");
    }
    handleChange(name, event){
        var newState = {};
        switch (name){
            case "price":
            case "actPrice":
            case "unit":
            case "description":
            case "num":
                newState[name] = event.target.value;
                this.setState(newState, function () {
                    //对当前的数据项进行更新操作.
                    console.log(this.state);
                    OrderDispatcher.OrderItemUpdatedAction(this.state);
                }.bind(this));
                break;
            case "selectedItem":
                if(event.target.value != "-1"){
                    for(var i=0;i<this.state.items.length;i++){
                        if(this.state.items[i].ID == event.target.value){
                            console.log(this.state.items[i].ID);
                            let newState2 = {
                                selectedItem : event.target.value,
                                price:this.state.items[i].Price,
                                actPrice:this.state.items[i].Price,
                                unit:this.state.items[i].Unit,
                                description:this.state.items[i].Description,
                            }
                            this.setState(newState2, function () {
                                OrderDispatcher.OrderItemUpdatedAction(this.state);
                            }.bind(this));
                            break;
                        }
                    }
                }
               /* else{
                    let newState2 = {
                        selectedItem : "",
                        price:0,
                        actPrice:0,
                        unit:"",
                        description:"",
                    }
                    this.setState(newState2, function () {
                        OrderDispatcher.OrderItemUpdatedAction(this.state);
                    }.bind(this));
                    break;
                }*/
                break;
        }
    }
    render(){
        return (
            <tr>
                <td>
                    <select className="form-control" onChange={this.handleChange.bind(this, "selectedItem")} >
                        {this.getItems()}
                    </select>
                </td>

                <td><input type="text"  readOnly value={this.state.price || "0"}  onChange={this.handleChange.bind(this, "price")} className="form-control"/></td>
                <td><input type="number" step="0.01" value={this.state.actPrice || "0"}  onChange={this.handleChange.bind(this, "actPrice")} className="form-control" /></td>
                <td><input type="number"   value={this.state.num || "1"}  onChange={this.handleChange.bind(this, "num")} className="form-control"/></td>
                <td><input type="text"  readOnly value={this.state.unit || ""}  onChange={this.handleChange.bind(this, "unit")} className="form-control"/></td>
                <td><input type="text"  value={this.state.description || ""}  onChange={this.handleChange.bind(this, "description")} className="form-control"/></td>
                <td><Button onClick={this.onBtnRemoveClick}>删除</Button></td>
            </tr>
        )
    }
}