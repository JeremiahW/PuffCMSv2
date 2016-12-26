/**
 * Created by wangji on 12/14/2016.
 */
import AppDispatcher from "../../actions/client/client-list-creator";
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";


var _data = [];
class ClientListStoreClass extends EventEmitter{
    addChangeListener(callback){
        this.on("client", callback);
    }
    removeChangeListener(callback){
        this.removeListener("client", callback);
    }

    addClientSaveListener(callback){
        this.on("save", callback);
    }
    removeClientSaveListener(callback){
        this.removeListener("save", callback)
    }

    getClient(){
        console.log("getClient");
        console.log(_data);
        return _data;
    }
}

const ClientListStore = new ClientListStoreClass();
export default  ClientListStore;

AppDispatcher.register((action)=>{
    switch (action.actionType){
        case ActionConstants.CLIENT_EDIT:
            _data = action.data;
            console.log("CLIENT EDIT has been triggered");
            ClientListStore.emit("client");
            break;
        case ActionConstants.CLIENT_ADD:
            console.log("CLIENT_ADD has been triggered")
            _data = action.data;
            ClientListStore.emit("client");
            break;
        case ActionConstants.CLIENT_MODIFY_COMPLETE:
            console.log("CLIENT_MODIFY_COMPLETE has been triggered")
            saveClient(action.data);
             break;
    }
})


function saveClient(data) {
    $.ajax({
        url:RequestUrl.POST_SAVE_CLIENT,
        type:"POST",
        dataType:"json",
        data:{form:data},
        crossDomain : true,
        success:function (response) {
            if(response.result == true){
                console.log("客户保存成功.");
                ClientListStore.emit("save");
            }
            else{
                console.log(response);
            }
        }
    })
}