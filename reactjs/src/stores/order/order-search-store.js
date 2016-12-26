/**
 * Created by wangji on 12/23/2016.
 */
import OrderSearchDispatcher from "../../actions/order/order-search-creator";
import {ActionConstants} from "../../constants/action-constants";
import * as RequestUrl from "../../constants/request-url-constants";
import {EventEmitter} from "events";

var _status=[];
var _result = [];
var _condition = [];
var _selection=[];

class OrderSearchStoreClass extends EventEmitter{

    addInitStatusListener(callback){
        this.on("initStatus", callback);
    }
    removeInitStatusListener(callback){
        this.removeListener("initStatus", callback);
    }

    addSearchListener(callback){
        this.on("search", callback);
    }

    removeSearchListener(callback){
        this.removeListener("search", callback);
    }

    addOrderSelectionChangedListener(callback){
        this.on("selectionChanged", callback);

    }

    removeOrderSelectionChangedListener(callback){
        this.removeListener("selectionChanged", callback);

    }

    getStatus(){
        return _status;
    }

    getOrders(){
        return _result;
    }
    getCondition(){
        return _condition;
    }

    getSelections(){
        return _selection;
    }
}

const OrderSearchStore = new OrderSearchStoreClass();
export default OrderSearchStore;

OrderSearchDispatcher.register((action)=>{
    switch (action.actionType){
        case ActionConstants.ORDER_SEARCH_INIT:
            getStatus(action.data);
            break;
        case ActionConstants.ORDER_SEARCH:
            _condition = action.data;
            getOrders(action.data);
            break;
        case ActionConstants.ORDER_LIST_ITEM_CHANGED:
            selectionChanged(action.data);
            break;
    }
})

function getStatus(data){
    $.ajax({
        url:RequestUrl.GET_ORDER_STATUS,
        type:"POST",
        dataType:"json",
        success:function (response) {
            if(response.result == true){
                _status = response.data;
                OrderSearchStore.emit("initStatus");
            }
        }
    })
}

function getOrders(data) {
    console.log(data);
    // search_batch_id, search_client_name,
    //search_start_create_date, search_end_create_date
    //search_start_delivery_date,  search_start_delivery_date
    //search_order_status
    $.ajax({
        url:RequestUrl.GET_ORDER_LIST,
        type:"POST",
        dataType:"json",
        data:{
            search_batch_id:data.batchId,
            search_client_name:data.clientName,
            search_start_create_date:data.startCreateDate.format("YYYY-MM-DD"),
            search_end_create_date:data.endCreateDate.format("YYYY-MM-DD"),
            search_start_delivery_date:data.startDeliveryDate.format("YYYY-MM-DD"),
            search_start_delivery_date:data.endDeliveryDate.format("YYYY-MM-DD"),
            search_order_status:data.selectedStatus,
            page: data.page,
        },
        success:function (response) {
            if(response.result == true){
                _result = response;
                OrderSearchStore.emit("search");
            }
        }
    })
}

function selectionChanged(data) {
    console.log("Order list selection changed");
    var index = -1;
    var isMatch = false;
    for (var i=0;i<_selection.length;i++){
        if(_selection[i].batchId == data.data.batchId){
            isMatch = true;
            index = i;
            break;
        }
    }

    //如果找到匹配, 并且传递过来是Uncechk的状态, 则需要删除.
    if(isMatch && data.isChecked == false){
        _selection.splice(index, 1);
    } //如果没找到匹配, 并且传递过来的是Check状态, 则需要添加.
    else if(!isMatch && data.isChecked == true){
        _selection.push(data.data);
    }
    OrderSearchStore.emit("selectionChanged");

}