<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/12/2016
 * Time: 9:51 AM
 */

namespace app\common;


use think\Controller;
use think\Request;

class BaseController extends Controller
{

    public function __construct(Request $request)
    {
       // Hook::listen("CheckAuth", $params);
        parent::__construct($request);

        header('Access-Control-Allow-Origin: *');
    }
}