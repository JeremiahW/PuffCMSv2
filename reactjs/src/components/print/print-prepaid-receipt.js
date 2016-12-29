import React from 'react';
import {Button} from 'react-bootstrap';
import PrintDispatcher from '../../actions/print/print-creator';
import PrintStore from '../../stores/print/print-store';
import ReceiptHeader from './print-header';
import ReceiptFooter from './print-footer';

export default class PrintPrepaidReceipt extends React.Component {
    constructor(props){
        super(props)
        this.getContent = this.getContent.bind(this);

    }

    componentDidMount(){
        $('body').addClass('white-bg');

    }

    componentWillUnmount(){
        $('body').removeClass('white-bg');
    }

    onCancel(){
        PrintDispatcher.PrintCompleteAction("");
    }
    getContent(){
        var item = PrintStore.getReceipts();
        console.log(item);
        var rows = [];
        for(var i=0;i<item.items.length;i++){
           rows.push(<ReceiptHeader batchId={item.items[i].Id} key={"Header"+item.items[i].Id}/>);
           rows.push(<table key={"Body"+item.items[i].Id}className="table table-bordered">
                        <ReceiptItemHeader />
                        <tbody>
                            <ReceiptItemRow ActAmount={item.items[i].ActAmount} Amount={item.items[i].Amount} Balance={item.items[i].Balance} CreatedDate={item.items[i].CreatedDate}/>
                        </tbody>
                </table>)
           rows.push(<ReceiptFooter comment={item.items[i].Description} key={"Footer"+item.items[i].Id}/>)
        }

        return rows;
    }
    render(){
        return<div id="wrapper" className="white-bg">
            {this.getContent()}
            <Button onClick={this.onCancel}>取消</Button>
        </div>
    }
}

class ReceiptItemHeader extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <thead>
                <tr>
                    <td>充值金额</td>
                    <td>可用金额</td>
                    <td>账户余额</td>
                    <td>充值时间</td>

                </tr>
            </thead>
        )
    }
}

class ReceiptItemRow extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <tr>
                <td>{this.props.ActAmount}</td>
                <td>{this.props.Amount}</td>
                <td>{this.props.Balance}</td>
                <td>{this.props.CreatedDate}</td>
            </tr>
        )
    }
}