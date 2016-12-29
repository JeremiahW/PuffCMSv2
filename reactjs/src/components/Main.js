import React  from 'react';
import ReportAction from "../stores/report/report-store";
import ReportDispatcher from "../actions/report/report-creator";
import {BarChart} from 'react-d3-basic';
import ReportSearch from './report/report-search';

class Main extends React.Component {
    constructor(props){
        super(props)
        this.initMonthlyIncomeData = this.initMonthlyIncomeData.bind(this);

        this.state = {
            monthlyData:[],
        }
    }
    componentDidMount(){
        ReportAction.addGetMonthlyIncomeDataListener(this.initMonthlyIncomeData);
        ReportDispatcher.GetMonthlyIncomeAction("");
    }
    componentWillUnmount(){
        ReportAction.removeGetMonthlyIncomeDataListner(this.initMonthlyIncomeData);
    }
    initMonthlyIncomeData(){
        var data = ReportAction.getMonthlyIncomeData();
        this.setState({monthlyData:data});
    }
    getMonthlyChart(){
       if(this.state.monthlyData.length > 0){
           console.log(this.state.monthlyData);

            var   chartSeries = [
                   {
                       field: 'Amount',
                       name: '销售额'
                   }
               ],
               x = function(d) {
                   return d.Year + "/" + d.Month;
               },
               xScale = 'ordinal'
          return (<BarChart
               title= {"月销售数据展示"}
               data= {this.state.monthlyData}
               width= {800}
               height= {400}
               chartSeries = {chartSeries}
               x= {x}
               xLabel= {"每月数据"}
               xScale= {xScale}
               yLabel = {"订单成效额"}
           />);
       }
        /*
        var data = [{
            label: 'somethingA',
            values: this.state.monthlyData.map(function (item) {
                let xLabel = item.Year + "/" + item.Month;
                return { x: xLabel,y:item.Amount }
            })
        }];*/
    }
    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <ReportSearch/>
                <div className="row">

                    <div className="col-lg-12">
                             {this.getMonthlyChart()}

                    </div>

                </div>
            </div>
        )
    }

}

export default Main