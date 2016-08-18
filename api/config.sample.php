<?php
// CSV文件名设置，最好设置成别人猜不到的名字
define('DATA_FILE', 'data.csv');
// 防刷的记录文件
define('IP_FILE', 'ip.php');
// 书院名
define('COLLEGE', array('彭康','仲英','南洋','文治','崇实','宗濂','励志','启德'));
// 部门名
define('GROUP', array('(未选)','新闻部','新媒体部','影视部','市场部','公关部','产品部','app组','web组','前端美工组'));
// 表头
define('TABLE_HEADER', array('提交时间','IP','姓名','性别','出生日期','籍贯','书院','专业班级','手机','QQ号','邮箱','第一志愿','第二志愿','个人陈述'));
// 邮件服务器设置，全部注释掉代表不发送邮件
// define('MAIL_SERVER', array(
//	 'Host'     => 'smtp.qq.com',
//	 'Port'     => 465,
//	 'Username' => '10000@qq.com',
//	 'Password' => 'password',
// ));