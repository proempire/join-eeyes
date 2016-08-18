console.log("a");
$(window).load(function(){
	// 小星球动效

	// 简介页动效
	// 市场部
	$("#market-o>.content-J").css("background-image", "url('./images/ShiChang/bg@3x.jpg')");
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
		TimeLine.add(Tweene.get('#market-o .icon img:nth-child(' + number + ')').to({left: x1 + 'rem', top: y1 + 'rem'}).easing([0, 0, 1, 1]).duration(speed),'-=1000');
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
	$('#market-o a').click(function(){ market_o_t1.pause(); });
	$("a[href='#market-o']").click(function(){ $('#market-o img[remark]').attr('src',function(){return $(this).attr('remark')}); market_o_t1.play(); });

	// 公关部
	$("#publicrelation-o>.content-J").css("background-image", "url('./images/GongGuan/bg@3x.jpg')");
	// 创建时间轴
	var publicrelation_o_t1 = Tweene.line();         
	// 开头动效
	publicrelation_o_t1.add(Tweene.get($("#publicrelation-o .icon img")).set({display: 'none'}));
	publicrelation_o_t1.add(startJfuc('#publicrelation-o'));
	// 宇航员出现
	publicrelation_o_t1.add(fadeIn($('#publicrelation-o .icon img:nth-child(1)'), 800));
	// 领结变色
	publicrelation_o_t1.add(Tweene.get($('#publicrelation-o .icon img:nth-child(2)')).set({display: 'inline'}));
	for(var j = 0; j < 2; j++){
		for(var i = 3; i < 7; i++){
		    publicrelation_o_t1.add(Tweene.get($('#publicrelation-o .icon img:nth-child('+i+')')).set({display: 'inline'}),'+=100');
		}
		for(var i = 6; i > 2; i--){
			publicrelation_o_t1.add(Tweene.get($('#publicrelation-o .icon img:nth-child('+i+')')).set({display: 'none'}),'+=100');
		}                
	}
	// 结束动效
	publicrelation_o_t1.add(endJfuc('#publicrelation-o'), '-=500');
	// 动画监听事件
	$('#publicrelation-o a').click(function(){ publicrelation_o_t1.pause(); });
	$("a[href='#publicrelation-o']").click(function(){ $('#publicrelation-o img[remark]').attr('src',function(){return $(this).attr('remark')}); publicrelation_o_t1.play(); });

	// 新闻部
	$("#news-o>.content-J").css("background-image", "url('./images/XinWen/bg@3x.jpg')");
	// 话筒
	$('#news-o .icon #voice').css({left: wwidth+1.5 + 'rem', top: 14.2+ 'rem'}).slip;
		var bg = $("#news-o .icon #bg");
		var bg_img = $("#news-o .icon #bg img")
		bg.css({left: wwidth+4 + 'rem', top: 14.2+ 'rem'});
		bg_img.css({left: -(wwidth+4) + 'rem', top: -14.2 + 'rem', width: wwidth * 2 + 'rem'});
	// 话筒遮挡设置
	$('#news-o .icon #news-o-voice').css({left: wwidth+0.9 + 'rem', top: 8.5+ 'rem'});
	var news_o_obg = $("#news-o .icon #news-o-bg");
	var news_o_obg_img = $("#news-o .icon #news-o-bg img")
	news_o_obg.css({left: wwidth+3.1 + 'rem', top: 8.5+ 'rem'});
	news_o_obg_img.css({left: -(wwidth+3.1) + 'rem', top: -8.5 + 'rem', width: wwidth * 2 + 'rem'});
	// 创建时间轴
	var news_o_t1 = Tweene.line();
	// 开头动效
	news_o_t1.add(Tweene.get($("#news-o .icon #news-o-sun")).set({display: 'none'}));
	news_o_t1.add(Tweene.get($("#news-o .icon #news-o-img img")).set({display: 'none'}));              
	news_o_t1.add(startJfuc('#news-o'));
	// 太阳出现
	var news_o_osun = $('#news-o .icon #news-o-img img:nth-child(1)');
	news_o_t1.add(fadeIn(news_o_osun, 800));
	news_o_t1.add(fadeIn($('#news-o .icon #news-o-sun'), 0.1));
	// 话筒出现
	news_o_t1.add(Tweene.get(news_o_obg)
		.to({height: 0 + 'rem', top: 28.2 + 'rem'})
		.easing([0, 0, 1, 1])
		.duration(1000));
	news_o_t1.add(Tweene.get(news_o_obg_img)
		.to({top: -28.2 + 'rem'})
		.easing([0, 0, 1, 1])
		.duration(1000), '-=1000');
	news_o_t1.add(fadeOut(news_o_osun, 220), '-=100');
	// 嘴巴出现
	var news_o_omouse = $('#news-o .icon #news-o-img img:nth-child(2)');
	news_o_t1.add(fadeIn(news_o_omouse, 800));
	// 字出现
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(3)'), -0.6, 3.6, -10, -4, 1800, false), '3500');  //A       
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(17)'), -0.4, 3.8, -11, -1.5, 1800, false), '3800');  //o
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(5)'), -0.6, 3.6, -9, -1, 1500, false), '4100');  //C
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(14)'), -0.3, 3.6, -10, 1, 1500, false), '4400');  //L        
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(4)'), -0.4, 3.6, -7, -2.5, 1500, false), '4600');  //B       
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(6)'), -0.4, 3.8, -7, -0.2, 1200, false), '4800');  //d        
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(8)'), -0.4, 3.6, -5.5, -0.4, 1000, false), '5000');  //F
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(7)'), -0.4, 4, -7.8, 1.2, 1200, false), '5200');  //e
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(10)'), -0.4, 3.6, -8.5, 2.5, 1200, false), '5400');  //h
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(11)'), -0.2, 3.6, -6.5, 2.4, 1000, false), '5600');  //I
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(9)'), -0.4, 4, -5, 2.1, 1000, false), '5700');  //g 
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(16)'), -0.4, 3.6, -4, -1, 1000, false), '5800');  //N
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(12)'), -0.4, 3.6, -4.2, 3, 800, false), '5900');  //J
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(13)'), -0.4, 3.6, -3, 1, 800, false), '6000');  //K        
	news_o_t1.add(MaoChuXiaoShifuc($('#news-o .icon #news-o-img img:nth-child(15)'), -0.4, 3.8, -2.5, 3, 500, false), '6100');  //M
	// 嘴巴动
	var news_o_t2 = Tweene.line();
	var i = 0;
	while(i<3){
		news_o_t2.add(Tweene.get(news_o_omouse)
		    .to({scaleY: 0.5})
		    .duration(250));
		news_o_t2.add(Tweene.get(news_o_omouse)
		    .to({scaleX: 1.5})
		    .duration(250));
		news_o_t2.add(Tweene.get(news_o_omouse)
		    .to({scaleX: 1})
		    .duration(250));
		news_o_t2.add(Tweene.get(news_o_omouse)
		    .to({scaleY: 1})
		    .duration(250));
		i++;
	}
	news_o_t1.add(news_o_t2, '3600');
	// 结束动效
	news_o_t1.add(endJfuc('#news-o'), '6500');  
	// 动画事件监听
	$('#news-o a').click(function(){ news_o_t1.pause(); });
	$("a[href='#news-o']").click(function(){ $('#news-o img[remark]').attr('src',function(){return $(this).attr('remark')});news_o_t1.play(); });

	// 影视部
	$("#movie-o>.content-J").css("background-image", "url('./images/YinShi/bg@3x.jpg')");
	// 创建时间轴
	var movie_o_t1 = Tweene.line();         
	// 开头动效
	movie_o_t1.add(Tweene.get($("#movie-o .icon img")).set({display: 'none'}));
	movie_o_t1.add(startJfuc('#movie-o'));
	// 摄像机出现
    movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(1)"))
	    .from({left: wwidth-4.5 + 'rem', top: wheight-1 + 'rem', opacity: 0, display: 'inline'})
	    .to({left: wwidth-4.5 + 'rem', top: wheight-1 + 'rem', opacity: 1, display: 'inline'})
	    .duration(800));
    movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(2)"))
        .from({left: wwidth-5 + 'rem', top: wheight-7 + 'rem', opacity: 0, display: 'inline'})
        .to({left: wwidth-5 + 'rem', top: wheight-7 + 'rem', opacity: 1, display: 'inline'})
        .duration(800), '-=800');
	// 摄像机移动
    movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(1)"))
        .to({left: -5 + 'rem', height: 0 + 'rem'})
        .duration(4000));
    movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(2)"))
        .to({left: -5.2 + 'rem', height: 0 + 'rem', top: wheight-1 + 'rem'})
        .duration(4000), '-=4000');
	// 摄像机镜头旋转
	movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(2)"))
        .to({rotation: -20, transformOrigin: '19% 50%'})
        .duration(500)
        , '1800');
    movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(2)"))
        .to({rotation: 20, transformOrigin: '19% 50%'})
        .duration(1000)
        , '2300');
    movie_o_t1.add(Tweene.get($("#movie-o .icon img:nth-child(2)"))
        .to({rotation: -20, transformOrigin: '19% 50%'})
        .duration(1000)
        , '3300');
	// 结束动效
	movie_o_t1.add(endJfuc('#movie-o'), '2800');
	// 动画事件监听
	$('#movie-o a').click(function(){
		movie_o_t1.pause();
	});
	$("a[href='#movie-o']").click(function(){ $('#movie-o img[remark]').attr('src',function(){return $(this).attr('remark')});movie_o_t1.play(); });

});