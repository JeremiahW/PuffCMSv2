<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/12/2016
 * Time: 9:55 AM
 */

namespace app\common;


use app\index\model\Persist;
use think\Db;
use think\Exception;
use think\response\Json;

class PuffCMSHelper
{
    public static $ClientPageSize = 20;
    public static $ItemPageSize = 20;
    public static $OrderPageSize =20;

    public static function JsonResult($data, $result = true, $message="", $totalPage=1, $pageSize=25){
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Methods: GET, POST, PUT');
        return json(["data"=>$data, "result"=>$result, "message"=>$message,"totalPages"=>$totalPage, "pageSize"=>$pageSize]);
    }

    public static function JsonResultNoPagination($data, $result = true, $message=""){
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header('Access-Control-Allow-Methods: GET, POST, PUT');
        return json(["data"=>$data, "result"=>$result, "message"=>$message]);
    }

    public static function getGUID(){
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }
        else {
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
           // $uuid = chr(123)// "{"
            $uuid = ""
                .substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12);
                //.chr(125);// "}"
            return strtolower($uuid);
        }
    }

    public static function isDateTime($param='', $format='Y-m-d H:i:s'){
        return date($format, strtotime($param)) === $param;
    }

    /*
     * Save user to database and return the token.
     * The expired date will be 1 day. unless user logoff.
     * */
    public static function Persist($user, $expired = 1){
        $token = PuffCMSHelper::getGUID();

        Db::transaction(function() use($user, $expired, $token) {
            $dt = new \DateTime();
            $createDate = $dt->format('Y-m-d H:i:s');
            $expiredDate = $dt->add(new \DateInterval('P'.$expired.'D'))->format('Y-m-d H:i:s');

            Db::table("PuffPersist")->where(["Username"=>$user])->update(["IsDeleted"=> 1]);

            Db::table("PuffPersist")->insert(
                [
                    "Token" => $token,
                    "Username" =>$user,
                    "CreatedDate" =>$createDate,
                    "ExpiredDate" =>$expiredDate
                ]
            );
         });
        return $token;

    }

    /*
     * 根据用户传过来的Token, 过期时间, 来判断是否已经登录了.
     * */
    public static function IsLoggedIn($token){
        $dt = new \DateTime();
        $now = $dt->format('Y-m-d H:i:s');
        $map["Token"] = $token;
        $map["IsDeleted"] = 0;
        $map["ExpiredDate"] = [">=", $now];
        $num = Db::table("PuffPersist")->where($map)->count();
        if($num > 0){
            return true;
        }
        else{
            return false;
        }
    }

    public static function Logoff($token){
        Persist::where(["Token"=>$token])->update(["IsDeleted"=> 1]);
    }
}