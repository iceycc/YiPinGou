$(function () {
  // 
  getSearchDate()
  // 排序
  // 1=按照价格排序
  var flag=true;
  $(".order-price").on("tap", function () {
    console.log(1)
    $('.search-result-order a').removeClass('active');
    $(this).addClass('active');
    if (flag) {
      getSearchDate(1,1,null)
      flag = false;
      $(this).find('i').addClass('fa-angle-up');
      $(this).find('i').removeClass('fa-angle-down');
    }else{
      getSearchDate(1, 2, null)
      flag =true;
      $(this).find('i').addClass('fa-angle-down');
      $(this).find('i').removeClass('fa-angle-up');
    }
  })

  // 2=按库存排序
  var judge = true;
  $(".order-stock").on("tap",function () {
    $('.search-result-order a').removeClass('active');
    $(this).addClass('active');
    if (judge) {
      getSearchDate(1, null, 1)
      flag = false;
      $(this).find('i').addClass('fa-angle-up');
      $(this).find('i').removeClass('fa-angle-down');
    }else{
      getSearchDate(1, null, 2)
      flag = false;
      $(this).find('i').addClass('fa-angle-down');
      $(this).find('i').removeClass('fa-angle-up');
    }
  })

})





//1- 获取url地址中参数指定属性的值
var getUrlDate = function (keyword) {
  // 获取一个关于url的内置对象
  var url = new URLSearchParams(location.search);
  return url.get(keyword);
}
//2- 获取搜索数据
var getSearchDate = function (pageNum, price,num) {
  var proName = getUrlDate("proName")
  $.ajax({
    type: "get",
    // 获取产品列表  搜索产品
    url: "/product/queryProduct",
    data: {
      proName: proName || "",
      page: pageNum || 1,
      pageSize: 6,
      price:price || null,
      num:num || null,   
    },
    success: function (data) {
      console.log(data)
      var lists = template("searchList-template", data)

      $(".search-result-list").html(lists)
    }
  })
}











// --------------自己的方法 获取url中的参数
var textFun = function () {
  var urlC = window.location.search
  var data = urlC.slice(1)
  // var str = "keyWord=1";  
  var c = strToObj(data)
}

// 获取url中的参数
//a-  自己方法 封装一个函数将下面字符串转换为对象
// var str = "key=1&name=2";
var strToObj = function (str) {
  // 将楼上转为对象或数组的形式
  var arry = str.split("&");
  var obj = {};
  for (var i = 0; i < arry.length; i++) {
    var ary = arry[i].split("=");
    obj[ary[0]] = ary[1];
  }
  return obj
}

//b-  补充    百度的方法 
var url = request("url");

//获取url参数
function request(paras) {
  //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。
  var url = decodeURI(location.href); //location.href;--中文乱码
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