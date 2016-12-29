
import React from "react";
import ReactDOM from "react-dom"
import PrepaidStore from "../../stores/prepaid/prepaid-stores";
import PrepaidDispatcher from "../../actions/prepaid/prepaid-creator";

export default class PrepaidList extends React.Component{
    constructor(props){
        super(props);
        this.initList = this.initList.bind(this);
        this.onSelectionChangedCallback = this.onSelectionChangedCallback.bind(this);
        this.state = {
            items:[],
            isSelected:false,

        }
    }
    componentDidMount(){
        PrepaidStore.addGetListListener(this.initList);
        PrepaidStore.addSelectionChangedListener(this.onSelectionChangedCallback);
    }
    componentWillUnmount(){
        PrepaidStore.removeGetListListener(this.initList);
        PrepaidStore.removeSelectionChangedListener(this.onSelectionChangedCallback);
    }
    initList(){
        var items = PrepaidStore.getList();
        this.setState({items:items});
    }
    onSelectionChangedCallback(){
        var items = PrepaidStore.getSelection();
        console.log(items);
    }
    getRows(){
        var rows = [];
        for(var i=0;i<this.state.items.length;i++){
            rows.push(<PrepaidRow key={this.state.items[i].Id}  Id={this.state.items[i].Id}
                                   ActAmount={this.state.items[i].ActAmount}
                                   Amount={this.state.items[i].Amount}
                                  Balance={this.state.items[i].Balance}
                                   Description={this.state.items[i].Description}
                                   CreatedDate={this.state.items[i].CreatedDate}/>)
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
                <td>账户可用余额</td>
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

class PrepaidRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSelected:false,
            ActAmount : this.props.ActAmount,
            Amount : this.props.Amount,
            Description : this.props.Description,
            CreatedDate : this.props.CreatedDate,
            Id : this.props.Id,
            Balance: this.props.Balance
        }
    }
    handleChange(name,event){
        var newState = [];
        switch (name){
            case "isSelected":
                newState[name] = !this.state.isSelected;
                break;
        }
        this.setState(newState, function () {
            if(this.state.isSelected){
                console.log("Selected");
                PrepaidDispatcher.PrepaidRowSelectedAction(this.state);
            }
            else{
                console.log("Unselected");
                PrepaidDispatcher.PrepaidRowUnSelectedAction(this.state);
            }
        }.bind(this));
    }
    render(){
       return  (<tr key={this.state.Id}>
            <td><input type="checkbox" onChange={this.handleChange.bind(this, "isSelected")} /></td>
            <td>{this.state.ActAmount}</td>
            <td>{this.state.Amount}</td>
            <td>{this.state.Balance}</td>
            <td>{this.state.Description}</td>
            <td>{this.state.CreatedDate}</td>
        </tr>)
    }
}