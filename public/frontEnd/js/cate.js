// 入口函数
$(function(){

  getCateDate()

})


// 1-声明一个 渲染侧边栏数据的函数
var getCateDate = function(pageNum){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    data:"",
    dataType:"json",
    success:function(data){
      console.log(data)
      var list = template("cate-template",data)
      $(".mb_aside ul").html(list)
    }
  })
}