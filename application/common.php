<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

\think\Hook::add('UserAuth','app\\index\\behavior\\UserAuth');
//\think\Hook::add('app_init','app\\index\\behavior\\UserAuth');
//\think\Hook::add('app_begin','app\\index\\behavior\\UserAuth');
//\think\Hook::add('module_init','app\\index\\behavior\\UserAuth');
//\think\Hook::add('action_begin','app\\index\\behavior\\UserAuth');
//\think\Hook::add('view_filter','app\\index\\behavior\\UserAuth');
//\think\Hook::add('app_end','app\\index\\behavior\\UserAuth');
//\think\Hook::add('log_write','app\\index\\behavior\\UserAuth');
//\think\Hook::add('response_end','app\\index\\behavior\\UserAuth');