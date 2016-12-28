/**
 * Created by wangji on 12/28/2016.
 */
import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherPrint extends Dispatcher{
    PrintOrderAction(data){
        this.dispatch({
            actionType:ActionConstants.PRINT_ORDER_REVIEW,
            data:data,
        })
    }

    PrintPrepaidReceiptAction(data){
        this.dispatch({
            actionType:ActionConstants.PRINT_PREPAID_RECEIPT_REVIEW,
            data:data,
        })
    }

    PrintCompleteAction(data){
        this.dispatch({
            actionType:ActionConstants.PRINT_COMPLETED,
            data:data,
        })
    }
}

const PrintDispatcher = new DispatcherPrint();
export default PrintDispatcher;