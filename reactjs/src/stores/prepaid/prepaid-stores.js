import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";
import PrepaidDispatcher from "../../actions/prepaid/prepaid-creator";
import cookie from 'react-cookie';
var _result = [];
var _details = [];
var _list = [];
var _selectedItems = [];

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
    removeGetListListener(callback){
        this.removeListener("getList", callback);
    }
    addGetDetailsListener(callback){
        this.on("getDetails", callback);
    }
    removeGetDetailsListener(callback){
        this.removeListener("getDetails", callback);
    }

    addSelectionChangedListener(callback){
        this.on("selectionChanged", callback);
    }
    removeSelectionChangedListener(callback){
        this.removeListener("selectionChanged", callback);
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

    getSelection(){
        return _selectedItems;
    }

    dispose(){
        _result = [];
        _details = [];
        _list = [];
       _selectedItems = [];
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
        case ActionConstants.PREPAID_ROW_UNSELECTED:
            removeSelection(action.data);
            PrepaidStore.emit("selectionChanged");
            break;
        case ActionConstants.PREPAID_ROW_SELECTED:
            _selectedItems.push(action.data);
            PrepaidStore.emit("selectionChanged");
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

function removeSelection(currentItem) {
    let items = _selectedItems;
    var index = -1;
    for(var i=0;i<items.length;i++){
        if(items[i].Id == currentItem.Id){
            index = i;
            console.log("Find Match at " + index);
        }
    }
    if(index > -1) {
        items.splice(index, 1);
    }
}