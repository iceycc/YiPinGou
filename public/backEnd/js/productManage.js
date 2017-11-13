// 产品页面的js
// 入口函数
$(function () {
  // 1-渲染页面
  getProductDate()
  // 2-表单校验
  productFormCheck()
  // 3-上传图片文件
  uploadProduct()

})


// 相关功能函数封装
// 1-渲染页面
var getProductDate = function (pageNum) {
  $.ajax({
    type: "get",
    url: "/product/queryProductDetailList",
    data: {
      page: pageNum || 1,
      pageSize: 5
    },
    dataType: "json",
    success: function (data) {
      // console.log(data)
      var list = template("product-template", data)
      $("tbody").html(list)
    }
  })
}

// 2-表单校验
var productFormCheck = function () {
  $('form').bootstrapValidator({　　　　　　　　
    message: 'This value is not valid',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          }
        }
      }
    }
  }).on("success.form.bv",function(e){
    e.preventDefault()
    // 获取表单元素
    var $form = $(e.target)
    // console.log($form)
    // 要获取的的参数        
    // proName  产品名称 
    // proDesc  产品描述
    // num      用户库存
    // price    价格
    // oldPrice 老价格   
    // size     产品尺寸   
    // brandId  品牌归属 虽然没有我们采取自己随便定一个数据库中有的brandId
    // pic     图片数组
    var data = $form.serialize()+"&brandId=3"
    // 此时还得获取pic 要在上传图片时获取 
    // console.log(piclist)
    $.each(piclist,function(i,item){
      // console.log(i,item)
      data+="&picName"+(i+1)+"="+item.picName+"&picAddr"+(i+1)+"="+item.picAddr
    })
    // console.log(data)
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:data,
      dataTpe:"json",
      success:function(data){
        $("#product-modal").modal("hide")

      }
    })
  })
}

// 3-上传图片
var piclist = []
var uploadProduct =function () {
  // 使用上传文件的插件  
  // 下面的id是type=file类型的input的id
  $("#pic").fileupload({
    // 找到上传图片的接口
    url: "/product/addProductPic",
    done: function (e, data) {
      // console.log(data);
      $('.fileupload').append('<img width="50" height="auto" src="' + data.result.picAddr + '" alt="">');
      // console.log(data.result);
      piclist.push(data.result);
      getProductDate()
    }
  })
}

//TODO:抽时间完成上架和编辑功能
// 4-上架

// 5-编辑