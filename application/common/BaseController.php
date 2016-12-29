<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/12/2016
 * Time: 9:51 AM
 */

namespace app\common;


use think\Controller;
use think\Hook;
use think\Request;

class BaseController extends Controller
{

    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        Hook::listen("UserAuth", $params);
        parent::__construct($request);


    }
}