/**
 * Created by wangji on 12/20/2016.
 */
import OrderDispatcher from "../../actions/order/order-creator";
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";
import cookie from 'react-cookie';

var _clients=[];
var _availableItems = [];
var _finalItems = [];
var _currentItem = "";
var _serverResponse="";

class OrderStoreClass extends EventEmitter{
    addGetClientListener(callback){
        this.on("getclient", callback);
    }
    removeGetClientListener(callback){
        this.removeListener("removeclient", callback);
    }
    addGetAvailableItemsListener(callback){
        this.on("getAvailableItems", callback);
    }
    removeGetAvailableItemsListener(callback){
        this.removeListener("getAvailableItems", callback);
    }

    addItemUpdatedListener(callback){
        this.on("itemUpdated", callback);
    }
    removeItemUpdatedListener(callback){
        this.removeListener("itemUpdated", callback);
    }

    addItemAddListener(callback) {
        this.on("itemAdd", callback);
    }
    removeItemAddListener(callback){
        this.removeListener("itemAdd", callback);
    }

    addItemRemoveListener(callback) {
        this.on("itemRemoved", callback);
    }
    removeItemRemoveListener(callback){
        this.removeListener("itemRemoved", callback);
    }

    addOrderSubmitListener(callback){
        this.on("orderSubmit", callback);
    }
    removeOrderSubmitListener(callback){
        this.removeListener("orderSubmit", callback);
    }

    getClients(){
        return _clients;
    }
    getAvailableItems(){
        return _availableItems;
    }
    getFinalItems(){
        return _finalItems;
    }
    getCurrentItem(){
        return _currentItem;
    }
    getServerResponse(){
        return _serverResponse;
    }

    dispose(){
         _clients=[];
         _availableItems = [];
         _finalItems = [];
         _currentItem = "";
         _serverResponse="";
    }
}

const OrderStore = new OrderStoreClass();
export default OrderStore;

OrderDispatcher.register((action)=>{
    switch (action.actionType){
        case ActionConstants.ORDER_GET_CLIENT_BY_NAME:
            break;
        case ActionConstants.ORDER_GET_AVAILABLE_ITEMS:
            getAvailableItems();
            break;
        case ActionConstants.ORDER_ITEM_UPDATED:
            console.log("ORDER_ITEM_UPDATED");
            if(action.data!="") {
                _currentItem = action.data;
                updateFinalItem(action.data);
            }
            OrderStore.emit("itemUpdated");
            break;
        case ActionConstants.ORDER_ITEM_REMOVE:
            console.log("ORDER_ITEM_REMOVE");
            _currentItem = action.data;
            removeFinalItem(action.data);
            OrderStore.emit("itemRemoved");
            break;
        case ActionConstants.ORDER_ITEM_ADD:
            _currentItem = action.data;
            _finalItems.push(action.data);
            OrderStore.emit("itemAdd");
            break;
        case ActionConstants.ORDER_SUBMIT:
            console.log("ORDER_SUBMIT");
            saveOrder(action.data);
            OrderStore.emit("orderSubmit");
            break;
    }
})


function getAvailableItems() {
    $.ajax({
        url:RequestUrl.POST_GET_ITEMS,
        type:"POST",
        data:{token:cookie.load('token')},
        success:function (response) {
            if(response.result === true){
                _availableItems = response.data;
                console.log(response);
                OrderStore.emit("getAvailableItems");
            }
        }
    });
}

function removeFinalItem(currentItem) {
    let items = _finalItems;
    var index = -1;
    for(var i=0;i<items.length;i++){
        if(items[i].id == currentItem.id){
            index = i;
            console.log("Find Match at " + index);
        }
    }
    if(index > -1) {
        items.splice(index, 1);
    }
}

function updateFinalItem(currentItem) {
    let items = _finalItems;
    for(var i=0;i<items.length;i++){
        if(items[i].id == currentItem.id){
            items[i].selectedItem = currentItem.selectedItem;
            items[i].price = currentItem.price;
            items[i].actPrice = currentItem.actPrice;
            items[i].unit = currentItem.unit;
            items[i].description = currentItem.description;
            items[i].num = currentItem.num;
        }
    }
}

function saveOrder(data) {
    $.ajax({
        url:RequestUrl.POST_SAVE_ORDER,
        type:"POST",
        data:{form:data, token:cookie.load('token')},
        success:function (response) {
            if(response.result === true){


            }
            console.log(response);
            _serverResponse = response;
            OrderStore.emit("orderSubmit");
        }
    });
}