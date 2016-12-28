import AppDispatcher from "../../actions/client/client-search-creator";
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";
import cookie from 'react-cookie';

var _result = [];
var _condition = [];
class ClientSearchStoreClass extends EventEmitter{
    addChangeListener(callback){
        this.on("search", callback);
    }
    removeChangeListener(callback){
        this.removeListener("search", callback);
    }

    getResult(){
        console.log("client-search-store getResult has been executed.");
        return _result;
    }

    getCondition(){
        console.log("client-search-store getResult has been executed.");
        return _condition;
    }

}

const ClientSearchStore = new ClientSearchStoreClass();
export default ClientSearchStore;

AppDispatcher.register((action)=>{
    console.log("Client Search Store Registered");
    switch (action.actionType){
        case ActionConstants.CLIENT_INIT:
            getClient(action.data);
            break;
        case ActionConstants.CLIENT_SEARCH:
            getClient(action.data);
            break;
    }
});

function getClient(data){
    _condition = data;
    $.ajax({
        url:RequestUrl.POST_GET_CLIENTS,
        type:"POST",
        dataType:"json",
        data:{"page":data.page, "id":data.id, "search_name":data.name, "search_phone":data.phone, "search_address":data.address,token:cookie.load('token')},
        success:function (response) {
            if(response.result == true){
                _result = response;
                ClientSearchStore.emit("search");
            }
        }
    })
}