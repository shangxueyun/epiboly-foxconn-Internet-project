let echarts = require('echarts');

let download_options = {
  toolbox: {
    show : true,
    right: '3%',
    bottom: '4%',
    feature: {
      saveAsImage: { show: true }
    }
  }
};
let pie_label_level1 = {
  radius: ['0%' , '75%'],
  label: {
    normal: {
      show: true,
      position: 'inner',
      formatter: function (params) {
        return Math.round(params.percent) + '%'
      },
      textStyle: {
        fontSize: 30,
        fontWeight: 'normal'
      }
    }
  },
  labelLine: {
    normal: {
      show: false
    }
  }
};
let pie_label_level2 = {
  radius: ['74%' , '75%'],
  label: {
    normal: {
      show: true,
      color: '#000',
      textStyle: {
        fontSize: 30,
        fontWeight: 'normal'
      }
    }
  },
  labelLine: {
    normal: {
      show: true,
      length: 40,
      length2: 45
    }
  }
};
let pie_basic_options = {
  color: ['#6ba0ff', '#6bd3ff'],
  tooltip: {
    trigger: 'item',
    backgroundColor: 'white',
    textStyle: {
      color:'#a7a7a7'
    },
    formatter: "{b}: {c} ({d}%)"
  },
  legend: {
    show: false
  },
  series: [
    {
      name:'',
      type:'pie',
      avoidLabelOverlap: false
    }
  ]
};
let line_single_options = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'white',
    textStyle: {
      color:'#a7a7a7'
    },
    extraCssText:'width: 13.9rem; height :5.5rem;',
    formatter: '日期:{b}<br>数据:{c} KB'
  },
  legend:{
    show :false
  },
  grid: {
    left: '10%',
    right: '11%',
    bottom: '12%'
  },
  xAxis: {
    name: "时",
    nameTextStyle: {
      color: "#a7a7a7",
      fontSize: 20,
    },
    nameLocation: 'end',
    type: 'category',
    boundaryGap: false,
    axisLine: {
      symbol: ['none','arrow']
    },
    axisLabel: {
      interval: 4,
      fontSize: 20,
    },
    axisPointer: {
      show: false
    },
    data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  },
  yAxis: {
      name: "KB",
      nameLocation: 'end',
      nameTextStyle: {
        color: "#a7a7a7",
        fontSize:20,
      },
      type: 'value',
      axisLabel: {
        fontSize: 20,
        show: true
      },
      axisTick: {
        show: false
      },
      axisLine:{
        symbol: ['none','arrow']
      },
      splitLine: {
        show:true
      }
  },
  series: [
    {
      name: '数据量',
      type: 'line',
      stack: '数据量',
      symbolSize: 14,
      symbol:'circle',
      itemStyle: {
        color: '#6ba0ff'
      }
    }
  ]
};
let data_comparison_options = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'white',
    textStyle: {
      color:'#a7a7a7'
    },
    extraCssText:'width: 13.9rem; height :5.5rem;',
    formatter: '日期:{b}<br>数据:{c} KB'
  },
  xAxis: {
    name: '时',
    type: 'category',
    nameGap: 35,
    boundaryGap: false,
    nameTextStyle: {
      fontSize: 20,
      color: '#a7a7a7'
    },
    axisTick: {
      show: false
    },
    axisLine:{
      symbol: ['none','arrow']
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 20
      }
    },
    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
  yAxis: {
    name: 'KB',
    type: 'value',
    nameGap: 20,
    nameTextStyle: {
      fontSize: 20,
      color: '#a7a7a7'
    },
    axisTick: {
      show: false
    },
    axisLine:{
      symbol: ['none','arrow']
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 20
      }
    }
  },
  series: [
    {
      name: '数据量',
      type: 'line',
      data: [],
      color: 'rgb(255,200,107)',
      symbolSize: 14,
      symbol:'circle',
    },
    {
      name: '数据量',
      type: 'line',
      data: [],
      color: 'rgb(109,163,253)',
      symbolSize: 14,
      symbol:'circle',
    }
  ]
};
let data_component_options = {
  color: '#6ca3fb',
  grid: {
    top: '8%',
    left: '30%'
  },
  xAxis: {
    show: false
  },
  yAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show:false
      },
      axisLabel: {
        fontSize: 16
      },
      offset: 20,
      inverse: true,
      data: []
  },
  tooltip: {
    backgroundColor: 'white',
    textStyle: {
      color:'#a7a7a7'
    },
    extraCssText:'width: 13.9rem; height :5.5rem;',
    formatter(params) {
      let name = params.data.name;
      let countText = params.data.countText;
      return name + "<br/>笔数：" + countText;
    }
  },
  series: [
    {
      name: '存量',
      type: 'bar',
      barWidth: '70%',
      barCategoryGap: 0,
      label: {
        normal: {
          show: true,
          position: 'right',
          color:'#333',
          formatter(params) {
            let name = params.name;
            let value = params.value;
            return value + 'MB';
          }
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#d4a4ff'
          }, {
            offset: 1,
            color: '#6ba0ff'
          }])
        }
      }
    }
  ]
};
module.exports = {
    pie_label_1: function () {
      return pie_label_level1;
    },
    pie_label_2: function () {
      return pie_label_level2;
    },
    pie_basic: function() {
        return pie_basic_options;
    },
    bar_basic: function() {
      return data_component_options;
    },
    line_single: function() {
      return line_single_options;
    },
    line_multiple_basic: function() {
      return data_comparison_options;
    }
}