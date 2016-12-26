import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherItem extends Dispatcher{
    ItemAddAction(data){
        this.dispatch({
            actionType:ActionConstants.ITEM_ADD,
            data:data,
        })
    }

    ItemEditAction(data){
        this.dispatch({
            actionType:ActionConstants.ITEM_EDIT,
            data:data,
        })
    }
    ItemSaveAction(data){
        this.dispatch({
            actionType:ActionConstants.ITEM_SAVE,
            data:data,
        })
    }
    ItemSearchAction(data){
        this.dispatch({
            actionType:ActionConstants.ITEM_SEARCH,
            data:data,
        })
    }

    ItemGetAction(data){
        this.dispatch({
            actionType:ActionConstants.ITEM_GET,
            data:data,
        })
    }

    ItemDeleteAction(data){
        this.dispatch({
            actionType:ActionConstants.ITEM_DELETE,
            data:data,
        })
    }
}

const ItemDispatcher = new DispatcherItem();
export default ItemDispatcher;