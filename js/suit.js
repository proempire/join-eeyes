// 页面自适应
var fontSize;
if($(window).width() < 350){  //iphone5
    fontSize = 12;
    $('html').css({fontSize: '12px'});
}else{
    if($(window).width() < 400){  //iphone6
        fontSize = 14;
        $('html').css({fontSize: '14px'});
    }else{  
        if($(window).width() < 600){  //iphone6plus
            fontSize = 16;
            $('html').css({fontSize: '16px'});
        }else{  //ipad
            fontSize = 26;
            $('html').css({fontSize: '24px'});
        }
    }
}