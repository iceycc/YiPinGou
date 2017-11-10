// 该文件是用来写echarts这个图表的文件
$(function () {

  // 柱状图
  var zhuChart = document.querySelector(".picTable:first-child")
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(zhuChart);

  // 指定图表的配置项和数据
  var option = {
    /*图标的标题*/
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 2000, 3600, 1400, 1200, 2220]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  

  // 饼状图
  var pieChart = document.querySelector(".picTable:last-child")

  var secondCarts = echarts.init(pieChart);
  var secondOption = {
    title: {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '耐克'
        },
        {
          value: 310,
          name: '阿迪'
        },
        {
          value: 234,
          name: '百伦'
        },
        {
          value: 135,
          name: '安踏'
        },
        {
          value: 1548,
          name: '李宁'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  secondCarts.setOption(secondOption);

  console.table(secondOption)
  
  // console.log(secondOption)

})