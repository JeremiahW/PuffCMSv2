/**
 * Created by wangji on 12/19/2016.
 */
import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherClientSave extends Dispatcher{
    InitMemberLevelAction(data){
        this.dispatch({
            actionType:ActionConstants.INIT_MEMBER_LEVEL,
            data:data
        })
    }
}

const ClientSaveDispatcher  = new DispatcherClientSave();
export default ClientSaveDispatcher;