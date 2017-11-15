$(function(){

  // 1-页面加载
  showHistory()
  // 2-点击搜索把 输入的内容添加到历史记录
  var valueInput = $(".search-box input")
  $('#search-btn').on("tap",function(){
    // console.log(1)
    var keyWord = valueInput.val()
    addHostory(keyWord)
    showHistory()
    // 点击搜索按钮把当前输入的内容通过url传参
    var hisList = getLs()
    console.log(keyWord)
    var baseUrl = $(this).find("a").prop("href")   
    var finalUrl = baseUrl + "?proName=" + keyWord 
    $(this).find("a").prop("href", finalUrl)
  })
  // 3-点击清空历史按钮 将历史记录删除
  $('#clear-history').on('tap', function () {
    console.log(1)
    // 为什么不用localStorage.clear(); 怕影响其他网站或本网站的功能
    localStorage.removeItem('ltHistory');
  })
  // 4-点击删除 删除选中项
  $(".search-history-list").on('tap', 'i', function () {
    var deleteData = $(this).siblings('span').html();
    // console.log(deleteData);

    removeH(deleteData);
    showHistory();
  })
  // 点击历史搜索记录的字 完成跳转
  $("search-history-list").on("tap","span",function () { 
    var keyWord = valueInput.val()
    location.href = "./searchlis.html?proName="+keyWord
   })
})
  




//1- 获取当前的localStorage数据
var getLs = function(){
  return JSON.parse(window.localStorage.getItem('search') || '[]');
}


//2- 添加输入内容到localStorage
var addHostory = function (value) { 
  var list = getLs()
  // 遍历数组
  $.each(list,function(i,item) {
    if(value==item){
      list.splice(i,1)
    }
  })
  list.push(value)
  localStorage.setItem("search",JSON.stringify(list)) ;
}



// 3=移出数据
var removeH = function(value){
  var list = getLs()
  $.each(list,function(i,item){
    list.splice(i,1)
  })
  window.localStorage.setItem("search",JSON.stringify(list))
}


//4-将localStorage数据渲染到搜索历史
var showHistory = function () {
  var searchArr = getLs()
  if (searchArr.length == 0) {
    $(".empty-history").show()
    $(".search-history").hide()
  } else {
    var data = { res: searchArr }
    var list = template("search-template", data)
    // console.log(list)
    $(".empty-history").hide()
    $(".search-history").show()

    $(".search-history-list").html(list)
  }

}