<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/27/2016
 * Time: 1:55 PM
 */

namespace app\index\controller;


use app\common\BaseController;
use app\common\PuffCMSHelper;
use app\index\model\Users as UserModel;
use think\Controller;
use think\Request;
use think\Session;

class User extends Controller
{
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
    }

    public function login(){
        if(Request::instance()->isPost()){
            $user = input("post.username");
            $pwd = input("post.password");

            $map["Username"] = $user;
            $map["Password"] = $pwd;

            $num = UserModel::where($map)->count();
            if($num == 1){
               $token = PuffCMSHelper::Persist($user);
               return PuffCMSHelper::JsonResultNoPagination($token, true, "验证通过");
            }

            return PuffCMSHelper::JsonResultNoPagination("", false, "验证失败");
        }
    }

    public function logoff(){
        $token = Request::instance()->param("token");
        PuffCMSHelper::Logoff($token);
        return PuffCMSHelper::JsonResultNoPagination(true, true, "注销登录");
    }

    public function state(){
        $token = Request::instance()->param("token");
        $isLoggedIn = PuffCMSHelper::IsLoggedIn($token);
        if(!$isLoggedIn){
            return PuffCMSHelper::JsonResultNoPagination($isLoggedIn, false, "验证失败");
        }
        return PuffCMSHelper::JsonResultNoPagination($isLoggedIn, true, "验证失败");
    }

    public function fail(){
        return PuffCMSHelper::JsonResultNoPagination("没有访问权限", false, "没有访问权限");
    }

}