<?php
// CSV文件名设置，最好设置成别人猜不到的名字
define('DATA_FILE', 'data.csv');
// 防刷的记录文件
define('IP_FILE', 'ip.php');
// 书院名
define('COLLEGE', array('彭康','仲英','南洋','文治','崇实','宗濂','励志','启德'));
// 部门名
define('GROUP', array('空','市场部','公关部','信息部门','产品部','前端美工部','后台WEB部','APP部','EUX'));
// 只允许POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') exit;

// 获取ip，ip不合法返回false
// $advance：false REMOTE_ADDR
// $advance：true HTTP_X_FORWARDED_FOR首个ip -> HTTP_CLIENT_IP -> REMOTE_ADDR
function get_client_ip($advance = false) {
    if ($advance) {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos = array_search('unknown', $arr);
            if (false !== $pos) unset($arr[$pos]);
            $ip = trim($arr[0]);
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return ip2long($ip) ? $ip : false;
}
// 防刷初始化
$last_ip = '0.0.0.0';
$post_times = 0;
// 获取ip
if (!$ip = get_client_ip()) exit;
// 读取防刷记录文件
if (file_exists(IP_FILE)) {
	require IP_FILE;
}
// 提交次数+1
++$post_times;
// 同一ip连续10次提交则退出
if ($last_ip === $ip && $post_times > 10) exit;
// 写入防刷记录文件
file_put_contents(IP_FILE, '<?php $last_ip=\'' . $ip . '\';$post_times=' . $post_times . ';');
// 输入过滤函数
function I($name, $type, $filter) {
	if (!isset($_POST[$name])) exit;
	$data = $_POST[$name];
	if (is_array($data)) exit;
	if (is_callable($filter))
		return $filter($data);
	elseif (is_string($filter) && 1 !== preg_match($filter, (string)$data))
		exit;
	switch ($type) {
		case 'd': return (int)$data;
		case 's': return (string)$data;
	}
}
// 验证输入数据
// 姓名：1-10个字符
// 性别：0女、1男
// 籍贯：0-40个字符
// 出生日期：yyyy-mm-dd
// 专业班级：1-20个字符
// 书院；0彭康、1仲英、2南洋、3文治、4崇实、5宗濂、6励志、7启德
// 手机：号段130、131、132、133、134、135、136、137、138、139、145、147、149、150、151、152、153、155、156、157、158、159、170、175、176、177、178、180、181、182、183、184、185、186、187、188、189
// QQ号：5-11位数字，首位不为0
// 邮箱：username@example.com
// 第一志愿：1市场部、2公关部、3信息部门、4产品部、5前端美工部、6后台WEB部、7APP部、8EUX(不面向新生)
// 第二志愿：0空、1市场部、2公关部、3信息部门、4产品部、5前端美工部、6后台WEB部、7APP部、8EUX(不面向新生)
// 个人简介：0-255个字符
// 加入理由：0-255个字符
$name = I('name', 's', '/^.{1,10}$/');
$gender = I('gender', 'd', '/^[01]$/');
$home = I('home', 's', '/^.{0,40}$/');
$date = I('date', 's', function ($date) {return (is_string($date) && 1 === preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', $date, $matches) && checkdate($matches[2], $matches[3], $matches[1])) ? $date : null;});
$class = I('class', 's', '/^.{1,20}$/');
$college = I('college', 'd', '/^[0-7]$/');
$tel = I('tel', 's', '/^(1((3\d)|(4[579])|(5[012356789])|(7[05678])|(8\d))\d{8})$/');
$qq = I('qq', 's', '/^[1-9]\d{4,10}$/');
$mail = I('mail', 's', '/^(|([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+))$/');
$first = I('first', 'd', '/^[1-8]$/');
$second = I('second', 'd', '/^[0-8]$/');
if ($first === $second) exit;
$info = I('info', 's', '/^.{0,255}$/');
$reason = I('reason', 's', '/^.{0,255}$/');
// value->名称转换
$college = COLLEGE[$college];
$first = GROUP[$first];
$second = GROUP[$second];
// 时间：yyyy-mm-dd hh:mm:ss
$time = date('Y-m-d H:i:s');
// 将csv文件写入缓存
ob_start();
$f = fopen('php://output', 'w');
// 如果不存在，新建，并写入表头
if (!file_exists(DATA_FILE) && false === fputcsv($f, array('提交时间','IP','姓名','性别','籍贯','出生日期','专业班级','书院','手机','QQ号','邮箱','第一志愿','第二志愿','个人简介','加入理由'))) {
	fclose($f);
	exit;
}
// 追加数据
if (false === fputcsv($f, array($time, $ip, $name, $gender, $home, $date, $class, $college, $tel, $qq, $mail, $first, $second, $info, $reason))) {
	fclose($f);
	exit;
}
// Excel仅识别GBK编码的csv
file_put_contents(DATA_FILE, iconv('utf-8', 'GBK//IGNORE', ob_get_clean()), FILE_APPEND);
fclose($f);
// 返回1为成功，返回空为失败
exit('1');