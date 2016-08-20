# e瞳网2016招新网站
<http://join.eeyes.net>

# 安装
1. 需要`php >= 5.3`
2. `git clone`到服务器（或者使用`git pull`更新）
3. 更改`api/`目录权限，使之可写
4. 将`api/config.sample.php`改名为`config.php`
5. 设置其中的`DATA_FILE`常量，使之难以猜测
6. 设置其中的`MAIL_SERVER`常量，填写邮箱SMTP服务器地址、端口号、账号、密码
7. 安装完成

```bash
git clone -b release https://git.coding.net/ganlv/join.git
cd join/
# git pull origin release
chmod 777 api/
cd api/
cp config.sample.php config.php
# vi config.php
# 把data.csv改成一个奇葩的名字，比如
# define('DATA_FILE', 'aaaabbbbccccdddd.csv');
# 把邮箱取消注释，然后用户名密码填上
# define('MAIL_SERVER', array(
#     'Host'     => 'smtp.qq.com',
#     'Port'     => 465,
#     'Username' => '1234567890@qq.com',
#     'Password' => 'aaaabbbbccccdddd',
# ));
```

# Author
[西安交通大学e瞳网](http://www.eeyes.net/)

# LICENSE
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
