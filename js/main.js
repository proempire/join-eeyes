$(document).ready(function(){
    // build the swiper 
    var swiper = new Swiper('.swiper-container',{
        direction: 'vertical',
        initialSlide: 0,
        calculateHeight: true,
        autoHeight: true,
        onSlideChangeEnd: function(swiper){
            if (swiper.activeIndex == 2){
                starline.restart();
            }
            if (swiper.activeIndex == 1){
                sec.restart();
            }
            if (swiper.activeIndex == 3){
                four.restart();
            }
            if (swiper.activeIndex == 4){
                surround.restart();
                surround1.restart();
                surround2.restart();
            }
        }
    });

    
            // $('#star-bg').width(cwidth).css({position: 'relative', top: 0});
            $('#star-zodiac').width(cwidth*0.9).css({position: 'relative', bottom: function(index,value){
                return $('#star-bg').height()-$('#star-zodiac').height()*0.0686
            }, 'z-index': 7});
            $('.main-wrapper').width(cwidth).height(3500*cwidth/750 + 'px').css({'background-size': cwidth + 'px'});
            $('.star-container').width(cwidth).height(cheight);
            // $('.main-wrapper-c').width(cwidth).height(cheight);
            // $('.main-wrapper-first').width(cwidth).height(cheight);

            // 动画
            var starline = Tweene.line();
            starline.add(Tweene.get($('.main-wrapper')).to({marginTop: -$('.main-wrapper').height() + cheight + 'px'}).duration(40000));
            //starline.add(Tweene.get($('.main-wrapper')).to({marginTop: -3020 + 'px'}).duration(30000));
            //-($('#star-zodiac').height() - cheight)
        
            

            // 文字动画部分
            // console.log(cheight*(0.28+0.3673*0.5))
            // $('.sec-img2').width(cwidth).height(cheight);
            // $('.sec-img1').width(cwidth*0.7341).height(cheight*0.44).css({marginTop: cheight*0.248 + 'px', marginLeft: cwidth*0.1333 + 'px'});
            // $('.sec-con').css({marginTop: cheight*(0.28+0.3673*0.5) - $('.sec-con').height()*0.5 + 'px'});
            $('#sec-div1').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div1').width()*0.5 + 'px'});
            $('#sec-div2').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div2').width()*0.5 + 'px'});
            $('#sec-div3').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div3').width()*0.5 + 'px'});
            $('#sec-div4').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div4').width()*0.5 + 'px'});
            $('#sec-div5').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div5').width()*0.5 + 'px'});
            $('#sec-div6').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div6').width()*0.5 + 'px'});
            $('#sec-div7').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div7').width()*0.5 + 'px'});
            // $('#sec-div').css({marginLeft: cwidth*0.1333 + $('.sec-img1').width()*0.5 - $('#sec-div').width()*0.5 + 'px'});

            // 第二页
            var sec = Tweene.line();
            var $secDiv1 = Tweene.get('#sec-div1');
            var $secDiv2 = Tweene.get('#sec-div2');
            //$secDiv2.set({opacity: 0});
            var $secDiv3 = Tweene.get('#sec-div3');
            sec.add($secDiv1.set({opacity: 1}).to({opacity: 0}).duration(3000),5000);
            sec.add($secDiv2.set({opacity: 0}).to({opacity: 1}).duration(3000),8000);
            sec.add(Tweene.get('#sec-div2').to({opacity: 0}).duration(3000),16000);
            sec.add($secDiv3.set({opacity: 0}).to({opacity: 1}).duration(3000),19000);
            //sec.add($secDiv3.set({opacity: 1}).to({opacity: 0}).duration(3000),27000);

            // 第四页
            var four = Tweene.line();
            var $secDiv4 = Tweene.get('#sec-div4');
            var $secDiv5 = Tweene.get('#sec-div5');
            //$secDiv2.set({opacity: 0});
            var $secDiv6 = Tweene.get('#sec-div6');
            var $secDiv7 = Tweene.get('#sec-div7');
            four.add($secDiv4.set({opacity: 1}).to({opacity: 0}).duration(3000),5000);
            four.add($secDiv5.set({opacity: 0}).to({opacity: 1}).duration(3000),8000);
            four.add(Tweene.get('#sec-div5').to({opacity: 0}).duration(3000),16000);
            four.add($secDiv6.set({opacity: 0}).to({opacity: 1}).duration(3000),19000);
            four.add(Tweene.get('#sec-div6').to({opacity: 0}).duration(3000),27000);
            four.add($secDiv7.set({opacity: 0}).to({opacity: 1}).duration(3000),30000);
            four.add(Tweene.get('#sec-div7').to({opacity: 0}).duration(3000),38000);

            // 第五页
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

        