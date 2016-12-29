import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";
class DispatcherItem extends Dispatcher {
    PrepaidSaveAction(data){
        this.dispatch({
            actionType:ActionConstants.PREPAID_SAVE,
            data:data,
        })
    }

    PrepaidGetList(data){
        this.dispatch({
            actionType:ActionConstants.PREPAID_GET_LIST,
            data:data,
        })
    }

    PrepaidGetDetailed(data){
        this.dispatch({
            actionType:ActionConstants.PREPAID_GET_DETAILED,
            data:data,
        })
    }

    PrepaidRowSelectedAction(data){
        this.dispatch({
            actionType:ActionConstants.PREPAID_ROW_SELECTED,
            data:data,
        })
    }

    PrepaidRowUnSelectedAction(data){
        this.dispatch({
            actionType:ActionConstants.PREPAID_ROW_UNSELECTED,
            data:data,
        })
    }
}

const PrepaidDispatcher = new DispatcherItem();
export default PrepaidDispatcher;