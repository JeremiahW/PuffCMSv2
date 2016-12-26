<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/19/2016
 * Time: 5:25 PM
 */

namespace app\index\controller;


use app\common\BaseController;
use app\common\PuffCMSHelper;
use think\Request;
use app\index\model\Item as ItemModel;

class Item extends BaseController
{
    public function get(){
        $page = Request::instance()->post("page");
        if(empty($page)) $page = 1;

        $count = ItemModel::where($this->getWhere())->count();
        $totalPages = ceil($count / PuffCMSHelper::$ItemPageSize);

        $list = ItemModel::where($this->getWhere())
            ->limit($page-1, PuffCMSHelper::$ItemPageSize)
            ->select();
        return PuffCMSHelper::JsonResult($list, true, true, $totalPages, PuffCMSHelper::$ItemPageSize);
    }

    public function save(){

        $id = Request::instance()->param("ID");
        if(Request::instance()->isPost()){
            $data = Request::instance()->post("form/a");
            if(array_key_exists("ID", $data)){
                $id = $data["ID"];
            }

            $result = $this->validate($data, "Item", null, true);
            if(true !== $result){
                return PuffCMSHelper::JsonResult("", false, $result);
            }

            $db = new ItemModel();
            if(empty($id)){
                $data["ID"] = PuffCMSHelper::getGUID();
                $db->allowField(true)->save($data);
                return PuffCMSHelper::JsonResult("", true, "数据添加成功");
            }
            else{
                $db->allowField(true)->isUpdate(true)->save($data, ["ID"=>$id]);
                return PuffCMSHelper::JsonResult("", true, "数据保存成功");
            }


        }
    }

    protected function getWhere(){
        $name = Request::instance()->post("search_name");
        $id =  Request::instance()->post("id");

        if(empty($id))
            $map["id"] = ["<>", "NULL"];
        else
            $map["id"] = ["=", "$id"];

        if (!empty($name)) $map["subject"] = ["like", "%$name%"];

        return $map;
    }

}