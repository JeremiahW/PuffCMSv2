<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/22/2016
 * Time: 3:35 PM
 */

namespace app\index\controller;


use app\common\BaseController;
use app\common\PuffCMSHelper;
use app\index\model\Client;
use app\index\model\Item;
use app\index\model\OrderBatch;
use app\index\model\OrderStatus;
use app\index\model\Prepaid;
use app\index\model\PrepaidDetails;
use think\Controller;
use think\Db;
use think\Request;
use think\response\Json;

class Order extends BaseController
{
    public function __construct(Request $request = null)
    {
        //header('Access-Control-Allow-Origin: *');
        parent::__construct($request);
    }

    public function save(){

        if(Request::instance()->isPost()) {
            $data = Request::instance()->post("form/a");
            $result = $this->allowSave();

            if($result["isSaved"]){
               Db::startTrans();
               try{
                   $batchId = PuffCMSHelper::getGUID();
                   $clientId = $data["clientId"];
                   $totalPrice = 0;
                   $totalActPrice = 0;
                   foreach ($data["items"] as  $item){
                       $itemId = $item["selectedItem"];
                       $itemName = Item::get(["ID"=>$itemId])["Subject"];
                       $itemActPrice = $item["actPrice"];
                       $itemPrice = $item["price"];
                       $itemNum = $item["num"];
                       $itemUnit = $item["unit"];
                       $itemTotalPrice = $itemPrice * $itemNum;
                       $itemTotalActPrice = $itemActPrice * $itemNum;

                       $totalPrice += $itemTotalPrice;
                      // $totalActPrice += $itemTotalActPrice;

                        $insert = [
                            "Id"=>PuffCMSHelper::getGUID(),
                            "BatchId"=>$batchId,
                            "ItemId" =>$itemId,
                            "ItemName"=>$itemName,
                            "ItemUnit"=>$itemUnit,
                            "ItemPrice"=>$itemPrice,
                            "ItemNum" =>$itemNum,
                            "ItemTotalPrice"=>$itemTotalPrice,
                            "ItemActPrice"=>$itemTotalActPrice,
                            "CreatedDate"=>date("Y-m-d H:i:s")
                        ];
                        Db::table("PuffOrderItem")->insert($insert);

                   }
                     Db::table("PuffOrderBatch")->insert([
                        "Id"=>$batchId,
                        "ClientId"=>$clientId,
                        "TotalAmount"=>$totalPrice,
                        "ActAmount"=>$data["totalActPrice"],

                        "CreatedTime"=>date("Y-m-d H:i:s"),
                        "Commnet"=>$data["comment"],
                        "DeliveryDate"=> $data["deliveryDate"],
                        "OrderStatus"=>"1"
                    ]);

                   $totalActPrice = $data["totalActPrice"];
                   //储值卡余额
                    $prepaidBalance = Client::get(["Id"=>$clientId])["PrepaidBalance"];
                    $cash = 0;  //本次现金消费金额.
                    $prepaidExpense = 0; //本次储值卡消费金额.
                    $balance = 0;  //本次储值卡消费后的余额.
                    if($prepaidBalance - $totalActPrice >=0){
                        $prepaidExpense =  $totalActPrice;
                        $balance  = $prepaidBalance - $totalActPrice;
                    }
                    else if($prepaidBalance - $totalActPrice <=0) {
                        $cash = $totalActPrice - $prepaidBalance; //现金支付额 = 实际消费金额 - 储值卡余额
                        $prepaidExpense = $prepaidBalance;  //储值卡消费 = 储值卡全部的消费.
                        $balance = 0; //储值卡没钱了.
                    }
                    Db::table("PuffPrepaidDetails")->insert([
                            "Id"=>PuffCMSHelper::getGUID(),
                            "BatchId"=>$batchId,
                            "ClientId"=>$clientId,
                            "PrepaidExpense"=>$prepaidExpense,
                            "PrepaidBalance"=>$balance,
                            "CashExpense"=>$cash,
                            "CreatedDate"=>date("Y-m-d H:i:s"),
                        ]);

                   //总额需要刷新客户的消费记录, 更新最后消费日期.
                   Db::table("PuffClient")->where(["Id"=>$clientId])->setInc("Total", $totalActPrice);
                   Db::table("PuffClient")->where(["Id"=>$clientId])->update(["LastShoppedDate"=>date("Y-m-d H:i:s"), "PrepaidBalance"=>$balance]);
                   Db::commit();

                   $list = OrderBatch::with("orderItems,orderStatus,client,prepaidDetails")
                       ->where(["PuffOrderBatch.Id"=>$batchId])
                       ->order(["CreatedTime"=>"desc","DeliveryDate"=>"desc", "ActAmount"=>"desc", "OrderStatus"=>"asc"])
                       ->select();

                   return PuffCMSHelper::JsonResult($list, true, "订单保存成功");
               }
               catch (\Exception $e){
                   Db::rollback();
                   return PuffCMSHelper::JsonResult("", false, $e->getMessage());
               }
                //totalPrice:this.state.totalPrice,
                //            totalActPrice:this.state.totalActPrice,
                //            deliveryDate:this.state.deliveryDate.toDate(),
                //             comment:this.state.comment

            }
            return PuffCMSHelper::JsonResult("", $result["isSaved"], $result["message"]);

        }
        return PuffCMSHelper::JsonResult("", false, "非法请求");


            //return PuffCMSHelper::JsonResult($list, true, true, $totalPages, PuffCMSHelper::$ItemPageSize);
    }

    public function get(){
        $page = Request::instance()->post("page");
        if (empty($page))
            $page = 1;

        $count = OrderBatch::with("orderItems,orderStatus,client,prepaidDetails")->where($this->getWhere())->count();
        $totalPage = ceil($count / PuffCMSHelper::$OrderPageSize);

        $list = OrderBatch::with("orderItems,orderStatus,client,prepaidDetails")->where($this->getWhere())
            ->limit($page-1, PuffCMSHelper::$OrderPageSize)
            ->order(["CreatedTime"=>"desc","DeliveryDate"=>"desc", "ActAmount"=>"desc", "OrderStatus"=>"asc"])
            ->select();

        return PuffCMSHelper::JsonResult($list, true, true, $totalPage, PuffCMSHelper::$OrderPageSize);
    }

    public function getStatus(){
        $list = OrderStatus::where("1=1")->select();
        return PuffCMSHelper::JsonResultNoPagination($list, true, "成功");
    }

    public function getBalance(){
        $cid = Request::instance()->param("cid");
        if(!empty($cid)){
            $totalPrepaid = Prepaid::where(["ClientId"=>$cid])->sum("Amount");
            $totalExpense = PrepaidDetails::where(["ClientId"=>$cid])->sum("PrepaidExpense");
            $result = ["totalPrepaid"=>$totalPrepaid, "totalExpense"=>$totalExpense, "balance"=>$totalPrepaid - $totalExpense];
            return PuffCMSHelper::JsonResultNoPagination($result, true, "请求成功");
        }
        else{
            return PuffCMSHelper::JsonResultNoPagination(false, false, "请求错误");
        }
    }

    protected function allowSave(){
        $isSaved = true;
        $message = "";

        $data = Request::instance()->post("form/a");

        if(!array_key_exists("clientId", $data) || empty($data["clientId"])){
            $isSaved = false;
            $message .="没有选择客户信息";
        }

        if(!array_key_exists("deliveryDate", $data) || empty($data["deliveryDate"])){
            $isSaved = false;
            $message .="没有送货日期";
        }

        if(!array_key_exists("items", $data) || sizeof($data["items"])<=0){
            $isSaved = false;
            $message .="没有具体的收费项目.";
        }
        else{
            foreach ($data["items"] as $item){
                if($item["selectedItem"] == ""){
                    $isSaved = false;
                    $message .="请为已添加的项目选择收费条目..";
                    break;
                }
            }

        }
        return ["isSaved" =>$isSaved, "message"=>$message];
    }

    protected function getWhere(){
        $id = input("post.search_batch_id");  //BatchId
        $clientName = input("post.search_client_name");

        $startCreatedDate = input("post.search_start_create_date");
        $endCreatedDate = input("post.search_end_create_date");
        $startDeliveryDate = input("post.search_start_delivery_date");
        $endDeliveryDate = input("post.search_start_delivery_date");

        $orderStatus = input("search_order_status");

     //   $id = "ce004d83-8679-7d39-a474-6a526801d1f0";

        if(empty($id))
            $map["PuffOrderBatch.Id"] = ["<>", "NULL"];
        else
            $map["PuffOrderBatch.Id"] = ["=", "$id"];

        if(!empty($orderStatus))
            $map["OrderStatus"] = ["=", $orderStatus];

        if(!empty($clientName)){
            $clients = Client::where(["Name"=>["like", "%$clientName%"]])->column("Id", "Id");
            $cIds = array_keys($clients);

            if(sizeof($cIds)>0){
                $map["ClientId"] = ["in", $cIds];
            }
        }
        if(PuffCMSHelper::isDateTime($startCreatedDate) && PuffCMSHelper::isDateTime($endCreatedDate) ){
            $map["CreatedTime"] = array(array(">=", $startCreatedDate),array("<=", $endCreatedDate));
        }
        if(PuffCMSHelper::isDateTime($startCreatedDate) && PuffCMSHelper::isDateTime($endCreatedDate) ){
            $map["DeliveryDate"] = array(array(">=", $startDeliveryDate),array("<=", $endDeliveryDate));
        }
        return $map;
    }

    protected function savePrepaidDetails($clientId, $batchId){

    }

    public function test(){
       $aa =  Client::get(["Id"=>'173ECB15-956C-99A7-8824-4CE7CA86DD4E'])["PrepaidBalance"];
       return json($aa);
    }

    public function monthlyIncome(){
        $map["Id"] =["<>", ""];
        $start = Request::instance()->param("search_start_date");
        $end = Request::instance()->param("search_end_date");

        if(PuffCMSHelper::isDate($start) && PuffCMSHelper::isDate($end) ){
            $map["CreatedTime"] = array(array(">=", $start),array("<=", $end));
        }

        $list = Db::table("PuffOrderBatch")->field('count(Id) Total,sum(ActAmount) Amount,Year(CreatedTime) Year,Month(CreatedTime) Month')
            ->where($map)
            ->group("Year(CreatedTime),Month(CreatedTime)")
            ->order(["CreatedTime"=>"asc"])
            ->select();
        return PuffCMSHelper::JsonResultNoPagination($list, true, "请求成功");
    }


}
