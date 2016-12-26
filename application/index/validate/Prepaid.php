<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/26/2016
 * Time: 3:11 PM
 */

namespace app\index\validate;


use think\Validate;

class Prepaid extends Validate
{
    protected $rule = [
        ['ClientId', 'require|max:50', '请选择客户信息|客户信息选择错误'],
        ['Amount', 'require|float', '充值抵用金额|请输入正确的抵用金额'],
        ['ActAmount', 'require|float', '实际充值金额|请输入正确的实际金额'],
    ];
}