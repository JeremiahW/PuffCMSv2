/**
 * Created by wangji on 12/14/2016.
 */
import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherClientList extends Dispatcher{
    ClientAddAction(data){
        this.dispatch({
            actionType:ActionConstants.CLIENT_ADD,
            data:data
        })
    }

    ClientEditAction(data){
        this.dispatch({
            actionType:ActionConstants.CLIENT_EDIT,
            data:data
        })
    }

    ClientModifyCompleteAction(data){
        this.dispatch({
            actionType:ActionConstants.CLIENT_MODIFY_COMPLETE,
            data:data
        })
    }
}


const ClientListDispatcher = new DispatcherClientList();
export default ClientListDispatcher;