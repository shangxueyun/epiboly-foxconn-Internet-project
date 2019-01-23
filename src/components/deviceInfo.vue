<template>
  <div class="main-content">
    <nav class="option-bar" v-show="showNavOptions" :class="'nav-to-' + optionBarActive">
      <span v-for="(option, idx) in navOptions" class="option-btn pointer" :class="_.keys(option)[0]" @click="switchElements(_.keys(option)[0], 'buttonGroup')">{{ _.values(option)[0] }}</span>
      <span class="float-right"><search-bar></search-bar></span>
    </nav>
    <VuePerfectScrollbar style="flex: 1 1 auto; ">
      <div v-show="buttonGroup.deviceInfo" class="card-box scroll-block">
        <div class="card" v-for="item in deviceInfo">
          <div :class="'ic-sensor-' + item.key"></div>
          <div class="sensor-info">
            <p>{{ item.name }}</p>
            <div class="emphasis">{{ item.value }}</div><span>个</span>
          </div>
          <div class="btn-group">
            <Button class="orange" type="info"><i class="icomoon-ic-analysis-graph"></i>分析图</Button>
            <Button class="purple" type="info" @click="navToDeviceList(item.key)">
              <router-link to="/insight/dataIncrement/deviceInfo/deivceList">
                <i class="icomoon-ic-list"></i>列表
              </router-link>
            </Button>
          </div>
        </div>
      </div>
      <router-link to="/insight/dataIncrement/deviceInfo">
        <div v-show="showBackBtn" @click="redirectTo(optionBarActive)" class="backto"><span class="pointer"><i class="icon icomoon-ic-backto"></i>返回</span></div>
      </router-link>
      <div v-show="buttonGroup.deviceList" class="info-table">
        <header>
          <div v-show="showSensorType" class="single-sensor-info">
            <span :class="'ic-sensor-' + tableInfo.sensorType"></span>
            <span class="sensor-type">{{ tableInfo.sensorTypeCn }}</span>
            <span>{{ tableInfo.sensorName }} {{ tableInfo.sensorEui }}</span>
          </div>
          <div class="amount">总数：<span>{{ returnLength('listData') }}</span></div>
        </header>
        <device-table :listData="listData" tableType="defaultDeviceInfo" :optionCurr="optionBarActive" @setDeviceInfo="setDInfo"></device-table>
        <footer>
          <Page class="blue-footer" :total="returnLength('listData')"></Page>
      </footer>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import deviceTable from '@/components/common/table-device-info';
  import searchBar from '@/components/common/search-bar';
  import deivce_functions from '@/assets/js/utility.js';
  export default {
    name: 'deviceInfo',
    components: {
      VuePerfectScrollbar,
      deviceTable,
      searchBar
    },
    data() {
      return {
        navOptions: [{'deviceInfo': '终端分类'}, {'deviceList': '所有列表'}],
        deviceInfo: [
          {key: 'anchor', name: '锚点', value: 40, status: 1}, {key: 'infrared', name: '红外线传感器', value: 100, status: 0}, {key: 'door', name: '门磁传感器', value: 800, status: 0},
          {key: 'wateroffer', name: '二次供水', value: 100, status: 1}, {key: 'noise', name: '噪声传感器', value: 200, status: 0}, {key: 'manhole', name: '智能井盖', value: 0, status: 0},
          {key: 'nh3', name: '氨气传感器', value: 40, status: 1}, {key: 'smoke', name: '烟感传感器', value: 10, status: 5}, {key: 'parking', name: '停车场（地磁）', value: 10, status: 0},
          {key: 'hydrant', name: '消防栓', value: 30, status: 1}, {key: 'movement', name: '动作传感器', value: 10, status: 5}, {key: 'waterpressure', name: '压力传感器（水压）', value: 10, status: 0}
        ],
        listData: {},
        buttonGroup: {
          'deviceInfo': true,
          'deviceList': false
        },
        tableInfo: {
          sensorType: 'default',
          sensorTypeCn: '',
          sensorName: '',
          sensorEui: ''
        },
        optionBarActive: 'deviceInfo',
        showBackBtn: false,
        showSensorType: false,
        showNavOptions: true
      }
    },
    computed: {
      key2name: function() {
        return function (tkey, resource) {
          let target = null;
          _.forEach(this[resource], function(val, idx) {
            if(tkey == val.key) {
              target = val.name;
              return false;
            }
          });
          return target;
        }
      },
      returnLength: function() {
        return function(resource) {
          if (this[resource] && typeof(this[resource]) == 'object') {
            return _.size(this[resource]);
          }
          return '--'
        }
      }
    },
    mounted () {
      let vm = this;

      vm.fetchTable();
    },
    methods: {
      DEV_INFO: function (info, idx) {
        return {
          id: parseInt(idx) + 1,
          eui: info.eui,
          device_name: info.name,
          type: info.type,
          person: info.person,
          group: info.group,
          update_time: info.update_time,
          position: '(' + info.lat + ', ' + info.lon + ')',
          options: { 'analysis': true, 'history': true }
        };
      },
      setActiveBtn: function (target) {
        this.optionBarActive = target;
      },
      switchElements: function (btnIdx, btnTarget) {
        let vm = this;
        
        _.forEach(_.keys(vm[btnTarget]), function (val, key) {
          if (val == btnIdx) {
            vm[btnTarget][val] = true;
          } else {
            vm[btnTarget][val] = false;
          }
        });
        vm.setActiveBtn(btnIdx);
      },
      redirectTo: function (event) {
        let vm = this;

        vm.tableInfo.sensorName = '';
        vm.tableInfo.sensorEui = '';
        switch(event) {
          case 'deviceInfo':
            vm.getEvent('back2DeviceInfo', null);
            break;
          case 'deviceList':
            vm.getEvent('back2DeviceList', null);
            break;
        }
      },
      getEvent: function (event, sensor_type) {
        let vm = this;
        
        vm.listData = {};
        switch(event) {
          case 'back2DeviceInfo':
            vm.showBackBtn = false;
            vm.showSensorType = false;
            vm.showNavOptions = true;
            vm.fetchTable();
            vm.switchElements('deviceInfo', 'buttonGroup');
            break;
          case 'back2DeviceList':
            vm.showBackBtn = false;
            vm.showSensorType = false;
            vm.showNavOptions = true;
            vm.fetchTable();
            break;
          case 'history':
            vm.showBackBtn = true;
            vm.showSensorType = true;
            vm.showNavOptions = false;
            vm.tableInfo.sensorType = sensor_type;
            vm.tableInfo.sensorTypeCn = deivce_functions().type2Name(sensor_type);
            // @TODO: should NOT change _data 'type' and 'name' attr. by sensor_type
            let _data = [
              {eui: '00:15:58:00:02:40:27', name: 'SMG-' + sensor_type + '-0880', type: sensor_type, person: '控四（1）居委会管理员', group: '控四（1）居委会', update_time: '2018/01/09 16:57:02', lat: 0, lon: 0 },
              {eui: '00:15:58:00:02:40:27', name: 'SMG-' + sensor_type + '-08A5', type: sensor_type, person: '控四（1）居委会管理员', group: '控四（1）居委会', update_time: '2018/01/09 16:57:02', lat: 0, lon: 0 }
            ];
            _.forEach(_data, function (val, key) {
              let dev_info = vm.DEV_INFO(val, key);
              vm.$set(vm.listData, key, dev_info);
            });
            vm.$emit('returnSensorType', sensor_type);
            break;
        }
      },
      setDInfo: function (data) {
        // @TODO: this function should be merged to getEvent('history')
        let vm = this;
        vm.showBackBtn = true;
        vm.showSensorType = true;
        vm.showNavOptions = false;
        vm.tableInfo.sensorType = data.type;
        vm.tableInfo.sensorTypeCn = deivce_functions().type2Name(data.type);
        vm.tableInfo.sensorName = data.name;
        vm.tableInfo.sensorEui = data.eui;
      },
      fetchTable: function () {
        let vm = this;

        let _data = [
          {eui: '00:15:58:00:02:40:27', name: 'SMG-Anchor-0880', type: 'door', person: '控四（1）居委会管理员', group: '控四（1）居委会', update_time: '2018/01/09 16:57:02', lat: 0, lon: 0 },
          {eui: '00:15:58:00:02:40:27', name: 'SMG-Anchor-08A5', type: 'smoke2', person: '控四（1）居委会管理员', group: '控四（1）居委会', update_time: '2018/01/09 16:57:02', lat: 0, lon: 0 }
        ];
        _.forEach(_data, function (val, key) {
          let dev_info = vm.DEV_INFO(val, key);
          vm.$set(vm.listData, key, dev_info);
        });
      },
      navToDeviceList: function (sensor_type) {
        let vm = this;
        vm.buttonGroup.deviceInfo = false;
        vm.buttonGroup.deviceList = true;
        vm.getEvent('history', sensor_type); // @TODO: sensor.type
      }
    }
  }
</script>
