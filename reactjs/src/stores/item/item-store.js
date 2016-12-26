/**
 * Created by wangji on 12/19/2016.
 */
import ItemDispatcher from "../../actions/item/item-creator";
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";

var _items=[];
var _condition =[];
var _selectedItem = [];
var _result = [];
class ItemStoreClass extends  EventEmitter {
    addSaveListener(callback){
        this.on("save", callback);
    }
    removeSaveListener(callback){
        this.removeListener("save", callback);
    }
    addEditListener(callback){
        this.on("edit", callback);
    }
    removeEditListener(callback){
        this.removeListener("edit", callback);
    }
    addSearchListener(callback){
        this.on("search", callback);
    }
    removeSearchListener(callback){
        this.removeListener("search", callback);
    }

    addGetListener(callback){
        this.on("get", callback)
    }
    removeGetListener(callback){
        this.removeListener("get", callback);
    }


    getItems(){
        return _items;
    }
    getCondition(){
        return _condition;
    }
    getSelectedItem(){
        return _selectedItem;
    }
    getSaveResult(){
        return _result;
    }
}

const ItemStore = new ItemStoreClass();
export default ItemStore;

ItemDispatcher.register((action)=>{
    switch (action.actionType){
        case ActionConstants.ITEM_SAVE:
            saveItem(action.data);
            break;
        case ActionConstants.ITEM_SEARCH:
            _condition = action.data;
            getItems(action.data, "search")
            break;
        case ActionConstants.ITEM_GET:
            getItems(action.data, "get")
            break;
        case ActionConstants.ITEM_EDIT:
            _selectedItem = action.data;
            ItemStore.emit("edit");
            break;
    }
})

function getItems(data, action){
    $.ajax({
        url:RequestUrl.POST_GET_ITEMS,
        type:"POST",
        data:{page:data.page, id:data.id, search_name:data.search_name},
        success:function (response) {
            if(response.result === true){
                _items = response;
                console.log(response);
                ItemStore.emit(action);
            }
        }
    });
}

function saveItem(data) {
    $.ajax({
        url:RequestUrl.POST_SAVE_ITEMS,
        type:"POST",
        data:{form:data},
        success:function (response) {
            if(response.result == true){
                _result = response;
                ItemStore.emit("save");
            }
            console.log(response);
        }
    })
}