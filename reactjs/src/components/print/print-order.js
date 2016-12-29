/**
 * Created by wangji on 12/28/2016.
 */
import React from 'react';
import {Button} from 'react-bootstrap';
import PrintDispatcher from '../../actions/print/print-creator';
import PrintStore from '../../stores/print/print-store';
import ReceiptHeader from './print-header';
import ReceiptFooter from './print-footer';
import ClientInfo from './print-order-client';
import OrderItems from './print-order-item';
import PrepaidInfo from './print-order-prepaid';

export default class PrintOrder extends React.Component {
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
            rows.push(<ReceiptHeader key={orders[i].Id + "Header:"+ i} batchId={orders[i].Id}/>);

            rows.push(<ClientInfo key={orders[i].Id}
                            name={orders[i].client.Name}
                            phone={orders[i].client.Phone}
                            deliveryDate={orders[i].DeliveryDate}
                            address={orders[i].client.DeliveryAddress}
                            totalAmount={orders[i].TotalAmount}
                            actAmount={orders[i].ActAmount}/>
            )

            rows.push(<OrderItems items={orders[i].orderItems} key={orders[i].Id + "Items:"+ i}/>);

            rows.push(<PrepaidInfo key={orders[i].BatchId + "Prepaid:"+ i}
                cashExpense = {orders[i].prepaidDetails.CashExpense}
                prepaidBalance = {orders[i].prepaidDetails.PrepaidBalance}
                prepaidExpense = {orders[i].prepaidDetails.PrepaidExpense}/>)

            rows.push(<ReceiptFooter key={orders[i].Id + "Footer:"+ i} comment={orders[i].Comment} />);
        }

        return rows;
    }
    render(){
        return  <div id="wrapper" className="white-bg">
            {this.getContent()}<Button onClick={this.onCancel}>取消</Button>
        </div>
    }
}

