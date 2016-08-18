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
                TimeLine.add(Tweene.get($(str+" #sec-div"+arr[i-1])).to({opacity: 0}).duration(500).easing([0, 0, 1, 1]));
            }
            var maxlen = $(str+" #sec-div"+arr[i]+" p").size();
            for(var j=1; j<=maxlen; j++){
                TimeLine.add(fadeIn($(str+" #sec-div"+arr[i]+" p:nth-child("+j+")"), 800));
            }
            i++;
        }
        TimeLine.add(Tweene.get($(str+" .second")).to({left: "-=1rem"}).loops(-1).yoyo(true).duration(500).easing([0, 0, 1, 1]), "0");
        TimeLine.add(Tweene.get($(str+" .second")).to({top: "-=1rem"}).loops(-1).yoyo(true).duration(500).easing([0, 0, 1, 1]), "200");
        return TimeLine;
    }
    $(".second").css({left: 0.6 + "rem", top: 0.6 + "rem"});
    $(".second .sec-img2").css({left: wwidth-1.1*wwidth + "rem", top: wheight-1.1*wwidth*1334/750 + "rem"});
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
            $('#mutiangle img').width(cwidth*0.5);
            $('#mutiangle').css({top: cheight*0.5 - $('#mutiangle').height()*0.5 + 'px'});
            //console.log($('#tech').width())
            
            $('.bigplanet').width(cwidth*0.2);
            $('#tech').css({left: cwidth*0.5 - $('.bigplanet').width()*0.5 + 'px', top: cheight*0.5 - 160 - $('#tech').height()*0.5 + 'px' })
            $('#total-overview').on('swipe',function(){
                $.mobile.changePage("#submit", {transition: "slidedown"}); 
            });

            var surround = Tweene.line();
            var record = 0,
                reverse = true,
                xstd = cwidth*0.5 - $('.bigplanet').width()*0.5,
                ystd = cheight*0.5 - $('#tech').height()*0.5,
                x = 0,
                y = -160;
            //console.log(xstd,ystd)
            while (record < 2){
                if (reverse){
                    y += 1;
                    x = Math.sqrt(25600-y*y);
                }else{
                    y -= 1;
                    x = -Math.sqrt(25600-y*y);
                }
                surround.add(Tweene.get($('#tech')).to({left: xstd + x + 'px', top: ystd + y + 'px'}).duration(20).easing([0,0,1,1]));
                //console.log(x,y)
                if ( x == 0 ){
                    reverse = !reverse;
                    record++;
                }
            }
            $('#info').css({top: ystd + 80 + 'px', left: xstd + 138});
            var surround1 = Tweene.line();
            var record = 0,
                reverse = true,
                x = 138,
                y = 80;
            while (record < 2 || y != 80){
                if (reverse){
                    y += 1;
                    x = Math.sqrt(25600-y*y);
                }else{
                    y -= 1;
                    x = -Math.sqrt(25600-y*y);
                }
                surround1.add(Tweene.get($('#info')).to({left: xstd + x + 'px', top: ystd + y + 'px'}).duration(20).easing([0,0,1,1]));
                //console.log(x,y)
                if ( x == 0 ){
                    reverse = !reverse;
                    record++;
                }
            }
            $('#man').css({top: ystd + 80 + 'px', left: xstd - 138});
            var surround2 = Tweene.line();
            var record = 0,
                reverse = false,
                x = -138,
                y = 80;
            while (record < 2 || y != 80){
                if (reverse){
                    y += 1;
                    x = Math.sqrt(25600-y*y);
                }else{
                    y -= 1;
                    x = -Math.sqrt(25600-y*y);
                }
                surround2.add(Tweene.get($('#man')).to({left: xstd + x + 'px', top: ystd + y + 'px'}).duration(20).easing([0,0,1,1]));
                //console.log(x,y)
                if ( x == 0 ){
                    reverse = !reverse;
                    record++;
                }
            }
});

        