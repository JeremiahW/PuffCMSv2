<?php
namespace app\index\behavior;

use think\Controller;
use think\Session;
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/27/2016
 * Time: 3:03 PM
 */
class UserAuth
{
    use \traits\controller\Jump;
    public function run(&$params){
        $val = Session::get("isLogged");
        if(!Session::has("isLogged")){
            return $this->redirect("user/fail");
        }
        else{
            $aa = "test";
        }
    }
}