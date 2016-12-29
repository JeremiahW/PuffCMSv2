import React from 'react';


export default class OrderItems extends React.Component{
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