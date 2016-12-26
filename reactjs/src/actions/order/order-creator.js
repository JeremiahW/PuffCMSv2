
import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";
class DispatcherOrder extends Dispatcher {
    GetClientByNameAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_GET_CLIENT_BY_NAME,
            data:data,
        })
    }

    OrderSubmitAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_SUBMIT,
            data:data,
        })
    }

    OrderItemAddAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_ITEM_ADD,
            data:data,
        })
    }

    OrderItemRemoveAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_ITEM_REMOVE,
            data:data,
        })
    }

    OrderPrintAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_PRINT,
            data:data,
        })
    }

    OrderDeleteAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_DELETE,
            data:data,
        })
    }

    OrderSearchAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_SEARCH,
            data:data,
        })
    }

    GetFinalItemsAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_GET_FINAL_ITEMS,
            data:data,
        })
    }

    OrderItemUpdatedAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_ITEM_UPDATED,
            data:data,
        })
    }

    GetAvailableItemsAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_GET_AVAILABLE_ITEMS,
            data:data,
        })
    }
}


const OrderDispatcher = new DispatcherOrder();
export default OrderDispatcher;