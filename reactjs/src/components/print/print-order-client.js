import React from 'react';

export default class ClientInfo extends React.Component{
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
