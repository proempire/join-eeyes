$(window).load(function(){

	// 市场部
	// 创建时间轴
		var market_o_t1 = Tweene.line(); 
        
		        // 开头动效
		        market_o_t1.add(Tweene.get($("#market-o .icon img")).set({display: 'none'}));
		        market_o_t1.add(startJfuc('#market-o'));
		        
		        // 星系出现
		        market_o_t1.add(fadeIn('#market-o .icon img:nth-child(1)', 800));
		        
		        // 星球出现并旋转
		        var market_o_Turn = function(number, x0, y0, x1, y1, Xs, dxyS, speed){
		            if(speed == undefined){ speed = 1000 }
		            var TimeLine = Tweene.line();
		            TimeLine.add(Tweene.get('#market-o .icon img:nth-child(' + number + ')').set({ left: x0 + 'rem', top: y0 + 'rem'}));
		            TimeLine.add(fadeIn('#market-o .icon img:nth-child(' + number + ')', 1000));
		            TimeLine.add(FangDaChuXianfuc('#market-o .icon img:nth-child(' + number + ')', 1000),'-=1000');
		            TimeLine.add(Tweene.get('#market-o .icon img:nth-child(' + number + ')')
		                            .to({left: x1 + 'rem', top: y1 + 'rem'})
		                            .easing([0, 0, 1, 1])
		                            .duration(speed),'-=1000');
		            TimeLine.add(ZiXuanfuc('#market-o .icon img:nth-child(' + number + ')', Xs, dxyS));
		            return TimeLine;
		        }
		        market_o_t1.add(market_o_Turn(2, wwidth+10, wheight+12, wwidth-2, wheight+4, 2000, '60% -86%'), '1200');
		        market_o_t1.add(market_o_Turn(3, wwidth-14, wheight+5, wwidth-3.4, wheight-4.5, 2000, '112% 185%'), '3600');
		        market_o_t1.add(market_o_Turn(4, wwidth-14, wheight-20, wwidth+2, wheight-3.5, 2000, '-62% 150%', 1200), '2800');
		        market_o_t1.add(market_o_Turn(5, wwidth+14, wheight-8, wwidth+2, wheight+2.6, 2000, '-66% -60%'), '2000');
		        
		        // 星系旋转变化
		        var market_o_t2 = Tweene.line();
		        market_o_t2.add(Tweene.get($('#market-o .icon img:nth-child(1)'))
		                    .from({opacity: 1})
		                    .to({opacity: 0.5})
		                    .easing([0, 0, 1, 1])
		                    .loops(-1)
		                    .yoyo(true)
		                    .duration(1000));
		        market_o_t1.add(ZiXuanfuc('#market-o .icon img:nth-child(1)', 2000), '1000').add(market_o_t2, '1800');

		        // 结束动效
		        market_o_t1.add(endJfuc('#market-o'), '4800');        
		        
		        // 动画监听事件
		        $('#market-o a').click(function(){
		        	market_o_t1.pause();
		        })

		        $("a[href='#market-o']").click(function(){ $('#market-o img[remark]').attr('src',function(){return $(this).attr('remark')}); market_o_t1.play(); });

});