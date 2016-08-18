// 通用动画函数        
// 淡入 $:jquery对象 t:时长 arr:淡出速度曲线(默认匀速)
var fadeIn = function($, t, arr){
    if(arr == undefined){ arr = [0, 0, 1, 1]; };
    var TimeLine = Tweene.line();
    TimeLine.add(Tweene.get($)
        .from({opacity: 0, display: 'inline'})
        .to({opacity: 1, display: 'inline'})
        .easing(arr)
        .duration(t));
    return TimeLine;
}
        
// 淡出 $:jquery对象 t:时长 arr:淡出速度曲线(默认匀速)
var fadeOut = function($, t, arr){
    if(arr == undefined){ arr = [0, 0, 1, 1]; };
    var TimeLine = Tweene.line();
    TimeLine.add(Tweene.get($)
        .to({opacity: 0, display: 'none'})
        .easing(arr)
        .duration(t));
    return TimeLine;
}

// 顺时针循环旋转 $:jquery对象 speed:旋转速度 xystr:旋转中心(默认图形中点)
var ZiXuanfuc = function($, speed, xystr){
    if(xystr == undefined){ xystr = '50% 50%'; };
    var TimeLine = Tweene.line();
    TimeLine.add(Tweene.get($)
        .to({rotation: '360', transformOrigin: xystr})
        .easing([0, 0, 1, 1])
        .loops(-1)    
        .duration(speed));
    return TimeLine;
}

// 放大出现效果 $:jquery对象 speed:放大速度 arr:速度曲线(默认匀速)
var FangDaChuXianfuc = function($, speed, arr){
    if(arr == undefined){ arr = [0, 0, 1, 1]; };
    var TimeLine = Tweene.line();
    TimeLine.add(Tweene.get($)
        .from({scale: 0, display: 'inline'})
        .to({scale: 1, display: 'inline'})
        .easing(arr)
        .duration(speed));
    return TimeLine; 
}

// 冒气泡式动效 $:jquery对象 dx1,dy1:冒出时对中心的偏移距离 dx2,dy2:移动终点位置对中心的偏移距离 t1:冒出并移动的时长 bool:移动完成后是否消失 t2:消失的时长
var MaoChuXiaoShifuc = function($, dx1, dy1, dx2, dy2, t1, bool, t2){
    var TimeLine = Tweene.line();
    TimeLine.add(Tweene.get($)
        // 用于测试位置
        // .set({display: 'inline', left: wwidth+dx2 + 'rem', top: wheight+dy2 + 'rem'})
        .from({scaleX: 0, scaleY: 0, display: 'inline', left: wwidth+dx1 + 'rem', top: wheight+dy1 + 'rem'})
        .to({scaleX: 1, scaleY: 1, display: 'inline', left: wwidth+dx2 + 'rem', top: wheight+dy2 + 'rem'})
                        .duration(t1));
    if(bool){
        TimeLine.add(fadeOut($, t2));
    }
    return TimeLine;
}      

// 简介页开始动效 str:简介页id
var startJfuc = function(str){
    var TimeLine = Tweene.line();
    TimeLine.add(Tweene.get($(str + " .title")).set({display: 'none'}));
    TimeLine.add(Tweene.get($(str + " .intro")).set({display: 'none'}));
    TimeLine.add(Tweene.get($(str + " a")).set({display: 'none'}));
    TimeLine.add(Tweene.get($(str + " .icon")).set({display: 'block'}));
    TimeLine.add(fadeIn($(str + ' .title'), 1000, [.89, 0, .79, .46]));
    return TimeLine;
}

// 简介页结束动效 str:简介页id
var endJfuc = function(str){
    var TimeLine = Tweene.line();
    TimeLine.add(fadeOut($(str + ' .icon'), 800), '+=800');
    TimeLine.add(fadeIn($(str + ' .intro'), 800));
    TimeLine.add(fadeIn($(str + ' a'), 800));
    return TimeLine;
}