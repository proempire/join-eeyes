<?php
// 只允许POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit;
}
// 读取配置文件
require 'config.php';
// 获取ip，ip不合法返回false
// $advance == false 返回 REMOTE_ADDR
// $advance == true 返回 HTTP_X_FORWARDED_FOR首个ip -> HTTP_CLIENT_IP -> REMOTE_ADDR
function get_client_ip($advance = false)
{
    if ($advance) {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos = array_search('unknown', $arr);
            if (false !== $pos) {
                unset($arr[$pos]);
            }
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

// 获取ip
if (!$client_ip = get_client_ip()) {
    exit('-1');
}
// 读取防刷记录文件
if (file_exists(IP_FILE)) {
    $ip = require IP_FILE;
} else {
    $ip = array();
}
// 判断是否已存在
if (isset($ip[$client_ip])) {
    // 同一ip提交达到10次则退出
    if ($ip[$client_ip] >= 10) {
        exit('-2');
    }
    ++$ip[$client_ip];
} else {
    $ip[$client_ip] = 1;
}
// 写入防刷记录文件
file_put_contents(IP_FILE, '<?php return ' . var_export($ip, true) . ';');
// 输入过滤函数
function I($name, $type, $filter)
{
    if (!isset($_POST[$name])) {
        exit('-3');
    }
    $data = $_POST[$name];
    if (!is_string($data)) {
        exit('-3');
    }
    if (is_callable($filter)) {
        return $filter($data);
    } elseif (is_string($filter) && 1 !== preg_match($filter, (string)$data)) {
        exit('-3');
    }
    switch ($type) {
        case 'd':
            return (int)$data;
        case 's':
            return (string)$data;
    }
}

// 验证输入数据
// 姓名：1-10个字符
// 性别：0女、1男
// 出生日期：YYYY-mm-dd，出生年份必须在1986年-2006年之间，且日期必须真实存在
// 籍贯：0-40个字符
// 书院；0彭康、1仲英、2南洋、3文治、4崇实、5宗濂、6励志、7启德
// 专业班级：1-20个字符
// 手机：号段130、131、132、133、134、135、136、137、138、139、145、147、149、150、151、152、153、155、156、157、158、159、170、175、176、177、178、180、181、182、183、184、185、186、187、188、189
// QQ号：5-11位数字，首位不为0
// 邮箱：filter_var->checkdnsrr
// 第一志愿：         1新闻部、2新媒体部、3影视部、4市场部、5公关部、6产品部、7app组、8web组、9前端美工组
// 第二志愿：0(未选)、1新闻部、2新媒体部、3影视部、4市场部、5公关部、6产品部、7app组、8web组、9前端美工组，第二志愿必须与第一志愿不同
// 个人陈述：0-255个字符
$name = I('name', 's', '/^.{1,10}$/');
$gender = I('gender', 'd', '/^[01]$/');
$date = I('date', 's', function ($date) {
    if (!is_string($date)) {
        exit('-3');
    }
    if (1 !== preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', $date, $matches)) {
        exit('-3');
    }
    $year = (int)$matches[1];
    if ($year < 1986 || $year > 2006) {
        exit('-3');
    }
    if (!checkdate((int)$matches[2], (int)$matches[3], $year)) {
        exit('-3');
    }
    return $date;
});
$home = I('home', 's', '/^.{0,40}$/');
$college = I('college', 'd', '/^[0-7]$/');
$class = I('class', 's', '/^.{1,20}$/');
$tel = I('tel', 's', '/^(1((3\d)|(4[579])|(5[012356789])|(7[05678])|(8\d))\d{8})$/');
$qq = I('qq', 's', '/^[1-9]\d{4,10}$/');
$mail = I('mail', 's', function ($mail) {
    if (!is_string($mail)) {
        exit('-3');
    }
    if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        exit('-3');
    }
    $host = explode('@', $mail);
    $host = $host[count($host) - 1];
    if (!checkdnsrr($host, 'MX')) {
        exit('-3');
    }
    return $mail;
});
$first = I('first', 'd', '/^[1-9]$/');
$second = I('second', 'd', '/^[0-9]$/');
if ($first === $second) {
    exit('-3');
}
$info = I('info', 's', '/^.{0,255}$/');
// value->名称转换
$college = COLLEGE[$college];
$first = GROUP[$first];
$second = GROUP[$second];
// 时间：YYYY-mm-dd HH:ii:ss
$time = date('Y-m-d H:i:s');

// 将csv文件写入缓存
ob_start();
$f = fopen('php://output', 'w');
// 如果不存在，新建，并写入表头
if (!file_exists(DATA_FILE) && false === fputcsv($f, TABLE_HEADER)
) {
    fclose($f);
    ob_end_clean();
    exit('-4');
}
// 追加数据
if (false === fputcsv($f, array($time, $client_ip, $name, $gender, $date, $home, $college, $class, $tel, $qq, $mail, $first, $second, $info))) {
    fclose($f);
    ob_end_clean();
    exit('-4');
}
// Excel仅识别GBK编码的csv
file_put_contents(DATA_FILE, iconv('utf-8', 'GBK//IGNORE', ob_get_clean()), FILE_APPEND);
fclose($f);
// 未设置MAIL_SERVER即为不发送邮件
if (defined('MAIL_SERVER')) {
    $maskedname = mb_substr(trim($name), 0, 1) . '同学';
    // 加载PHPMailer库
    require 'PHPMailer/class.phpmailer.php';
    require 'PHPMailer/class.smtp.php';
    $phpmailer = new PHPMailer;
    $phpmailer->CharSet = "utf-8";
    // 邮件服务器设置
    $phpmailer->Host = MAIL_SERVER['Host'];
    $phpmailer->Port = MAIL_SERVER['Port'];
    $phpmailer->isSMTP();
    $phpmailer->SMTPSecure = 'ssl';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Username = MAIL_SERVER['Username'];
    $phpmailer->Password = MAIL_SERVER['Password'];
    // 邮件设置
    $phpmailer->setFrom($phpmailer->Username, '西安交通大学e瞳网');
    $phpmailer->addAddress($mail, $maskedname);
    $phpmailer->isHTML(true);
    // 邮件内容
    $phpmailer->Subject = 'e瞳网招新报名反馈';
    $phpmailer->Body = '<h1>' . htmlspecialchars($maskedname) . '：</h1><p>你好，</p><p>小瞳已经收到您的报名申请，</p><p>经过审核后将以邮件和短信形式通知答辩地点</p>';
    $phpmailer->AltBody = $maskedname . '：你好，小瞳已经收到您的报名申请，经过审核后将以邮件和短信形式通知答辩地点';
    // 发送邮件
    if (!$phpmailer->send()) {
        // 提交数据成功，发邮件失败
        exit('-5');
    }
}

// 提交成功
exit('1');
