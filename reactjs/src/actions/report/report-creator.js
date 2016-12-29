import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherReport extends Dispatcher{
    GetMonthlyIncomeAction(data){
        this.dispatch({
            actionType:ActionConstants.REPORT_GET_MONTHLY_INCOME,
            data:data,
        })
    }
}

const ReportDispatcher = new DispatcherReport();
export default ReportDispatcher;