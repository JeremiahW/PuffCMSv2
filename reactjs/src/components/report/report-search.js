
import React from "react";
import {Button} from "react-bootstrap";
import ReportAction from "../../stores/report/report-store";
import ReportDispatcher from "../../actions/report/report-creator";
import moment from "moment";
import DatePicker from "react-datepicker";

export default class ReportSearch extends React.Component{
    constructor(props){
        super(props);
        this.onBtnSearchClick = this.onBtnSearchClick.bind(this);
        this.state = {
            search_start_date: moment().startOf("year"),
            search_end_date: moment()
        }
    }
    handleChange(name, event){
        var newState = {};
        switch (name){
            case "search_start_date":
            case "search_end_date":
                newState[name] = event;
                break;
            default:
                newState[name] = event.target.value;
        }
        this.setState(newState);
    }
    onBtnSearchClick(){
        var data = {
            search_start_date: this.state.search_start_date.format("YYYY-MM-DD"),
            search_end_date: this.state.search_end_date.format("YYYY-MM-DD"),
        }
        ReportDispatcher.GetMonthlyIncomeAction(data);
    }

    render(){
        return (
        <form className="form-horizontal">
            <div className="row">
            <div className="col-lg-12">
                <div className="form-group">
                    <label className="col-sm-1 control-label">开始日期</label>
                    <div className="col-sm-2">
                        <DatePicker className="form-control" selected={this.state.search_start_date} dateFormat="YYYY-MM-DD" onChange={this.handleChange.bind(this, "search_start_date")} />
                    </div>
                    <label className="col-sm-1 control-label">结束日期</label>
                    <div className="col-sm-2">
                        <DatePicker className="form-control" selected={this.state.search_end_date} dateFormat="YYYY-MM-DD" onChange={this.handleChange.bind(this, "search_end_date")} />
                    </div>
                    <div className="col-sm-2"><Button onClick={this.onBtnSearchClick}>查询</Button></div>
                </div>
            </div>
        </div>
        </form>)
    }

}