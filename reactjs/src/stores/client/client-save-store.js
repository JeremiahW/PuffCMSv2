/**
 * Created by wangji on 12/19/2016.
 */

import ClientSaveDispatcher from "../../actions/client/client-save-creator";
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";

var _memberLevels;

class ClientSaveStoreClass extends EventEmitter{
    addChangeListener(callback){
        this.on("initMember", callback);
    }
    removeChangeListener(callback){
        this.removeListener("initMember", callback);
    }

    getMemberLevels(){
        return _memberLevels;
    }

}

const ClientSaveStore = new ClientSaveStoreClass();
export default ClientSaveStore;

ClientSaveDispatcher.register((action)=>{
    switch (action.actionType){
        case ActionConstants.INIT_MEMBER_LEVEL:
            initMemberLevels();
            break;
    }
})

function initMemberLevels(){
    $.ajax({
        url:RequestUrl.POST_GET_MEMBERLEVEL,
        type:"POST",
        dataType:"json",
        data:{},
        success:function (response) {
            if(response.result == true){
                _memberLevels = response.data;
                ClientSaveStore.emit("initMember");
            }
        }
    })
}