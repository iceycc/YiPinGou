$(function(){

  getLocalStorage()
  // 判断本地是否有localStorage是否有搜索
  
  if (!localStorage.getItem("search")){
    var searchList = []
  }else{
    var searchList = localStorage.getItem("search").split(",")
    
  }
  
  // 点击搜索 获取输入框内填写的内容 添加到本地  
  $(".search-box span").on("click",function(){    
    var val_hist = $("[type='text']").val()
    // console.log(val_hist)
    // 设置localStorage
    if (val_hist!==""){
      searchList.push(val_hist)
      var str = searchList.join(",")
      // console.log(str)
      localStorage.setItem("search", str)     
    }
  })

  // 点击清空记录 全部删除
  $(".clear-data").on("click",function () {
    console.log(1)
    localStorage.removeItem("search")
    $(".search-history-list").html("")
    getLocalStorage()
  })

  // 点击历史记录某一行,删除改行TODO:
 


})


 //- 声明一个 渲染搜索历史列表的函数 
      //获取localStorage数据 动态添加到下拉的搜索历史
var getLocalStorage = function () {
  if (localStorage.getItem("search")){
    var searchArr = localStorage.getItem("search").split(",")
    var data = { res: searchArr }
    // console.log(data)
    var list = template("search-template",data)
    // console.log(list)
    $(".search-history-list").html(list)
  }
}