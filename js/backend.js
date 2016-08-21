$(function() {
    $('html').height(window.innerHeight)
    function init(term) {
        term.echo("+----------------------------------------+\n")
        term.echo("|      Welcome to eeyes web group!       |\n")
        term.echo("|  input 'help' to get more information  |\n")
        term.echo("+----------------------------------------+\n")
    }
    function help(term) {
        term.echo('')
        term.echo('+---------------+')
        term.echo('| eeyes backend |')
        term.echo('+---------------+')
        term.echo('')
        term.echo('输入以下任意指令以获取信息')
        term.echo('info - 部门介绍')
        term.echo('jobs - 部门工作')
        term.echo('tech - 技术介绍')
        term.echo('code - 代码展示')
        term.echo('hope - 我想加入')
        term.echo('join - 报名通道')
        term.echo('exit - 退出')
        term.echo('')
    }
    function info(term) {
        term.echo('')
        term.echo('+--------------+')
        term.echo('| Introduction |')
        term.echo('+--------------+')
        term.echo('')
        term.echo('EWG(eeyes web group)')
        term.echo('西安交通大学e瞳网web后端技术团队')
        term.echo('隶属e瞳网技术部门')
        term.echo('------------------------------')
        term.echo('后端web组是技术含金量特别特别特别高的部门！！')
        term.echo('我们负责产品后端程序编写，服务器运行维护 (画外音：好帅！！)')
        term.echo('虽然我们不会直面用户(T_T)')
        term.echo('但我们在黑漆漆的终端前(努力微笑.jpg)')
        term.echo('用一行行命令')
        term.echo('一行行代码')
        term.echo('为网站业务提供技术保障')
        term.echo('为服务器安全保驾护航！XD')
        term.echo('------------------------------')
        term.echo('go to http://ganlv.coding.me/EWG to see more')
        term.echo('')
    }
    function jobs(term) {
        term.echo('')
        term.echo('+--------------+')
        term.echo('|   Our Jobs   |')
        term.echo('+--------------+')
        term.echo('')
        term.echo('------------------------------')
        term.echo('专注于')
        term.echo('* web后端程序开发')
        term.echo('* 服务器运行维护')
        term.echo('* 网站基础架构研发')
        term.echo('致力于')
        term.echo('为网站及移动端应用提供')
        term.echo('高性能、高并发、高可用的服务器端技术支持')
        term.echo('------------------------------')
        term.echo('')
    }
    function tech(term) {
        term.echo('')
        term.echo('+------------------------------+')
        term.echo('| Fundamental Technology Stack |')
        term.echo('+------------------------------+')
        term.echo('')
        term.echo('------------------------------')
        term.echo('技术架构 - LNMP')
        term.echo('L: Linux (操作系统)')
        term.echo('N: Nginx (服务器程序)')
        term.echo('M: MySQL (数据库管理系统)')
        term.echo('P: PHP   (后端程序语言)')
        term.echo('开发框架: ThinkPHP / Laravel')
        term.echo('------------------------------')
        term.echo('')
    }
    function code(term) {
        // 弹框展示天使的代码
        term.echo('go to http://webgroup.eeyes.xyz to see more')
    }
    function hope(term) {
        term.echo('')
        term.echo('+----------------+')
        term.echo('| How To Join Us |')
        term.echo('+----------------+')
        term.echo('')
        term.echo('------------------------------')
        term.echo('* 我们非常欢迎技术大神加入 *')
        term.echo('当然，没有经验也没有关系')
        term.echo('但是我们希望你能够有如下特质')
        term.echo('1. 热爱技术')
        term.echo('2. 愿意投入时间')
        term.echo('3. 合作精神')
        term.echo('4. 有想法敢创新')
        term.echo('------------------------------')
        term.echo('')
    }
    function join(term) {
        term.echo('go to http://join.eeyes.net to fill the form.')
    } 
    function exit(term) {
        history.back();
        term.echo('Bye.')
    }
    function other(command, term) {
        if (command != '') {
            term.echo("No command named '" + command + "', input 'help' to get help.")
        }
    }
    $('.term').terminal(function(command, term) {
        command = command.toLowerCase()
        switch(command) {
            case 'help':
                help(term)
                break
            case 'info':
                info(term)
                break
            case 'jobs':
                jobs(term)
                break
            case 'tech':
                tech(term)
                break
            case 'code':
                code(term)
                break
            case 'hope':
                hope(term)
                break
            case 'join':
                join(term)
                break
            case 'exit':
                exit(term)
                break
            default:
                other(command, term)           
        }
    }, {
        width: $('body').width(),
        height: $('body').height(),
        prompt: 'EWG> ',
        greetings: "                                        _   \n  ___  ___ _   _  ___  ___   _ __   ___| |_ \n / _ \\/ _ \\ | | |/ _ \\/ __| | '_ \\ / _ \\ __|\n|  __/  __/ |_| |  __/\\__ \\_| | | |  __/ |_ \n \\___|\\___|\\__, |\\___||___(_)_| |_|\\___|\\__|\n           |___/                            \n\nCopyright (c) 2002-2016 EWG <http://www.eeyes.net>\n",
        onInit: init,
        exit: false
    })
})