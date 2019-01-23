<template>
<table class="simple-table">
  <thead>
    <tr>
      <th v-for="(item, key) in renderTableHead(newTableType)">{{ item.name }}<span v-if="item.can_sort === 1" class="icon sorted ic-arrow-up">&nbsp;</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, key, idx) in newListData">
      <td v-for="(elem, ekey, eidx) in item">
        <span v-if="ekey === 'position'" :value="elem"><img class="icon" src="~@/../static/img/ic-location.svg"></span>
        <span v-else-if="ekey === 'type'">{{ sensorType2Name(elem) }}</span>
        <span v-else-if="ekey === 'options'">
          <i v-if="elem['info'] === true" class="icon icomoon-ic-info"></i>
          <i v-if="elem['edit'] === true" class="icon icomoon-ic-edit"></i>
          <i v-if="elem['remove'] === true" class="icon icomoon-ic-remove"></i>
          <Tooltip class="tooltip-orange" content="数据分析" placement="bottom">
            <i v-if="elem['analysis'] === true" @click="triggerEvent('analysis', item.type)" class="icon icomoon-ic-pie-chart"></i>
          </Tooltip>
          <router-link :to="returnPath()">
            <Tooltip class="tooltip-purple" content="历史数据" placement="bottom">
              <i v-if="elem['history'] === true" @click="triggerEvent('singleHistoryLog', item.type)" class="icon icomoon-ic-history-log"></i>
            </Tooltip>
          </router-link>
        </span>
        <span v-else>{{ elem }}</span>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
  import deivce_functions from '@/assets/js/utility.js';
  export default {
    data() {
      return {
        newTableType: this.tableType,
        newListData: this.listData
      }
    },
    props: ['listData', 'tableType', 'optionCurr'],
    mounted () {},
    watch: {
      tableType: function (val) {
        this.newTableType = val;
      },
      listData: function (val) {
        this.newListData = val;
      }
    },
    methods: {
      DEFAULT_INFO: function (info, idx) {
        return {
          id: parseInt(idx) + 1,
          raw_data: info.raw_data,
          status: info.status,
          battery: info.battery,
          record_date: info.record_date,
          upload_cnt: info.upload_cnt
        };
      },
      triggerEvent: function (event, target_type) {
        let vm = this;

        switch (event) {
          case 'singleHistoryLog':
            vm.newListData = {};
            vm.newTableType = target_type + 'Log';

            let _hdata = [
              {raw_data: '00155800024027', status: '--', battery: '56', record_date: '2018/01/09 16:57:02', upload_cnt: 102},
              {raw_data: '00155800024027', status: '--', battery: '57', record_date: '2018/01/09 15:57:02', upload_cnt: 101},
              {raw_data: '00155800024027', status: '--', battery: '58', record_date: '2018/01/09 14:57:02', upload_cnt: 100}
            ];
            _.forEach(_hdata, function (val, key) {
              let dev_info = vm.DEFAULT_INFO(val, key);
              vm.$set(vm.newListData, key, dev_info);
            });
            vm.$emit('setDeviceInfo', {type: target_type, name: '双阳一村6号', eui: '(00:15:58:00:02:40:27)'});
            break;
        }
      }
    },
    computed: {
      renderTableHead: function () {
        return function (target) {
          if(target == 'fire') {
            return [{name:'设备编号', can_sort:0}, {name:'名称', can_sort:1}, {name:'设备位置', can_sort:0}, {name:'维护人员名称', can_sort:0}, {name:'最近检修日', can_sort:0}, {name:'维保排程', can_sort:0}, {name:'维保状态', can_sort:0}];
          }
          if(target == 'alarmInfo') {
            return [{name:'最新日期', can_sort:1}, {name:'地點設定', can_sort:0}, {name:'设备位置', can_sort:0}, {name:'维护人员名称', can_sort:0}, {name:'告警條件名稱', can_sort:0}, {name:'所有條件狀態', can_sort:0}, {name:'操作', can_sort:0}];
          }
          if(target == 'defaultDeviceInfo') {
            return [{name:'#', can_sort:0}, {name:'设备编号', can_sort:1}, {name:'名称', can_sort:1}, {name:'类型', can_sort:1}, {name:'所属用户', can_sort:1}, {name:'所属用户组', can_sort:1}, {name:'最后更新时间', can_sort:1}, {name:'终端位置', can_sort:0}, {name:'数据查看', can_sort:0}];
          }
          if(target == 'ruleEngine') {
            return [{name:'规则名称', can_sort:1}, {name:'设备位置', can_sort:0}, {name:'最新修改时间', can_sort:1}, {name:'被分派人员', can_sort:1}, {name:'优先级', can_sort:1}, {name:'备注', can_sort:0}, {name:'操作', can_sort:0}];
          }
          if(target.indexOf('Log') > -1) {
            return [{name:'#', can_sort:0}, {name:'原始数据', can_sort:0}, {name:'終端状态', can_sort:0}, {name:'电量（%）', can_sort:0}, {name:'记录时间', can_sort:1}, {name:'上行计数', can_sort:0}];
          }
        }
      },
      returnPath: function () {
        return function () {
          let vm = this;
          if(vm.optionCurr === 'deviceList') {
            return '/insight/dataIncrement/deviceInfo/historyLog';
          }
          if(vm.optionCurr === 'deviceInfo') {
            return '/insight/dataIncrement/deviceInfo/deivceList/categoryLog';
          }
          return '';
        }
      },
      sensorType2Name: function () {
        return function (type) {
          return deivce_functions().type2Name(type);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .simple-table {
    width: 100%;
    text-align: center;

    thead tr {
      border-radius: 2px;
      background-color: #fefefe;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24);

      th {
        font-size: 1.5rem;
        padding: 1rem 0.5rem;
      }
    }
    tbody tr {
      td {
        padding: 1.1rem 0.5rem;

        i {
          font-size: 20px;
          padding: 0 0.7rem;

          &.icomoon-ic-pie-chart {
            color: #ff9931;
          }
          &.icomoon-ic-history-log {
            color: #806dff;
          }
        }
      }
    }
  }
</style>