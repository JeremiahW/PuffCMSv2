/**
 * Created by wangji on 12/20/2016.
 */
import React from "react";
import {Modal, Button} from "react-bootstrap";
import ItemDispatcher from "../../actions/item/item-creator";
import ItemStore from "../../stores/item/item-store";

export default class ItemSave extends React.Component {
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.state = {
            ID:this.props.data.id,
            Subject: this.props.data.subject,
            Price: this.props.data.price,
            Unit: this.props.data.unit,
            Description:this.props.data.description,
            showModal :false
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.showModal){
            let newState = {
                ID:nextProps.data.id,
                Subject: nextProps.data.subject,
                Price: nextProps.data.price,
                Unit: nextProps.data.unit,
                Description:nextProps.data.description,
            }
            this.setState(newState);
        }
    }
    close(){
        this.props.callback();
    }
    handleChange(name, event){
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    }
    onSubmit(e){
        e.preventDefault();
        ItemDispatcher.ItemSaveAction(this.state);
    }
    render(){
        return(
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>项目信息管理</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit.bind(this)} method="post">
                        <div className="row">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">项目名称</label>
                                <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Subject")} value={this.state.Subject || ''} /></div>
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">价格</label>
                                <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Price")} value={this.state.Price || ''} /></div>
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">单位</label>
                                <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Unit")} value={this.state.Unit || ''} /></div>
                            </div>
                        </div>
                        <div className="hr-line-dashed"></div>
                        <div className="row">
                            <div className="form-group">
                                <label className="col-sm-2 control-label">描述</label>
                                <div className="col-sm-10"><input type="text" className="form-control"   onChange={this.handleChange.bind(this, "Description")} value={this.state.Description || ''} /></div>
                            </div>
                        </div>
                         <input type="hidden" className="form-control"   onChange={this.handleChange.bind(this, "ID")} value={this.state.ID || ''}  />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button onClick={this.onSubmit.bind(this)}>保存</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}