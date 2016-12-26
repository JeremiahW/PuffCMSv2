<?php
namespace app\index\controller;

use app\index\model\Client;

class Index
{
    public function index()
    {
        return phpinfo();
    }
}
