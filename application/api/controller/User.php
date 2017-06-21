<?php
namespace app\api\controller;
use app\index\model\Client;
use think\Controller;
use think\Request;

/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 4/10/2017
 * Time: 1:49 PM
 */
class User extends Controller
{
    public function index(){
        return json(["data"=>"s", "result"=>true]);
    }

    public function get(){
        $page = Request::instance()->post("page");
        $list = Client::where("1=1")->limit($page, 10)->select();
        return json(["data"=>$list, "result"=>true]);
    }
}