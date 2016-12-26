<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/19/2016
 * Time: 5:26 PM
 */

namespace app\index\validate;


use think\Validate;

class Item extends Validate
{
    protected $rule = [
        ['Subject', 'require|max:50', '请输入项目名称|项目名称不能大于50个汉字'],
        ['Unit', 'require|max:20', '请输入计量单位|计量单位不能大于20个汉字'],
        ['Price', 'require|float', '请输入单价|请输入正确的单价'],
    ];
}