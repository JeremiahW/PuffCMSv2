/**
 * Created by wangji on 12/29/2016.
 */
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import ReportDispatcher from "../../actions/report/report-creator";
import {EventEmitter} from "events";
import cookie from 'react-cookie';

var _monthlyIncomeData =[];

class ReportStoreClass extends EventEmitter{
    addGetMonthlyIncomeDataListener(callback){
        this.on("monthlyIncome", callback);
    }

    removeGetMonthlyIncomeDataListner(callback){
        this.removeListener("monthlyIncome", callback);
    }


    getMonthlyIncomeData(){
        return _monthlyIncomeData;
    }

}

const ReportStore = new ReportStoreClass();
export default ReportStore;

ReportDispatcher.register((action)=>{
   switch (action.actionType){
       case ActionConstants.REPORT_GET_MONTHLY_INCOME:
           getMonthlyData(action.data)
           break;
   }
});

function getMonthlyData(data) {
    console.log("getMonthlyData");
    console.log(data);
    $.ajax({
        url:RequestUrl.REPORT_MONTHLY_INCOME,
        type:"POST",
        data:{search_start_date:data.search_start_date,search_end_date:data.search_end_date, token:cookie.load('token')},
        success:function (response) {
            if(response.result == true){
                console.log(response);
                _monthlyIncomeData = response.data;
                ReportStore.emit("monthlyIncome");
            }
            console.log(response);
        }
    })
}