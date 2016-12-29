import React from 'react';

export default class PrepaidInfo extends React.Component{
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