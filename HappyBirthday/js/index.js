FastClick.attach(document.body);
$(function () {
    var o={
        cd:function () {
            var RoundTime = 1800000;
            var delayTimes = 0;
            var birthday = "2017/10/23 00:00:00";//农历9月初四
            var nowTime = new Date();
            if(new Date(birthday) - nowTime <= 0){
                $(".timer").html("今天是你生日哦！刘大美女！！生日快乐！！！")
                $(".timer").css("color","red")
            }else{
                var timer=setInterval(function () {
                    var nowTime = new Date();
                    if(new Date(birthday) - nowTime <= 0) {
                        $(".timer").html("今天是你生日哦！刘大美女！！生日快乐！！！")
                        $(".timer").css("color","red")
                        clearInterval(timer)
                    }else{
                        var endTime = new Date(birthday) - nowTime;
                        var days = Math.floor(endTime/(24*60*60*1000));
                        var hours = Math.floor((endTime-days*24*60*60*1000)/(60*60*1000));
                        var minutes  = Math.floor((endTime-days*24*60*60*1000-hours*60*60*1000)/(60000));
                        var seconds  = Math.floor((endTime-days*24*60*60*1000-hours*60*60*1000-minutes*60000)/1000);
                        var mSeconds = Math.round((endTime-days*24*60*60*1000-hours*60*60*1000-minutes*60000-seconds*1000)/100)
                        if(endTime<(24*60*60*1000)){
                            $(".timer").css("color","yellow")
                            $(".timer").html("离倩倩过生日还有1天啦！！")
                        }
                        $(".timer").html(days+"天"+twoNumber(hours)+"小时"+twoNumber(minutes)+"分钟"+twoNumber(seconds)+"秒"+ twoNumber(mSeconds))
                    }
                },100)
            }
            function twoNumber(num) {
                if(num.toString().length<2){
                    return "0"+num
                }else{
                    return num
                }
            }
        },
        swiper:function () {
            var mySwiper = new Swiper('.swiper-container', {
               /* effect : 'fade',*/
                autoHeight: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                onInit: function(mySwiper){ //Swiper2.x的初始化是onFirstInit
                    swiperAnimateCache(mySwiper); //隐藏动画元素
                    swiperAnimate(mySwiper); //初始化完成开始动画
                },
                onSlideChangeEnd: function(mySwiper){
                    swiperAnimate(mySwiper); //每个slide切换结束时也运行当前slide动画
                }
            })
        },
        init:function () {
            o.swiper()
            o.cd()
        }
    }
    //test
  /*  $(".link").on("click",function () {
        var nowTime = new Date();
        if(new Date(birthday) - nowTime <= 0){
            alert("如果到了今天你还在我身边，我希望你能看到我真的很爱你！！")
        }
        var i =parseInt(10*Math.random())
        switch(i>5?i-5:i){
            case 0:
                alert("哈哈");
                break;
            case 1:
                alert("你真漂亮");
                break;
            case 2:
                alert("又近了一天哦");
                break;
            case 3:
                alert("睡个好觉");
                break;
            case 4:
                alert("要开心");
                break;
            case 5:
                alert("么么哒");
                break;
        }

    })*/
    //封装alert样式
    o.init()
})
var dialog = {
    fucCheckLength : function(strTemp){
        return strTemp.replace(/[\s\S]/g, function(a){
            return /[\u4E00-\u9FA5]/.test(a)?'11':'1';
        }).length;
    },
    alert: function(msg, type, fn){
        //icon  1红色感叹号  2黄色感叹号  3绿色对号   4蓝色i
//			dialog.alert('加了个图标', {icon: 2},function(){alert('12')})
        var opt = {
            icon:'',
            title:'',
            btn:'确定'
        }
        if(typeof type === 'function'){
            fn = type
            type = opt
        }else{
            type = type||opt
        }
        var title = type.title||opt.title;
        var btn = type.btn||opt.btn;
        var dialog = document.getElementById('dialog');
        if(!dialog){
            var html = document.createElement('div');
            html.setAttribute("id", "dialog");
            html.setAttribute("class", "weui_dialog_alert")
            document.body.appendChild(html)
            html.innerHTML = '<div class="weui_mask"></div>\
				    <div class="weui_dialog">\
			        <div class="'+ (!title?'':'weui_dialog_hd') +'"><strong class="weui_dialog_title">'+ title +'</strong></div>\
			        <div class="weui_icon_'+ type.icon +'"></div>\
			        <div class="weui_dialog_bd">'+ msg +'</div>\
			        <div class="weui_dialog_ft">\
			            <a href="javascript:;" class="weui_btn_dialog primary">'+ btn +'</a>\
			        </div>\
			    	</div>'

            document.querySelector('#dialog a').onclick = function(){
                document.body.removeChild(document.querySelector('#dialog'))
//					document.querySelector('#dialog').remove();
                typeof fn === 'function' && fn();
            }
        }
    }
}
window.alert = function(msg){
    if(document.querySelectorAll('.alertBox').length){
        clearTimeout(window.alert.time);
        document.querySelector('.alertBox').remove();
    }
    if(dialog.fucCheckLength(msg)>30)return dialog.alert(msg);
    var obj = document.createElement('div')
    obj.setAttribute('class', 'alertBox');
    obj.innerHTML = msg;
    document.body.appendChild(obj);
    window.alert.time = setTimeout(function () {
        document.body.removeChild(document.querySelector('.alertBox'))
    }, 500);
}