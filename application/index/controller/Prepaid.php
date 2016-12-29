<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/26/2016
 * Time: 3:00 PM
 */

namespace app\index\controller;


use app\common\BaseController;
use app\common\PuffCMSHelper;
use app\index\model\Prepaid as PrepaidModel;
use think\Db;
use think\Exception;
use think\Request;

class Prepaid extends BaseController
{
    public function get(){
        if(Request::instance()->isPost()){
            $clientId = Request::instance()->post("clientId");

            $list = PrepaidModel::where(["ClientId"=>$clientId])->order(["CreatedDate"=>"desc"])->select();
            return PuffCMSHelper::JsonResultNoPagination($list, true, "返回成功");
        }
        return PuffCMSHelper::JsonResultNoPagination("", false, "错误请求");
    }

    public function save(){
        if(Request::instance()->isPost()) {
            $data = Request::instance()->post("form/a");
            $result = $this->validate($data, "Prepaid", null, true);
            if(true !== $result){
                return PuffCMSHelper::JsonResult("", false, $result);
            }
            Db::startTrans();
            try {
                $db = new PrepaidModel();
                $data["Id"] = PuffCMSHelper::getGUID();

                $rows = Db::table("PuffClient")-> where(["Id" => $data["ClientId"]])->column("PrepaidBalance");
                $totalBalance = $rows[0] + $data["Amount"];
                $data["Balance"] =$totalBalance;
                Db::table("PuffClient")->where(["Id" => $data["ClientId"]])->setInc("PrepaidBalance", $data["Amount"]);

                $db->allowField(true)->save($data);
                Db::commit();
            }
            catch (Exception $e){
                Db::rollback();
                return PuffCMSHelper::JsonResult("", false, $e->getMessage());
            }

            //TODO 更新客户储值卡余额
            return PuffCMSHelper::JsonResult("", true, "数据添加成功");
        }

    }

}