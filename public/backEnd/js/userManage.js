$(function () {

  getUserDate()
})

// 1-页面渲染
var getUserDate = function (pageNum) {
  $.ajax({
    type: 'get',
    url: '/user/queryUser',
    data: {
      page: pageNum || 1,
      pageSize: 5
    },
    dataType: "json",
    success: function (data) {
      console.log(data)
      var userManageList = template('usermanage-template', data);
      // 把拿到的数据插入到页面中 html append
      $('table tbody').html(userManageList);
      // TODO:渲染失败  找bug 还有完善功能
    }

  })
}