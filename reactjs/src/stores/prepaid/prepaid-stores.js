import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";
import PrepaidDispatcher from "../../actions/prepaid/prepaid-creator";
import cookie from 'react-cookie';
var _result = [];
var _details = [];
var _list = [];

class PrepaidStoreClass extends EventEmitter{
    addSaveListener(callback){
        this.on("save", callback);
    }
    removeSaveListener(callback){
        this.removeListener("save", callback);
    }
    addGetListListener(callback){
        this.on("getList", callback);
    }
    removGetListListener(callback){
        this.removeListener("getList", callback);
    }
    addGetDetailsListener(callback){
        this.on("getDetails", callback);
    }
    removGetDetailsListener(callback){
        this.removeListener("getDetails", callback);
    }

    getDetails(){
        return _details;
    }

    getList(){
        return _list;
    }

    getResult(){
        return _result;
    }

}

const PrepaidStore = new PrepaidStoreClass();
export default PrepaidStore;

PrepaidDispatcher.register((action)=>{
    switch (action.actionType) {
        case ActionConstants.PREPAID_SAVE:
            save(action.data);
            break;

        case ActionConstants.PREPAID_GET_LIST:
            getList(action.data);
            break;
        case ActionConstants.PREPAID_GET_DETAILED:
            break;
    }
})

function save(data) {
    $.ajax({
        url:RequestUrl.POST_PREPAID,
        type:"POST",
        data:{form:data,token:cookie.load('token')},
        success:function (response) {
            if(response.result == true){
                _result = response;
                PrepaidStore.emit("save");
            }
            console.log(response);
        }
    })
}

function getList(data) {
    $.ajax({
        url:RequestUrl.GET_PREPAID_LIST,
        type:"POST",
        data:{clientId:data,token:cookie.load('token')},
        success:function (response) {
            if(response.result == true){
                _list = response.data;
                PrepaidStore.emit("getList");
            }
            console.log(response);
        }
    })
}