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
    public function login(){
        if(Request::instance()->isPost()){
            $user = input("post.username");
            $pwd = input("post.password");

            $map["Username"] = $user;
            $map["Password"] = $pwd;

            $isLoggedIn = false;

            $num = UserModel::where($map)->count();
            if($num == 1){
                Session::set("isLogged", "true");
                Session::set("name", $user);

                $isLoggedIn = true;
                return PuffCMSHelper::JsonResultNoPagination($isLoggedIn, $isLoggedIn, "验证通过");

            }
            return PuffCMSHelper::JsonResultNoPagination($isLoggedIn, $isLoggedIn, "验证失败");

        }
    }

    public function logoff(){
        Session::set("isLogged", null);
        Session::set("name", null);
        return PuffCMSHelper::JsonResultNoPagination(true, true, "注销登录");
    }

    public function state(){
        if(Session::has("isLogged")){
            $user = Session::get("name");
            return PuffCMSHelper::JsonResultNoPagination($user, true, "验证通过");
        }
        return PuffCMSHelper::JsonResultNoPagination(Session::get("isLogged"), false, "验证失败");
    }

    public function fail(){
        return PuffCMSHelper::JsonResultNoPagination("没有访问权限", false, "没有访问权限");
    }

    public function pass(){
        Session::set("isLogged", true);
        Session::set("name", "test");
        return PuffCMSHelper::JsonResultNoPagination("test", true, "验证通过");
    }
}