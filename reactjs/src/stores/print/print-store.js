/**
 * Created by wangji on 12/28/2016.
 */
import PrintDispatcher from "../../actions/print/print-creator";
import {ActionConstants} from "../../constants/action-constants";
import {EventEmitter} from "events";
import cookie from 'react-cookie';

var _orders = [];
var _receipts=[];

class PrintStoreClass extends EventEmitter{
    addPrintOrderListener(callback){
        this.on("printOrder", callback);
    }

    removePrintOrderListener(callback){
        this.removeListener("printOrder", callback);
    }

    addPrintPrepaidReceiptListener(callback){
        this.on("prepaidReceipt", callback);
    }

    removePrintPrepaidReceiptListener(callback){
        this.removeListener("prepaidReceipt", callback);
    }

    addPrintCompletedListener(callback){
        this.on("printCompleted", callback);
    }

    removePrintCompletedListener(callback){
        this.removeListener("printCompleted", callback);
    }

    getOrders(){
        return _orders;
    }
    getReceipts(){
        return _receipts;
    }
}

const PrintStore = new PrintStoreClass();
export default PrintStore;

PrintDispatcher.register((action)=>{
    switch (action.actionType){
        case ActionConstants.PRINT_ORDER_REVIEW:
            _orders = action.data;
            PrintStore.emit("printOrder");
            break;
        case ActionConstants.PRINT_PREPAID_RECEIPT_REVIEW:
            _orders = action.data;
            PrintStore.emit("prepaidReceipt");
            break;
        case ActionConstants.PRINT_COMPLETED:
            PrintStore.emit("printCompleted");
            break;
    }
})