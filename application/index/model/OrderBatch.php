<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/23/2016
 * Time: 11:44 AM
 */

namespace app\index\model;


use think\Model;

class OrderBatch extends Model
{
    protected $table="PuffOrderBatch";

    public function orderItems(){
        return $this->hasMany("OrderItem", "BatchId","Id");
    }

    public function orderStatus(){
        return $this->hasOne("OrderStatus", "Id", "OrderStatus");
    }

    public function client(){
        return $this->belongsTo("Client", "ClientId", "Id");
    }

    public function prepaidDetails(){
        return $this->hasOne("PrepaidDetails", "BatchId", "Id", "", "left");
    }
}