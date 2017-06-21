<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/12/2016
 * Time: 9:51 AM
 */

namespace app\index\controller;


use app\common\BaseController;
use app\common\PuffCMSHelper;
use app\index\model\Client as ClientModel;
use app\index\model\MemberLevel;
use think\Controller;
use think\Db;
use think\Request;
use think\response\Json;
use think\Session;

class Client extends BaseController
{
    public function get()
    {
        $page = Request::instance()->post("page");
        $pageSize = Request::instance()->post("pageSize");

        if(empty($pageSize))
            $pageSize = PuffCMSHelper::$ClientPageSize;

        if (empty($page))
            $page = 1;

        $count = ClientModel::where($this->getWhere())->count();

        $totalPages = ceil($count / $pageSize);

        $list = ClientModel::where($this->getWhere())
            ->limit($page-1, $pageSize)
            ->order(["LastShoppedDate" => "desc", "Total" => "desc"])
            ->select();

        return PuffCMSHelper::JsonResult($list, true, true, $totalPages, $pageSize);
    }

    public function save()
    {

        $id = Request::instance()->param("id");
        if(Request::instance()->isPost()){
            $data =  Request::instance()->post("form/a");
            if(array_key_exists("Id", $data)){
                $id = $data["Id"];
            }


            $data["LevelSubject"] = MemberLevel::get(["Id"=>$data["LevelId"]])->Subject;
            $result = $this->validate($data, "Client", null, true);
            if(true !== $result){
                return PuffCMSHelper::JsonResult("", false, $result);
            }

            $db = new ClientModel();

            if(empty($id)){
                $data["Id"] = PuffCMSHelper::getGUID();
                $db->allowField(true)->save($data);
            }
            else{
                $db->allowField(true)->isUpdate(true)->save($data, ["id"=>$id]);
            }

            return PuffCMSHelper::JsonResult("", true, "操作成功");
        }
        return PuffCMSHelper::JsonResult("", false, "错误的请求");
    }

    public function getLevels(){
        $list = MemberLevel::where("1=1")->select();
        return PuffCMSHelper::JsonResultNoPagination($list, true, true, "");
    }

    protected function getWhere()
    {
        $name = Request::instance()->param("search_name");
        $phone = Request::instance()->param("search_phone");
        $address = Request::instance()->param("search_address");
        $id =  Request::instance()->post("id");


        if(empty($id))
            $map["id"] = ["<>", "NULL"];
        else
            $map["id"]=["=", $id];
        if (!empty($name)) $map["name"] = ["like", "%$name%"];
        if (!empty($phone)) $map["phone"] = ["like", "%$phone%"];
        if (!empty($address)) $map["deliveryaddress"] = ["like", "%$address%"];
        return $map;
    }


}