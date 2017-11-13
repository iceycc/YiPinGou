//入口函数
$(function () {
  // 1-页面载入显示  
  getFirstDate()
  // 2-进行表单验证
  firsrFormCheck()
})



//需要的函数封装
// 1-页面载入显示  
var getFirstDate = function (pageNum) {
  // 通关ajax请求数据 渲染页面
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: pageNum || 1,
      pageSize: 2
    },
    dataType: "json",
    success: function (data) {
      // console.log(data)
      //成功了用模板引擎渲染页面
      var firstResult = template("first-template", data);
      $("tbody").html(firstResult);


      //分页功能
      var options = {
        bootstrapMajorVersion: 3,
        size: 'small',
        // numberofPages: 2,//显示的页数
        currentPage: data.page,
        //totalPages: $("#totalpage").val(), //总页数
        totalPages: Math.ceil(data.total / data.size),

        itemTexts: function (type, page, current) { //修改显示文字
          switch (type) {
            case "first":
              return "第一页";
            case "prev":
              return "上一页";
            case "next":
              return "下一页";
            case "last":
              return "最后一页";
            case "page":
              return page;
          }
        },

        onPageClicked: function (event, originalEvent, type, page) { //异步换页
          getFirstDate(page);
        },

      };
      $(".pagination").bootstrapPaginator(options)
    }
  })
}
// 2-进行表单验证
var firsrFormCheck = function () {
  // 添加验证
  // 1.进行表单验证 --bootstrap-validator 按照现在的情况 是已经废弃了
  // http://blog.csdn.net/u013938465/article/details/53507109
  $('#first-modal').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名不能为空'
          },
        }
      },
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // console.log(e.target)  

  });
  $("#save").on("click", function () {
    var formData = $("#first-form").serialize();
    console.log(formData)
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: formData,
      dataType: "json",
      success: function (data) {
        console.log(data)
        if (data.success == true) {
          $('#first-modal').modal('hide');
          getFirstDate()
        }
      }
    })
  })
}