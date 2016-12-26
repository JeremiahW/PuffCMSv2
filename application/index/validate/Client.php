<?php
/**
 * Created by PhpStorm.
 * User: wangji
 * Date: 12/12/2016
 * Time: 11:15 AM
 */

namespace app\index\validate;


use think\Validate;

class Client extends Validate
{
    protected $rule = [
        ['Name', 'require|max:50', '请输入用户名|用户名不得超过50个字符'],
        ['Phone', 'require|max:20', '请输入联系电话|请输入正确的联系电话'],
        ['LevelId', 'require|number', '请选择会员等级|请选择正确的会员等级'],
    ];
}