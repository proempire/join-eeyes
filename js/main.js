$(document).ready(function(){
    // build the swiper 
    var swiper = new Swiper('.swiper-container',{
        direction: 'vertical',
        initialSlide: 0,
        calculateHeight: true,
        autoHeight: true,
        onSlideChangeEnd: function(swiper){
            if (swiper.activeIndex == 0){
                sec.pause();
            }
            if (swiper.activeIndex == 1){
                sec.restart();
            }
            if (swiper.activeIndex == 2){
                starline.restart();
                sec.pause();
                four.pause();
            }
            if (swiper.activeIndex == 3){
                four.restart();
            }
            if (swiper.activeIndex == 4){
                surround.restart();
                surround1.restart();
                surround2.restart();
                four.pause();
            }
        }
    });

    // 第二第四页动效
    var cartoon24 = function(str, arr){
        var TimeLine = Tweene.line();
        TimeLine.add(Tweene.get($(str+" .sec-con p")).set({opacity: 0}))
        var i = 0;
        while(arr[i] != undefined){
            if(i > 0){
                TimeLine.add(Tweene.get($(str+" #sec-div"+arr[i-1])).to({opacity: 0}).duration(500).easing([0, 0, 1, 1]), "+=500");
            }
            var maxlen = $(str+" #sec-div"+arr[i]+" p").size();
            for(var j=1; j<=maxlen; j++){
                TimeLine.add(fadeIn($(str+" #sec-div"+arr[i]+" p:nth-child("+j+")"), 800), "+=200");
            }
            i++;
        }
        TimeLine.add(Tweene.get($(str+" .ind")).to({opacity: 1}).duration(1000))
        TimeLine.add(Tweene.get($(str+" .second")).to({translateX: -0.4*fontSize}).loops(-1).yoyo(true).duration(500).easing([0, 0, 1, 1]), "0");
        TimeLine.add(Tweene.get($(str+" .second")).to({translateY: -0.4*fontSize}).loops(-1).yoyo(true).duration(500).easing([0, 0, 1, 1]), "200");
        //TimeLine.add(Tweene.get($(str+" .ind")).to({opacity: 1}).duration(1000))
        return TimeLine;
    }
    $(".second").css({left: 0.3 + "rem", top: 0.3 + "rem"});
    $(".second .sec-img2").css({left: wwidth-1.2*wwidth + "rem", top: wheight-1.2*wwidth*1334/750 + "rem"});
    // 第二页
    var sec = Tweene.line();
    sec.add(cartoon24("#otwo", [1, 2, 3]));
    // 第四页
    var four = Tweene.line();
    four.add(cartoon24("#ofour", [4, 5, 6, 7]));


    
            // 第三页（未改动）
            $('#star-zodiac').width(cwidth*0.9).css({position: 'relative', bottom: function(index,value){
                return $('#star-bg').height()-$('#star-zodiac').height()*0.0686
            }, 'z-index': 7});
            $('.main-wrapper').width(cwidth).height(3500*cwidth/750 + 'px').css({'background-size': cwidth + 'px'});
            $('.star-container').width(cwidth).height(cheight);

            // 动画
            var starline = Tweene.line();
            starline.add(Tweene.get($('.main-wrapper')).to({marginTop: -$('.main-wrapper').height() + cheight + 'px'}).duration(40000));
        
            // 第五页（未改动）
            $('.mutiangle img').width(cwidth*0.5);
            $('.mutiangle').css({top: cheight*0.5 - $('.mutiangle').height()*0.5 + 'px'});
            //console.log($('#tech').width())
            
            $('.bigplanet').width(cwidth*0.2);
            $('#tech').css({left: cwidth*0.5 - $('.bigplanet').width()*0.5 + 'px', top: cheight*0.5 - 160 - $('#tech').height()*0.5 + 'px' })
            /*$('#total-overview').on('swipe',function(){
                $.mobile.changePage("#submit", {transition: "slidedown"}); 
            });*/

            var surround = Tweene.line();
            var record = 0,
                reverse = true,
                xstd = cwidth*0.5 - $('.bigplanet').width()*0.5,
                ystd = cheight*0.5 - $('#tech').height()*0.5,
                x = 0,
                y = -160,
                angle = 0,
                unit = Math.PI/180;
            //console.log(xstd,ystd)
            while (angle < Math.PI*2){
                angle += unit;
                x = 160*Math.sin(angle);
                y = -160*Math.cos(angle)+160;
                surround.add(Tweene.get($('#tech')).to({transform: "translate(" + x + 'px,' + y + 'px'}).duration(60).easing([0,0,1,1]));
            }
            $('#info').css({top: ystd + 80 + 'px', left: xstd + 138});
            var surround1 = Tweene.line();
            var record = 0,
                reverse = true,
                x = 138,
                y = 80,
                angle = Math.PI/180*120,
                unit = Math.PI/180;
            while (angle < Math.PI/180*480){
                angle += unit;
                x = 160*Math.sin(angle) - 160*Math.sin(Math.PI/180*120);
                y = -160*Math.cos(angle) + 160*Math.cos(Math.PI/180*120);
                surround1.add(Tweene.get($('#info')).to({transform: "translate(" + x + 'px,' + y + 'px'}).duration(60).easing([0,0,1,1]));
            }
            $('#man').css({top: ystd + 80 + 'px', left: xstd - 138});
            var surround2 = Tweene.line();
            var record = 0,
                reverse = false,
                x = -138,
                y = 80,
                angle = Math.PI/180*240,
                unit = Math.PI/180;
            while (angle < Math.PI/180*600){
                angle += unit;
                x = 160*Math.sin(angle) - 160*Math.sin(Math.PI/180*240);
                y = -160*Math.cos(angle) + 160*Math.cos(Math.PI/180*240);
                surround2.add(Tweene.get($('#man')).to({transform: "translate(" + x + 'px,' + y + 'px'}).duration(60).easing([0,0,1,1]));
            }

            // 二级部门
            //$('.Dabumen').width(cwidth*0.5).css({top: cheight*0.5 - $('#mutiangle').height()*0.5 + 'px'});
});

        