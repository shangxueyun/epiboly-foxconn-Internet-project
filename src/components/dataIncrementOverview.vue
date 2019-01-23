<template>
<div class="main-content">
  <toolbox-download></toolbox-download>
  <VuePerfectScrollbar>
    <div class="scroll-block">
      <Row type="flex" justify="start">
        <Col class="lg_1" span="1"></Col>
        <Col class="lg_24" span="11">
          <section class="chart-box half-page">
            <h2 class="title">数据总量</h2>
            <div class="chart-container">
              <div id="chart-jietu" class="background">
                <div class="chart-nav"><span class="chart-title">当前数据总量</span></div>
                <div class="chart-content">
                  <div class="main-icon"><i class="icomoon-cloud"></i></div>
                  <div class="data-amount"><span>{{message}}</span><br><span>MB</span></div>
                </div>
              </div>
              <button class="footer-like" @click="DownloadScreenshots('chart-jietu','Gross_download')"></button>
              <a id="Gross_download" href="" download=""></a>
            </div>
          </section>
        </Col>
        <Col class="lg_24" span="11">
          <section class="chart-box half-page">
            <h2 class="title">数据成分</h2>
            <div id="Component_chart" class="chart-container">
              <div class="chart-nav">
                <Row type="flex" justify="start" class="code-row-bg">
                  <Col span="6" class="tab-like">
                    <Button @click="DataComponentBtnSw('source')" :class="isActiveBtn('DataComponentBtn', 'source', 'active')">数据源</Button>
                  </Col>
                  <Col span="6" class="tab-like">
                    <Button @click="DataComponentBtnSw('volume')" :class="isActiveBtn('DataComponentBtn', 'volume', 'active')">数据量</Button>
                  </Col>
                  <Col span="12"></Col>
                </Row>
              </div>
              <div class="DataComponent_roll" :id="isActiveBtn('DataComponentBtn', 'source', '_display')">
                <VuePerfectScrollbar style="height: 100%; ">
                  <div class="scroll-block">
                  <ul>
                    <li v-for="datas in DataComponent.DataComponenSource.data">
                      <Row v-if="datas.id % 2 != 0" type="flex" justify="start" class="code-row-bg back_gradient">
                        <Col class="_left" span="8"><span>{{ datas.id }}</span></Col>
                        <Col class="_center" span="8"><span>{{ datas.name }}</span></Col>
                        <Col class="_right" span="8"><span>{{ datas.value }}个</span></Col>
                      </Row>
                      <Row v-else type="flex" justify="start" class="code-row-bg">
                        <Col class="_left" span="8"><span>{{ datas.id }}</span></Col>
                        <Col class="_center" span="8"><span>{{ datas.name }}</span></Col>
                        <Col class="_right" span="8"><span>{{ datas.value }}个</span></Col>
                      </Row>
                    </li>
                  </ul>
                  </div>
                </VuePerfectScrollbar>
              </div>
              <div class="DataComponent_roll" :id="isActiveBtn('DataComponentBtn', 'volume', '_display')">
                <VuePerfectScrollbar style="height: 100%; ">
                  <div class="scroll-block">
                    <div id="DataComponent_echarts" ref="DataComponent_echarts1" style="width:94%;float:left;height: 43rem;"></div>
                    <div class="DataComponent_roll_lichildren" style="width:6%;float:right;height: 43rem;">
                      <ul>
                        <li v-for="datas in DataComponent.DataComponenSource.dataLi">
                          {{ datas.id }} %
                        </li>
                      </ul>
                    </div>
                  </div>
                </VuePerfectScrollbar>
              </div>
              <button class="footer-like" @click="DownloadScreenshots('DataComponent_roll','Component_download',switchBtn.DataComponentBtn)"></button>
              <a id="Component_download" href="" download=""></a>
            </div>
          </section>
        </Col>
        <Col class="lg_1" span="1"></Col>
      </Row>
      <Row type="flex" justify="start">
        <Col class="lg_1" span="1"></Col>
        <Col class="lg_24" span="11">
          <section class="chart-box half-page">
            <h2 class="title">数据成长</h2>
            <div class="chart-container">
              <div class="chart-nav">
                <Row type="flex" justify="start" class="code-row-bg">
                  <Col span="14"></Col>
                  <Col span="8">
                    <ButtonGroup size="large" class="full-width flex-box">
                      <Button @click="switchDataGrowing('P1D')" :class="isActiveBtn('dataIncrementPeriod', 'P1D', 'ivu-btn-primary')">当日</Button>
                      <Button @click="switchDataGrowing('P30D')" :class="isActiveBtn('dataIncrementPeriod', 'P30D', 'ivu-btn-primary')">近30天</Button>
                    </ButtonGroup>
                  </Col>
                  <Col span="1"></Col>
                </Row>
              </div>
              <div id="Growth_echart" class="chart background" ref="chart_grow_line"></div>
              <button class="footer-like" @click="DownloadScreenshots('Growth_echart','Growth_download')"></button>
              <a id="Growth_download" href="" download=""></a>
            </div>
          </section>
        </Col>
        <Col class="lg_24" span="11">
          <section class="chart-box half-page">
            <h2 class="title">数据比较</h2>
            <div class="chart-container">
              <div class="chart-nav">
                <Row type="flex" justify="start" class="code-row-bg">
                  <Col span="14"></Col>
                  <Col span="8">
                    <ButtonGroup size="large" class="full-width flex-box">
                      <Button @click="switchDataComparison('date')" :class="isActiveBtn('dataComparisonPeriod', 'date', 'ivu-btn-primary')">当日</Button>
                      <Button @click="switchDataComparison('interval')" :class="isActiveBtn('dataComparisonPeriod', 'interval', 'ivu-btn-primary')">近30天</Button>
                    </ButtonGroup>
                  </Col>
                  <Col span="1"></Col>
                </Row>
              </div>
              <div id="Comparison_echart" class="chart background" ref="chart-data-comparison"></div>
              <button class="footer-like" @click="DownloadScreenshots('Comparison_echart','Comparison_download')"></button>
              <a id="Comparison_download" href="" download=""></a>
            </div>
            <div class="comparison_date">
              <Row type="flex" justify="start" class="code-row-bg">
                <Col span="3"></Col>
                <Col span="11">
                  <DatePicker 
                    size="large"
                    style="width: 48%"
                    format="yyyy/MM/dd" 
                    :value="switchBtn.dataComparisonDate2"
                    :type="switchBtn.dataComparisonPeriod == 'date' ? 'date' : 'daterange'"
                    @on-change="getDatePicker('dataComparisonDate2', $event)">
                  </DatePicker>
                  <DatePicker 
                    size="large"
                    class="input-orange" 
                    style="width: 48%"
                    format="yyyy/MM/dd"
                    :value="switchBtn.dataComparisonDate1"
                    :type="switchBtn.dataComparisonPeriod == 'date' ? 'date' : 'daterange'"
                    @on-change="getDatePicker('dataComparisonDate1', $event)">
                  </DatePicker>
                </Col>
                <Col span="8"></Col>
              </Row>
            </div>
          </section>
        </Col>
        <Col class="lg_1" span="1"></Col>
      </Row>
    </div>
  </VuePerfectScrollbar>
</div>
</template>

<script>
import toolboxDownload from '@/components/common/toolbox-download';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import chart_options from '@/assets/js/chartOptions.js';
import $ from '@/assets/js/jquery-3.3.1.min.js';
import '@/assets/js/html2canvas.js'; 
export default {
  name: 'dataIncrementOverview',
  components: {
    VuePerfectScrollbar,
    toolboxDownload
  },
  data() {
    return {
      DataComponent: {
        Options: chart_options.bar_basic(),
        DataComponenSource: {
          data: [
            {id: 1, name: '门磁', value: 20},
            {id: 2, name: '烟感', value: 30},
            {id: 3, name: '锚具', value: 53},
            {id: 4, name: '摄像头', value: 61},
            {id: 5, name: '氨气传感器', value: 18},
            {id: 6, name: '电梯传感器', value: 21},
            {id: 7, name: '可燃气体传感器', value: 32},
            {id: 8, name: '人流红外线传感器', value: 45},
            {id: 9, name: '杂物红外线传感器', value: 13},
            {id: 10, name: '智能井盖', value: 58},
            {id: 11, name: '动作传感器', value: 10},
            {id: 12, name: '地磁', value: 19},
            {id: 13, name: '垃圾传感器', value: 19},
            {id: 14, name: '门磁', value: 20},
            {id: 15, name: '烟感', value: 30},
            {id: 16, name: '锚具', value: 53},
            {id: 17, name: '摄像头', value: 61},
            {id: 18, name: '氨气传感器', value: 18},
            {id: 19, name: '电梯传感器', value: 21},
            {id: 20, name: '可燃气体传感器', value: 32},
            {id: 21, name: '人流红外线传感器', value: 45},
            {id: 22, name: '杂物红外线传感器', value: 13},
            {id: 23, name: '智能井盖', value: 58},
            {id: 24, name: '动作传感器', value: 10},
            {id: 25, name: '地磁', value: 19},
            {id: 26, name: '垃圾传感器', value: 19},
          ],
          dataLi: [
            {id: 1, name: '门磁', value: 20},
            {id: 2, name: '烟感', value: 30},
            {id: 3, name: '锚具', value: 53},
            {id: 4, name: '摄像头', value: 61},
            {id: 5, name: '氨气传感器', value: 18},
            {id: 6, name: '电梯传感器', value: 21},
            {id: 7, name: '可燃气体传感器', value: 32},
            {id: 8, name: '人流红外线传感器', value: 45},
            {id: 9, name: '杂物红外线传感器', value: 13},
            {id: 10, name: '智能井盖', value: 58},
            {id: 11, name: '动作传感器', value: 10},
            {id: 12, name: '地磁', value: 19},
            {id: 13, name: '垃圾传感器', value: 19},
            {id: 14, name: '门磁', value: 20},
          ]
        }
      },
      message: '1024',
      switchBtn: {
        dataIncrementType: 'total',
        dataIncrementPeriod: 'P1D',
        dataComparisonType: 'sum',
        dataComparisonPeriod: 'date',
        dataComparisonDate1: '',
        dataComparisonDate2: '',
        dataComponentIndex: 'data-stock',
        DataComponentBtn: 'source',
      },
      comparisonChart: {
        options: chart_options.line_multiple_basic()
      },
      singleLineChart:{
        options: chart_options.line_single(),
        data: {}
      }
    }
  },
  computed: {
    isActiveBtn: function() {
      return function(btnIndex, btnTarget, className) {
        let vm = this;
        return (vm.switchBtn[btnIndex] == btnTarget ? className : '');
      }
    },
    extendChartData: function() {
      return function(options, data) {
        if (Array.isArray(data)) {
          let newSeries = [];
          let series_config = options.series[0];
          for (let i = 0; i < data.length; i++) {
            newSeries.push(_.assignIn({}, series_config, data[i]));
          }
          options.series = newSeries;
        } else if (typeof(data) == 'object') {
          _.assignIn(options.series[0], data);
        } else {
          console.log('Extended data type is illegal. Please use array type or object type. ');
        }
        return options;
      }
    },
    returnDate: function () {
      return function (seconds_before) {
        let vm = this;
        let day = vm.$moment().format('YYYY-MM-DD');
        
        if (seconds_before) {
          let seconds_now = vm.$moment().unix();
          day = vm.$moment((seconds_now - seconds_before) * 1000).format('YYYY-MM-DD');
        }
        return day;
      }
    },
    returnDateRange: function() {
      return function (seconds_before_from, seconds_before_to) {
        let vm = this;
        let from = vm.returnDate(seconds_before_from), to = vm.returnDate(seconds_before_to)
        return [from, to];
      }
    },
    returnDays: function () {
      return function (days, date_end) {
        let vm = this;
        let xArr = [];
        let date2second = vm.$moment().unix();

        if(date_end) {
          date2second = vm.$moment(date_end).unix();
        }
        for (let i = 1; i < (days + 1); i++) {
          xArr.push(vm.$moment((date2second - (days - i) * 86400) * 1000).format('MM/DD'));
        }
        return xArr;
      }
    },
    randData: function () {
      return function(range, length) {
        let data = [];
        for(var i = 0; i < length; i++) {
          data.push(Math.ceil(Math.random() * range))
        }
        return data;
      }
    }
  }, 
  mounted () {
    let vm = this,bar_data = [];
    let yAxis_data = [
      '门磁','烟感','锚具',
      '摄像头','氨气传感器','电梯传感器',
      '可燃气体传感器','人流红外线传感器','杂物红外线传感器',
      '智能井盖','动作传感器','地磁',
      '垃圾传感器','门磁'
    ];
    let test_data = [300,400,312,456,735,123,478,152,671,392,245,520,530,340];

    test_data.forEach((v,i) => {
      var obj = { name: yAxis_data[i], value:v, countText:v * 2 +'个' };
      bar_data.push(obj);
    });

    vm.DataComponent.Options.grid = {
      top: '2%',
      left: '30%',
      bottom: '2%'
    }
    vm.DataComponent.Options.toolbox = {}
    vm.DataComponent.Options.yAxis.data = yAxis_data;
    vm.DataComponent.Options.series[0].data =  bar_data;
    vm.initChart('DataComponent_echarts1', vm.DataComponent.Options);

    let _data_increasing = {
      'P1D': {
        'total': [150, 200, 211, 254, 267, 392, 512, 470, 543, 301, 398, 420, 490, 692, 513, 626, 553, 575, 603, 845, 622, 332, 424, 455],
        'increment': [0, 0, 0, 0, 0, 112, 212,120, 211, 0, 54, 100, 121, 312, 123, 231, 153, 165, 213, 425,212,0,0,22],
        'inventory': [150, 200, 211, 254, 267, 280, 300,350, 332, 301, 344, 320, 369, 380,390, 395, 400, 410, 390, 420, 410,332,424,433]
      },
      'P30D': {
        'total': [4500, 6000, 6432, 5762, 4781, 6023, 4245, 4730, 7243, 7450, 5694, 5533, 4902, 7012, 4323, 6246, 7153, 8565, 9113, 6425, 7312, 5623, 6536, 6525],
        'increment': [3000,4000 ,4322 , 3222, 2111, 3223, 1245,1230, 4211, 4440, 2254, 2333, 1212, 3212, 1233, 2341, 3153, 4465, 5213, 2225,3212,2321,2332,2222],
        'inventory': [1500, 2000, 2110, 2540, 2670, 2800, 3000,3500, 3032, 3010, 3440, 3200, 3690, 3800,3090, 3905, 4000, 4100, 3900, 4200, 4100,3302,4204,4303]
      }
    };
    vm.singleLineChart.data = _data_increasing;
    vm.singleLineChart.options.grid = {
      left: '15%',
      bottom: '20%'
    }
    vm.initChart('chart_grow_line', vm.singleLineChart.options, {data: _data_increasing['P1D'].total});
    //
    vm.comparisonChart.options.series[0].data = vm.randData(8000, 24);
    vm.comparisonChart.options.series[1].data = vm.randData(8000, 24);
    vm.comparisonChart.options.grid = {
      bottom: '20%', left: '15%'
    }
    vm.comparisonChart.options.xAxis.nameGap = 15; 
    vm.switchDataComparison('date');
  },
  methods: {
    initChart: function (chartId, options, _data) {
      let vm = this;
      let chart = vm.$echarts.init(vm.$refs[chartId]);

      chart.setOption(vm.extendChartData(options, _data));
    },
    resizeChart: function (chartId) {
      let vm = this;

      _.forEach(chartId, function (val, key) {
        let chart = vm.$echarts.init(vm.$refs[val]);
        chart.resize();
      });
    },
    DownloadScreenshots: function (ele,Downloadstring,flg) {
      let Dele;
      if(flg){
        Dele = $("." + ele);
        if(flg == 'source'){
          Dele = Dele.eq(0);
        }else{
          Dele = Dele.eq(1);
        }
      }else{
        Dele = $("#" + ele);
      }
      html2canvas(Dele, { 
        onrendered: function(canvas) { 
          $("#" + Downloadstring).attr('href',canvas.toDataURL()); 
          $("#" + Downloadstring).attr('download','Download_echart.png') ; 
          document.getElementById(Downloadstring).click(); 
        } 
      }); 
    },
    DataComponentBtnSw: function (flg) {
      let vm = this;
      if(flg == 'source')
      {
        vm.switchBtn.DataComponentBtn = 'source';
      }
      else
      {
        vm.switchBtn.DataComponentBtn = 'volume';
        vm.initChart('DataComponent_echarts1', vm.DataComponent.Options);
      }
    },
    getDatePicker: function (target, date) {
      let vm = this;
      
      if (vm.switchBtn.dataComparisonPeriod == 'date') {
        vm.switchBtn[target] = vm.$moment(date).format('YYYY-MM-DD');
        // @TODO: axios by date (dataComparisonDate1, dataComparisonDate2)
        vm.comparisonChart.options.series[0].data = vm.randData(8000, 24);
        vm.comparisonChart.options.series[1].data = vm.randData(8000, 24);
      } else if (vm.switchBtn.dataComparisonPeriod == 'interval') {
        function returnDaysNum (startDay, endDay) {
          let mStartDay = vm.$moment(startDay),
              mEndDay = vm.$moment(endDay),
              dayAmount = ((mEndDay.unix() - mStartDay.unix()) / 86400) + 1;
          return dayAmount;
        }
        
        let dateArr = [];
        _.forEach(date, function (d, key) {
          dateArr.push(vm.$moment(d).format('YYYY-MM-DD'));
        });
        vm.switchBtn[target] = dateArr;
        // @TODO: axios by daterange (dataComparisonDate1, dataComparisonDate2)
        let data_0, data_1;
        let newArr = [...vm.switchBtn.dataComparisonDate1, ...vm.switchBtn.dataComparisonDate2];
        newArr.sort();

        let totalDays = returnDaysNum(newArr[0], newArr[newArr.length - 1]);
        let target1 = {
          leng1: returnDaysNum(vm.switchBtn.dataComparisonDate1[0], vm.switchBtn.dataComparisonDate1[1]),
          leng2: Math.abs(returnDaysNum(vm.switchBtn.dataComparisonDate1[0], newArr[0]) - 1)
        };
        let target2 = {
          leng1: returnDaysNum(vm.switchBtn.dataComparisonDate2[0], vm.switchBtn.dataComparisonDate2[1]),
          leng2: Math.abs(returnDaysNum(vm.switchBtn.dataComparisonDate2[0], newArr[0]) - 1)
        };
        data_0 = vm.randData(8000, target1.leng1);
        data_1 = vm.randData(8000, target2.leng1);
        for (let i=0; i<target1.leng2; i++) {
          data_0.unshift(null);
        }
        for (let i=0; i<target2.leng2; i++) {
          data_1.unshift(null);
        }
        vm.comparisonChart.options.xAxis.data = vm.returnDays(totalDays, newArr[newArr.length - 1]);
        vm.comparisonChart.options.series[0].data = data_0;
        vm.comparisonChart.options.series[1].data = data_1;
      }
      vm.initChart('chart-data-comparison', vm.comparisonChart.options);
    },
    switchDataGrowing: function (flg) {
      let vm = this;
      switch(flg) {         
        case 'P1D':
          vm.singleLineChart.options.xAxis.name = '时';
          vm.initChart('chart_grow_line', vm.singleLineChart.options, {data: vm.singleLineChart.data['P1D'][vm.switchBtn.dataIncrementType]});
          vm.switchBtn.dataIncrementPeriod = 'P1D';
          break;
        case 'P30D':
          vm.singleLineChart.options.xAxis.name = '日';
          vm.initChart('chart_grow_line', vm.singleLineChart.options, {data: vm.singleLineChart.data['P30D'][vm.switchBtn.dataIncrementType]});
          vm.switchBtn.dataIncrementPeriod = 'P30D';
          break;
      }
    },
    switchDataComparison: function(flg) {
      let vm = this;
      let data_0, data_1;
    
      switch (flg) {
        case 'date':
          vm.comparisonChart.options.xAxis.data = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
          vm.comparisonChart.options.xAxis.name = '时';
          vm.comparisonChart.options.tooltip.formatter = '时间: {b}<br>数据: {c} KB';
          data_0 = vm.randData(8000, 24);
          data_1 = vm.randData(8000, 24);
          vm.comparisonChart.options.series[0].data = data_0;
          vm.comparisonChart.options.series[1].data = data_1;
          vm.initChart('chart-data-comparison', vm.comparisonChart.options);
          vm.switchBtn.dataComparisonPeriod = flg;
          vm.switchBtn.dataComparisonDate1 = vm.returnDate(null);
          vm.switchBtn.dataComparisonDate2 = vm.returnDate(null);
          break;
        case 'interval':
          vm.comparisonChart.options.xAxis.data = vm.returnDays(31, null);
          vm.comparisonChart.options.xAxis.name = '日';
          vm.comparisonChart.options.tooltip.formatter= '日期: {b}<br>数据: {c} KB';
          data_0 = vm.randData(8000, 31);
          data_1 = vm.randData(8000, 31);
          vm.comparisonChart.options.series[0].data = data_0;
          vm.comparisonChart.options.series[1].data = data_1;
          vm.initChart('chart-data-comparison', vm.comparisonChart.options);
          vm.switchBtn.dataComparisonPeriod = flg;
          vm.switchBtn.dataComparisonDate1 = vm.returnDateRange(604800, null);
          vm.switchBtn.dataComparisonDate2 = vm.returnDateRange(604800, null);
          break;
      };
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.chart-nav {
  .chart-title {
    float: left;
    font-size: 24px;
    font-size: 2em;
    margin-left: 42px;
    margin-left: 3.5rem;
    color: #333333;
  }
}
.chart-container {
  position: relative;
  .chart-content {
    height: 100%;
    width: 100%;
    position: relative;
    text-align: center;

    footer {
      position: absolute;
      bottom: 2rem;
      right: 3rem;
      margin-top: 1rem;
      font-size: 1.5rem;
      color: #868686;
    }
    .main-icon {
      margin-top: 5.8rem;

      .icomoon-cloud {
        color: $azure;
        font-size: 7.8rem;
      }
    }
    .data-amount {
      :nth-child(1) {
        font-size: 12rem;
        color:	$azure;
      }
      :nth-child(3) {
        font-size: 64px;
        font-size: 5.3333rem;
        line-height: 60px;
        line-height: 5rem;
        color: $normalGray;
      }
    }
  }
}
#chart-jietu {
  height: 100%;
  background: #fff;
}

// DataComponent roll div style
#_display {
  z-index: 11111;
}
#Component_chart {
  position: relative;
  background: #fff;
  z-index: 1;
}
.DataComponent_roll {
  position: absolute;
  width: 90%;
  top: 12%;
  left: 5%;
  height: 68%;
  margin: 0 auto;
  margin-top: 2rem;
  background: #fff;
  z-index: 1;
}
.DataComponent_roll .DataComponent_roll_lichildren li {
  list-style: none;
  padding: .65rem 0;
}
.DataComponent_roll li .back_gradient {
  background: url('~@/../static/img/backgroundBar.svg') no-repeat;
  color:#fff;
}
.DataComponent_roll li span {
  font-size:1.6rem;
  line-height: 32px;
}
.DataComponent_roll li ._left {
  padding-left: 3rem;
}
.DataComponent_roll li ._center {
  text-align: center
}
.DataComponent_roll li ._right {
  text-align: right;
  padding-right: 3rem;
}
.comparison_date {
  width: 90%;
  height: 4rem;
  position: absolute;
  bottom: 4rem;
}
.input-orange .ivu-input:hover {
    border-color:#ffc86b;
}
.input-orange .ivu-input:focus {
    border-color: #ffc86b;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(255,200,107, 0.2);
    box-shadow: 0 0 0 2px rgba(255,200,107, 0.2);
}
.input-orange .ivu-input {
    border-color: #ffc86b;
}
.chart-container .footer-like {
  background-color: transparent;
  position: absolute;
  width: 4rem;
  height: 4rem;
  right: 3rem;
  bottom: 1.5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  background: url('~@/../static/img/download.svg') no-repeat;
}
.chart-container .background {
  background: #FFF;
}
@media (max-width: 1440px) { 
  .scroll-block .lg_1 {
    display: block;
    width: 0%;
  }
  .scroll-block .lg_24 {
    display: block;
    width: 90%;
    margin: 0 auto;
  }
}
</style>