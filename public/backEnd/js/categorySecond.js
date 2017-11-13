// 入口函数------------------------------------------
$(function () {
  //在这里调用函数

  // 1-载入页面获取数据渲染
  getSecondData()

  // 2-表单校验
  formCheck()

  // 3-点击模态框一级分类时动态生成一级分类下拉目录
  initDropDown()

  // 4-模态框 图片文件上传
  uploadFile()
})



// 用到的函数声明--------------------------------
// 1-声明一个 渲染页面的函数
var getSecondData = function (pageNum) {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: pageNum || 1,
      pageSize: 5
    },
    dataType: "json",
    success: function (data) {
      // console.log(data)
      var List = template("second-tempale", data)
      $("table tbody").html(List)


      // 分页功能++++++++++++++++++++++++++
      $(".fenye").bootstrapPaginator({
        /*当前使用的是3版本的bootstrap*/
        bootstrapMajorVersion: 3,
        /*配置的字体大小是小号*/
        size: 'small',
        /*当前页*/
        currentPage: data.page,
        /*总页*/
        totalPages: Math.ceil(data.total / data.size),
        /*点击页面事件*/
        onPageClicked: function (event, originalEvent, type, page) {
          /*改变当前页再渲染 page当前点击的按钮的页面*/
          getSecondData(page);
        },
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
      })
    }
  })
}
// 2-声明一个 表单校验函数
var formCheck = function () {
  // 校验
  $('#secondform').bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        brandName: {
          message: '用户名验证失败',
          validators: {
            notEmpty: {
              message: '二级分类名不能为空'
            },
            stringLength: {
              min: 2,
              max: 10,
              message: '二级分类名长度必须在2到10位之间'
            },
          }
        },

      },
      // submitHandler: function (validator, form, submitButton) {
      //   // alert("submit");
      //   // $("#second-modal").modal(hidden)

      //   console.log(form)

      // }
    })
    .on("success.form.bv", function (e) {
      e.preventDefault();
      // e.target 获取触发
      var $form = $(e.target)
      // console.log($form)

      // var bv = $form.data("bootstrapValidator")
      // console.log(bv)  
      // 序列化 需要提交的数据  serialize
      var data = $form.serialize()
      console.log(data)

      // 提交二级分类修改
      $.ajax({
        type:"post",
        url:"/category/addSecondCategory",
        data:data,
        success:function (data) {
          console.log(data)
          // 隐藏模态框
          $("#second-modal").modal("hide")
        }
      })
    })
}
// 3-声明一个 产生一级下拉框的函数
var initDropDown = function () {
  // 点击模态框的一级分类 动态创建 下拉菜单 
  // 点击下拉菜单的一级分类目录时 
  //将选中的一级分类id赋值给预先设置好的隐藏域
  var dropdown = $(".dropdown")
  dropdown.on("click", function () {
    $.ajax({
      type: "get",
      // 接口 查询一级分类
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data)
        var html = ""
        $.each(data.rows,function(i,item){
          console.log(i,item)
          html += '<li><a href="javascript:;" data-id="' + item.id + '" >' + item.categoryName + '</a></li>'
        })
        // 动态添加下拉一级分类目录
        $(".dropdown-menu").html(html);
        // 点击一级分类目录某一项 
        $('.dropdown-menu').on('click', 'a', function () {
          // 将点击的一级分类目录添加到默认栏
          $('.dropdown-text').html($(this).html());
          // 将点击的那一项的id添加到隐藏域的自定义属性data-id
          $('#categoryId').val($(this).attr('data-id'));
        })
      }
    })
  })
}
// 4-声明一个上传文件的函数
var uploadFile = function () {
  // http://yixiandave.iteye.com/blog/1897330
  $("#secondupload").fileupload({
    url: "/category/addSecondCategoryPic",//文件上传地址，当然也可以直接写在input的data-url属性内  
    //formData: { param1: "p1", param2: "p2" },//如果需要额外添加参数可以在这里添加  
    done: function (e, data) {
      //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api  
      //注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息  
      //返回的数据在result.result中，假设我们服务器返回了一个json对象  
      // console.log(JSON.stringify(result.result));
      console.log(data)
      $('#previewimg').attr('src', data.result.picAddr);
      $('#brandLogo').val(data.result.picAddr);
    }
  }) 
}