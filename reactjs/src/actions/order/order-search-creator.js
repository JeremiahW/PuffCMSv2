/**
 * Created by wangji on 12/23/2016.
 */
import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherOrderSearch extends Dispatcher{
    SearchAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_SEARCH,
            data:data
        })
    }

    InitStatusListAction(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_SEARCH_INIT,
            data:data
        })
    }

    OrderSelectionChanged(data){
        this.dispatch({
            actionType:ActionConstants.ORDER_LIST_ITEM_CHANGED,
            data:data
        })
    }

}

const OrderSearchDispatcher = new DispatcherOrderSearch();
export default OrderSearchDispatcher;