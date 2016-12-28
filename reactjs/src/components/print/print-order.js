/**
 * Created by wangji on 12/28/2016.
 */
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import PrintDispatcher from '../../actions/print/print-creator';
import PrintStore from '../../stores/print/print-store';

export default class PrintOrder extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        $('body').addClass('white-bg');

      //  $("body").css("border","solid 1px blue");
     //   $("body").css("margin","10mm 15mm 10mm 15mm");  //内容边距

     //   $("html").css("margin", "0px");// 打印机边距

      //  $("@page").css("size", "auto");
       // $("@page").css("margin", "mm");// 打印机边距

       // window.print();
    }
    componentWillUnmount(){
        $('body').removeClass('white-bg');

      //  $("body").css("border","");
    //    $("body").css("margin","");  //内容边距

      //  $("html").css("margin", "");// 打印机边距
    }
    onCancel(){
        PrintDispatcher.PrintCompleteAction("");
    }

    getContent(){
        var rows = [];
        var orders = PrintStore.getOrders();
        for(var i=0; i<orders.length;i++){
            rows.push(<ReceiptHeader key={orders[i].batchId + "Header:"+ i} batchId={orders[i].batchId}/>);

            rows.push(<ClientInfo key={orders[i].batchId}
                            name={orders[i].client.Name}
                            phone={orders[i].client.Phone}
                            deliveryDate={orders[i].deliveryDate}
                            address={orders[i].client.DeliveryAddress}
                            totalAmount={orders[i].totalAmount}
                            actAmount={orders[i].actAmount}/>
            )

            rows.push(<OrderItems items={orders[i].orderItems} key={orders[i].batchId + "Items:"+ i}/>);

            rows.push(<PrepaidInfo key={orders[i].batchId + "Prepaid:"+ i}
                cashExpense = {orders[i].prepaidDetails.CashExpense}
                prepaidBalance = {orders[i].prepaidDetails.PrepaidBalance}
                prepaidExpense = {orders[i].prepaidDetails.PrepaidExpense}/>)

            rows.push(<ReceiptFooter key={orders[i].batchId + "Footer:"+ i} comment={orders[i].comments} />);
        }

        return rows;
    }
    render(){
        return  <div id="wrapper" className="white-bg">
            {this.getContent()}<Button onClick={this.onCancel}>取消</Button>
        </div>
    }
}

class ReceiptHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            {this.props.batchId}
        </div>)
    }
}

class ReceiptFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            {this.props.comments}
        </div>)
    }
}

class ClientInfo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<table className="table table-bordered">
            <tbody>
                <tr>
                    <td>姓名:</td>
                    <td>{this.props.name}</td>
                    <td>送货日期:</td>
                    <td>{this.props.deliveryDate}</td>
                </tr>
                <tr>
                    <td>电话:</td>
                    <td>{this.props.phone}</td>
                    <td>总价:{this.props.totalAmount}</td>
                    <td>会员价:{this.props.actAmount}</td>
                </tr>
                <tr>
                    <td>地址:</td>
                    <td colSpan="3">{this.props.address}</td>
                </tr>
            </tbody>
        </table>)
    }
}

class OrderItems extends React.Component{
    constructor(props){
        super(props);
        this.getContent = this.getContent.bind(this);
    }

    getContent(){
        var rows = [];
        for(var i=0;i<this.props.items.length;i++){
            rows.push(
                <tr key={this.props.items[i].Id}>
                    <td>{this.props.items[i].ItemName}</td>
                    <td>{this.props.items[i].ItemPrice}</td>
                    <td>{this.props.items[i].ItemNum}</td>
                    <td>{this.props.items[i].ItemTotalPrice}</td>
                    <td>{this.props.items[i].ItemUnit}</td>
                </tr>
            )
        }
        return rows;
    }
    render(){
       return (<table className="table table-bordered">
        <thead>
            <tr>
                <td>品名</td>
                <td>单价</td>
                <td>数量</td>
                <td>总价</td>
                <td>单位</td>
            </tr>
        </thead>
           <tbody>
           {this.getContent()}
           </tbody>
        </table>)
    }
}

class PrepaidInfo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<table className="table table-bordered">
                <tbody>
                <tr>
                    <td>现金应支付:</td>
                    <td>{this.props.cashExpense}</td>
                </tr>
                <tr>
                    <td>余额支付:</td>
                    <td>{this.props.prepaidExpense}</td>
                </tr>
                <tr>
                    <td>当次消费余额:</td>
                    <td>{this.props.prepaidBalance}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}