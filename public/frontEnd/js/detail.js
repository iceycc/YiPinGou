$(function(){
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏`
    bounce: true //是否启用回弹
  });

  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
  });


  
  var urlC = window.location.search
  
  var data = urlC.slice(1)
  // var str = "keyWord=1";
  console.log(data)
  var c = strToObj(data)
  console.log(c)



})


//1- 封装一个函数将下面字符串转换为对象
// var str = "key=1&name=2";
var strToObj = function (str){
  // 将楼上转为对象或数组的形式
  var arry = str.split("&");
  var obj = {};
  for (var i = 0; i < arry.length; i++) {
    var ary = arry[i].split("=");
    obj[ary[0]] = ary[1];
  }
  return obj 
}





// 百度的方法 
var url = request("url");

//获取url参数
function request(paras) {
  //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。
  var url = decodeURI(location.href);//location.href;--中文乱码
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  var j;
  for (var i = 0; j = paraString[i]; i++) {
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()];
  if (typeof (returnValue) == "undefined") {
    return "";
  } else {
    return returnValue;
  }
}