// 该文件的功能是用来写首页的js交互的

/*不显示转圈效果*/
NProgress.configure({
  showSpinner: false
});

// 在ajax请求的时候 把进度条显示出来
$(window).ajaxStart(function () {
  NProgress.start()
});
$(window).ajaxComplete(function () {
  NProgress.done()
});

// 点击顶部按钮隐藏显示左侧栏

$(".ypg-nav a:first-child").on("click",function () {
  // console.log(1)
  $(".ypg-aside").toggle()
  // Math.abs()
  //TODO:想想怎么加上动画
  $(".ypg-section").toggleClass("move")  
})


// 点击左侧侧边栏中的选项显示折叠选项

$(".ypg-aside .menu").on("click","[class='abc']",function () { 
  var $_this = $(this)
  // console.log(1)
  var $child = $_this.siblings()
  var $parent = $_this.parent()
  // $parent.toggleClass("active")
  $child.slideToggle()
})

// 点击退出确定按钮 通过ajax请求 一个js后台文件 然后实现退出
$(".loginout-btn button:last-child").on("click",function () {
  // $.get("/backEnd/api/loginout.php")
  $.get("/backEnd/api/loginout.js")


})