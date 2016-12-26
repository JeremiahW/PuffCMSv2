
import React from "react";
import {Button} from "react-bootstrap";
import AppDispatcher from "../../actions/client/client-search-creator";
import ClientListDispatcher from "../../actions/client/client-list-creator";

export default class ClientSearch extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            "name":"",
            "phone":"",
            "address":"",
            "id":"",
            "page":"1"
        }
    }
    componentDidMount(){
        AppDispatcher.ClientInitAction(this.state);
    }
    handleChange(name, event){
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    }

    onSubmit(e){
        e.preventDefault();
        AppDispatcher.ClientSearchAction(this.state);
    }
    onAdd(){
       ClientListDispatcher.ClientAddAction("client search");
    }

    render(){
        return(
                <form onSubmit={this.onSubmit.bind(this)} className="form-horizontal">
                    <div className="row">
                        <div className="form-group">
                            <label className="col-sm-1 control-label">ID</label>
                            <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "id")} /></div>

                            <label className="col-sm-1 control-label">姓名</label>
                            <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "name")} /></div>

                            <label className="col-sm-1 control-label">电话</label>
                            <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "phone")} /></div>


                        </div>

                    </div>
                    <div className="row">
                        <div className="form-group">

                                <label className="col-sm-1 control-label">地址</label>
                                <div className="col-sm-2"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "address")} /></div>

                                <input type="submit" className="btn btn-primary" value="查询"/>&nbsp;
                                <Button onClick={this.onAdd} >添加</Button>
                        </div>
                    </div>
                </form>
        )
    }
}