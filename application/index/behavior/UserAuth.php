<?php
namespace app\index\behavior;

use app\common\PuffCMSHelper;

use think\Request;
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
        $token = Request::instance()->param("token");
        if(empty($token) || ! PuffCMSHelper::IsLoggedIn($token)){
            return $this->redirect("user/fail");
        }
    }
}