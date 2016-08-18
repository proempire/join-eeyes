function share(datas){
        /*
     分享
     */
    //success: to share
    function encode(url) {
        return encodeURIComponent(url).replace(/'/g, "%27").replace(/"/g, "%22");
    }
    //统计分享次数
    function countShare(datas) {
       var parameter =  datas.parameter;
       var countUrl = datas.countUrl;
       $.ajax({
    	   type: 'get',
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			url: countUrl,
			 dataType:'jsonp',
             jsonp:'jsoncallback',
			success: function(data){
				if(data.success){
					
				}else{
					
				}
			},
			error: function(xhr, type){
				alert('网络错误,请重试!');
			}
		})
    	return
    }
    surl = window.location.href;
    var url = "http://www.lagou.com/weixin/wx_share.json?url=" + encode(surl);
    var callback = function (json) {
        var data = json.message;
        data = eval("(" + data + ")");
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
        });
        
        wx.ready(function () {
            var shareData = {
                title: datas.title,
                desc: datas.desc,
                link: surl, // 分享链接
                imgUrl: datas.imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if(datas.goToUrl)
                    	countShare(datas);
                }
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareWeibo(shareData);
            wx.onMenuShareTimeline(shareData);
           
            console.log('weixin support set success.');
        });
        wx.error(function (res) {
            //alert(res.errMsg);
        });
    };
    $.ajax({
        url: url,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (response) {
            callback && callback(response);
        },
        error: function (xhr, type) {
            console.log('xhr:' + xhr + "type:" + type);
            alert("网络错误请重试")
        }
    })
}
    