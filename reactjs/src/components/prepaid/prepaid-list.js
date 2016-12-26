
import React from "react";
import ReactDOM from "react-dom"
import PrepaidStore from "../../stores/prepaid/prepaid-stores";
import PrepaidDispatcher from "../../actions/prepaid/prepaid-creator";

export default class PrepaidList extends React.Component{
    constructor(props){
        super(props);
        this.initList = this.initList.bind(this);
        this.state = {
            items:[],
        }
    }
    componentDidMount(){

        PrepaidStore.addGetListListener(this.initList);

    }
    componentWillUnmount(){
        PrepaidStore.removGetListListener(this.initList);
    }
    initList(){
        var items = PrepaidStore.getList();
        this.setState({items:items});
    }
    getRows(){
        var rows = [];
        for(var i=0;i<this.state.items.length;i++){
            rows.push(
                <tr key={this.state.items[i].Id}>
                    <td><input type="checkbox"/></td>
                    <td>{this.state.items[i].ActAmount}</td>
                    <td>{this.state.items[i].Amount}</td>
                    <td>{this.state.items[i].Description}</td>
                    <td>{this.state.items[i].CreatedDate}</td>
                </tr>
            )
        }
        return rows;
    }
    getHeader(){
        return (
            <thead>
            <tr>
                <td></td>
                <td>实际充值金额</td>
                <td>充值可用金额</td>
                <td>备注</td>
                <td>充值日期</td>
            </tr>
            </thead>
        )
    }
    render(){
        return (
            <div>
                <table className="table table-bordered">
                    {this.getHeader()}
                    <tbody>
                    {this.getRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}