<template>
  <div class="main-content">
    <nav :class="'option-bar nav-to-' + optionBarActive">
      <span v-for="(option, idx) in navOptions" :class="'option-btn pointer active-' + idx" @click="setActive(idx)">{{ option[idx] }}</span>
      <div class="toolbox float-right">
        <search-bar :maintainStatus="true"></search-bar>
        <div>
          <label>区域：</label>
          <Form :model="formItem">
            <FormItem>
              <Select v-model="formItem.selectBuild">
                <Option value="0"></Option>
              </Select>
              <Select v-model="formItem.selectFloor">
                <Option value="0"></Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div><button class="normal"><i class="icomoon-ic-menu"></i>所有列表</button></div>
      </div>
    </nav>
    <div v-if="showCardBox" class="card-box">
      <div class="card pointer" v-for="item in deviceInfo" @click="fetchTable(item)">
        <div :class="'ic-sensor-' + item.key"></div>
        <div class="sensor-info"><p>{{ item.name }}</p><div class="emphasis">{{ item.value }}</div><span>个</span></div>
      </div>
    </div>
    <div v-if="showDevTable" class="info-table">
      <header>
        <div class="icon" @click="switchElements(['showCardBox'], ['showDevTable'])">返回</div>
        <div :class="'ic-sensor-' + tableIndex + '-sm'">{{ key2name(tableIndex, 'deviceInfo') }}</div>
        <div class="amount">总数：<span>{{ returnLength('listData') }}</span></div>
      </header>
      <device-table :listData="listData" tableType="fire"></device-table>
      <footer>
        <Page :total="returnLength('listData')"></Page>
      </footer>
    </div>
  </div>
</template>

<script>
  import searchBar from '@/components/common/search-bar'
  import deviceTable from '@/components/common/table-device-info'
  export default {
    name: 'fire',
    components: {
      searchBar,
      deviceTable
    },
    data() {
      return {
        navOptions: [{0: '地图'}, {1: '设备资源'}, {2: '风险预测'}],
        deviceInfo: [
          {key: 'extinguisher', name: '灭火器', value: 4, status: 1}, {key: 'light', name: '照明灯', value: 10, status: 0}, {key: 'firebell', name: '火警钟', value: 8, status: 0},
          {key: 'hydrant', name: '室内消火栓', value: 100, status: 1}, {key: 'indicator', name: '疏散指示灯', value: 200, status: 0}, {key: 'transformer', name: '变电箱', value: 0, status: 0},
          {key: 'exit', name: '逃生口', value: 40, status: 1}, {key: 'equipmentbox', name: '紧急应变器材箱', value: 10, status: 5}, {key: 'flowindicator', name: '喷淋水流指示器', value: 10, status: 0}
        ],
        listData: {},
        tableIndex: '',
        showCardBox: true,
        showDevTable: false,
        optionBarActive: 1,
        formItem: {
          selectBuild: '',
          selectFloor: ''
        }
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
    mounted () {},
    methods: {
      DEV_INFO: function (info, idx) {
        return {
          id: parseInt(idx) + 1,
          device_name: info.name,
          position: '(' + info.lat + ', ' + info.lon + ')',
          person: info.person,
          checked_date: info.checked_date,
          maintain_date: info.maintain_date,
          checked_status: info.checked_status
        };
      },
      setActive: function (target) {
        this.optionBarActive = target;
      },
      fetchTable: function (item) {
        let vm = this;

        vm.switchElements(['showDevTable'], ['showCardBox']);
        vm.tableIndex = item.key;
        // get _data by item.key
        let _data = [
          {name: '二楼走道', lat: 0, lon: 0, person: '张三', checked_date: '2018.2.20', maintain_date: '2018.3.20', checked_status: '通过'},
          {name: '一楼走道', lat: 0, lon: 0, person: '张三', checked_date: '2018.2.20', maintain_date: '2018.3.20', checked_status: '通过'}
        ];
        _.forEach(_data, function (val, key) {
          let dev_info = vm.DEV_INFO(val, key);
          vm.$set(vm.listData, key, dev_info);
        });
      },
      switchElements: function(openItem, closeItem) {
        let vm = this;
        _.forEach(openItem, function (val, key) {
          vm[val] = true;
        });
        _.forEach(closeItem, function (val, key) {
          vm[val] = false;
        });
      }
    }
  }
</script>
