/**
 * Created by wangji on 12/20/2016.
 */
import React from "react";
import ItemDispatcher from "../../actions/item/item-creator";
import {Button} from "react-bootstrap"
export default class ItemSearch extends React.Component{
    constructor(props){
        super(props)
        this.clickBtnSearch = this.clickBtnSearch.bind(this);
        this.clickBtnAdd = this.clickBtnAdd.bind(this);
        this.state = {
            page:1,
            search_name:"",
            id:""
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }

    clickBtnSearch(){
        ItemDispatcher.ItemSearchAction(this.state);
    }

    clickBtnAdd(){
        ItemDispatcher.ItemEditAction("");
    }
    handleChange(name, event){
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    }

    render(){
        return (<form onSubmit={this.clickBtnSearch} className="form-horizontal">
            <div className="row">
                <div className="form-group">
                    <label className="col-sm-2 control-label">ID</label>
                    <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "id")} /></div>

                    <label className="col-sm-2 control-label">项目名称</label>
                    <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "search_name")} /></div>

                    <div className="col-sm-4">
                        <input type="submit" className="btn btn-primary" value="查询"/>&nbsp;
                        <Button onClick={this.clickBtnAdd} >添加</Button>
                    </div>
                </div>
            </div>
        </form>)
    }

}