/**
 * Created by wangji on 12/19/2016.
 */
import React from "react";
import {Pagination, Button} from "react-bootstrap"
import ItemSearchView from "../../components/item/item-search";
import ItemSaveView from "../../components/item/item-save";
import ItemDispatcher from "../../actions/item/item-creator";
import ItemStore from "../../stores/item/item-store";

export default class ItemList extends React.Component{
    constructor(props){
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.getRows = this.getRows.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClosePopup = this.onClosePopup.bind(this);
        this.onShowPopup = this.onShowPopup.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {
            data:"",
            page:1,
            totalPages:1,
            pageSize:50,
            showModal:false,
            selectedRow:""
        }
    }
    componentDidMount() {
        ItemStore.addSearchListener(this.onSearch);
        ItemStore.addGetListener(this.onSearch);
        ItemStore.addEditListener(this.onShowPopup);
        ItemStore.addSaveListener(this.onSave);

        //初始化列表
        ItemDispatcher.ItemGetAction(this.state);
    }

    componentWillUnmount(){
        ItemStore.removeSearchListener(this.onSearch);
        ItemStore.removeGetListener(this.onSearch);
        ItemStore.removeEditListener(this.onShowPopup);
        ItemStore.removeSaveListener(this.onSave);
    }

    onSearch(){
        var result = ItemStore.getItems();
        let newState = {
            data:result.data,
            page:1,
            totalPages:result.totalPages,
            pageSize:result.pageSize,
        }
        this.setState(newState);
        console.log("查询完成");
    }

    getRows(){
        console.log(this.state.data);
        var rows=[];
        for(var i=0;i<this.state.data.length;i++){
            rows.push(<ResultRow
                key = {this.state.data[i].ID}
                subject = {this.state.data[i].Subject}
                price={this.state.data[i].Price}
                unit = {this.state.data[i].Unit}
                description =  {this.state.data[i].Description}
                id = {this.state.data[i].ID}
            />);
        }
        return rows;
    }

    onSelect(eventKey){
        this.setState({page:eventKey}, function () {
            let condition = ItemStore.getCondition();
            condition.page = this.state.page;
            ItemDispatcher.ItemSearchAction(condition);
        }.bind(this));
    }

    onClosePopup(){
        this.setState({showModal:false});
        let condition = ItemStore.getCondition();
        ItemDispatcher.ItemSearchAction(condition);
    }

    onShowPopup(){
        this.setState({showModal:true, selectedRow: ItemStore.getSelectedItem()});
    }

    onSave(){
        let result = ItemStore.getSaveResult();
        if(result.result == true){
            this.onClosePopup();
        }
    }

    render(){
        return (<div className="wrapper wrapper-content">
                <ItemSaveView showModal={this.state.showModal} data={this.state.selectedRow}  callback={this.onClosePopup} />
                <ItemSearchView/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <table className="table table-bordered">
                                {<ResultHeader/>}
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
                                onSelect={this.onSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ResultHeader extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <thead>
        <tr>
            <td>项目名称</td>
            <td>价格</td>
            <td>单位</td>
            <td>描述</td>
            <td>&nbsp;</td>
        </tr>
        </thead>
    }
}

class ResultRow extends React.Component{
    constructor(props){
        super(props)
        this.editClick = this.editClick.bind(this);
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    editClick(){
        ItemDispatcher.ItemEditAction(this.props);
    }

    render(){
        return <tr>
            <td>{this.props.subject}</td>
            <td>{this.props.price}</td>
            <td>{this.props.unit}</td>
            <td>{this.props.description}</td>
            <td>
                <Button onClick={this.editClick} className="btn btn-default">修改</Button>
            </td>
        </tr>
    }
}