<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 5/15/2017
 * Time: 3:15 PM
 * 这是为了测试用的， 随时可以删除
 */

namespace app\api\controller;

use app\api\model\Message as MessageModel;
use think\Controller;
use think\Db;
use think\Request;


class Message extends Controller
{
    public function get(){
        $list = MessageModel::where("1=1")->select();
        return json($list);
    }

    public function add(){
        if(Request::instance()->isPost()){
            $title = Request::instance()->param("title");

            $id = Db::table("puffmessage")->insertGetId([
                "title"=>$title
            ]);
            
            $row = MessageModel::get(["id"=>$id]);
            return json($row);
        }
    }

    public function toggle(){
        $result = -1;
        if(Request::instance()->isPost()){
            $id = Request::instance()->param("id");
            $result = $id;
            $row = MessageModel::get(["id"=>$id]);

            if($row != null){
                $status = $row["status"] == "0" ? 1 : 0;
                $db = new MessageModel();
                $db->save(["status"=>$status], ["id"=>$id]);
                return json($status);
            }
        }
        return json($result);
    }
}