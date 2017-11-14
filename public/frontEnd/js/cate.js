// 入口函数
$(function(){
  // 渲染页面
  getFirstDate()

  // 点击右侧侧边栏
  $(".mb_aside ul").on("tap","a",function(){
    $(".mb_aside").find("a").removeClass("active");
    $(this).addClass("active")
    var id = $(this).data("id")
    // console.log(id)
    getSecondDate(id)
  })


})


// 1-声明一个 渲染侧边栏数据的函数
var getFirstDate = function(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    data:"",
    dataType:"json",
    success:function(data){
      // console.log(data)
      var list1 = template("cate-template",data)
      $(".mb_aside ul").html(list1)
      getSecondDate(data.rows[0].id);
    }
  })
}

// 2-声明一个 渲染右侧数据的函数
var getSecondDate = function (id) {
  // url /category/querySecondCategory
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    data:{
      id:id||1,
    },
    dataType:"json",
    success: function (data) {
      // console.log(data)
      var list2 = template("cate-r-temlate",data)
      $(".mb-ct-pic ul").html(list2)
    }
  })
}

// 3-