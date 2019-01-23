<template>
  <div class="main-content">
    <nav :class="'option-bar nav-to-' + optionBarActive">
      <span v-for="(option, idx) in navOptions" :class="'option-btn pointer active-' + idx" @click="setActive(idx)">{{ option[idx] }}</span>
      <div class="toolbox float-right">
        <search-bar></search-bar>
        <div><button class="normal" @click="openModal('add')">新增告警條件</button></div>
      </div>
    </nav>
    <div class="info-table">
      <device-table :listData="listData" tableType="alarmInfo"></device-table>
      <footer>
        <Page class="blue-footer" :total="returnLength('listData')"></Page>
      </footer>
    </div>
    <Modal v-model="editModal.show" class-name="edit-modal" :width="editModal.width" :mask-closable="false" @on-cancel="handleReset('editForm')">
      <p slot="header">{{ editModal.action }}自定义告警</p>
      <Form ref="editForm" :model="editForm" label-position="left" :label-width="editModal.label_width">
        <FormItem 
            label="告警名稱：" 
            prop="name" 
            class="outside-form-item"
            label-for="ruleName"
            :rules="{ required: true, message: '告警名称不能为空', trigger: 'blur' }" >
          <Input v-model="editForm.name" element-id="ruleName" placeholder="请为此告警命名…"></Input>
        </FormItem>
        <section class="form-section"
            v-for="(item, index) in editForm.rule_items"
            v-if="item.status"
            :key="'rule_' + index">
          <div class="section-title">告警条件{{ getIdx(editForm.rule_items, index) }}<i class="icomoon-ic-trash pointer" @click="handleDelRule('rule_items', index)"></i></div>
          <FormItem 
              label="传感器类型：" 
              :label-for="'ruleDevType_' + index"
              :prop="'rule_items.' + index + '.dev_type'"
              :rules="{ required: true, message: '传感器类型不能为空', trigger: 'change' }">
            <Select v-model="item.dev_type" clearable :id="'ruleDevType_' + index" placeholder="传感器类型">
              <Option v-for="type in typeList" :value="type.id" :key="type.id">{{ type.label }}</Option>
            </Select>
          </FormItem>
          <FormItem 
              label="终端EUI：" 
              required
              :label-for="'ruleDevId_' + index"
              :prop="'rule_items.' + index + '.dev_id'"
              :class="{ 'data-exist': isDevExist(item.dev_id, index) }"
              :rules="{ validator: checkDevId, trigger: 'blur' }">
            <Input v-model="item.dev_id" :element-id="'ruleDevId_' + index" placeholder="终端EUI"></Input>
          </FormItem>
          <FormItem 
              label="条件设定：" 
               class="condition-form-item"
              :label-for="'ruleCondType_' + index"
              :prop="'rule_items.' + index + '.cond_value'"
              :rules="{ validator: checkCond, trigger: 'blur' }">
            <Select v-model="item.cond_type" :id="'ruleCondType_' + index" placeholder="条件类型">
              <Option v-for="cond in condList" :value="cond.id" :key="cond.id">{{ cond.label }}</Option>
            </Select>
            <Select v-model="item.cond_arith" placeholder=" " required>
              <Option v-for="arith in arithList" :value="arith.id" :key="arith.id">{{ arith.label }}</Option>
            </Select>
            <Input v-model="item.cond_value" placeholder="数值输入" required></Input>
          </FormItem>
        </section>
        <Button type="success" @click="handleAddRule('rule_items')" icon="plus-round">新增告警條件</Button>
        <section class="form-section"
            v-for="(item, index) in editForm.time_items"
            v-if="item.status"
            :key="'reminder_' + index">
          <div class="section-title">提醒设定{{ getIdx(editForm.time_items, index) }}<i class="icomoon-ic-trash pointer" @click="handleDelRule('time_items', index)"></i></div>
        </section>
      </Form>
      <p slot="footer">
        <Button type="ghost" @click="handleReset('editForm')">取消</Button>
        <Button type="primary">储存</Button>
      </p>
    </Modal>
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
      let dft_editForm = {
        name: '',
        rule_items: [{
          index: 1,       // rule index
          status: 1,      // if rule is deleted or not (0: deleted)
          dev_type: '',   // device type
          dev_id: '',     // devie eui
          cond_type: '',  // condition type
          cond_arith: '', // condition arithmetic
          cond_value: '', // condition value
        }],
        time_items: [{
          index: 1,       // reminder index
          status: 1,      // if reminder is deleted or not (0: deleted)
        }]
      };
      return {
        navOptions: [{0: '系统预设告警'}, {1: '自定义告警'}],
        listData: {},
        tableIndex: '',
        optionBarActive: 1,
        typeList: [{ id: 'thermal', label: '温湿度传感器' }],
        condList: [{ id: 'temperature', label: '温度' }, { id: 'humidity', label: '湿度' }],
        arithList: [{ id: 'biger', label: '>' }, { id: 'equal', label: '=' }, { id: 'smaller', label: '<' }],
        editModal: {
          show: false,
          width: 654,
          label_width: 100,
          action: '新增',
          rule_index: 1,
          time_index: 1,
          dft_editForm: dft_editForm
        },
        editForm: _.cloneDeep(dft_editForm)
      }
    },
    computed: {
      getIdx: function() {
        return function(arr, idx) {
          return _.filter(_.take(arr, idx + 1), function(o) { return o.status }).length;
        }
      },
      isDevExist: function() {
        return function(devId, idx) {
          // @TODO. check if device id is existed in our DB
          return /^[a-fA-F\d]{16}$/.test(devId);
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
      vm.fetchTable({key: 'user_predefined_alarm'});
    },
    methods: {
      ALARM_INFO: function (info, idx) {
        return {
          update_date: info.update_date,
          name: info.name,
          position: '(' + info.lat + ', ' + info.lon + ')',
          person: info.person,
          alarm_name: info.alarm_name,
          status: info.status,
          options: {
            edit: true
          }
        };
      },
      setActive: function (target) {
        this.optionBarActive = target;
      },
      fetchTable: function (item) {
        let vm = this;

        vm.tableIndex = item.key;
        // get _data by item.key
        let _data = [{name: '北門塑膠成型場', lat: 1, lon: 1, person: '张三（人資部：510-50133）', alarm_name: '縱火偵測', update_date: '2018/05/18', status: '安全'}];
        _.forEach(_data, function (val, key) {
          let dev_info = vm.ALARM_INFO(val, key);
          vm.$set(vm.listData, key, dev_info);
        });
      },
      openModal: function(action) {
        // set some default value
        if (action == 'add') {
          this.editModal.rule_index = 1;
          this.editModal.time_index = 1;
          this.editForm = _.cloneDeep(this.editModal.dft_editForm);
        } else {
          //@TODO
        }
        this.editModal.show = true;
      },
      checkDevId: function(rule, value, callback) {
        if (!value) {
          return callback(new Error('终端EUI不能为空'));
        } else if (!/^[a-fA-F\d]{16}$/.test(value)) {
          return callback(new Error('必须是16位十六进制数'));
        } else {
          callback();
        }
      },
      checkCond: function(rule, value, callback) {
        if (!value) {
          return callback(new Error('条件数值不能为空'));
        } else {
          let myIdx = rule.field.split('.')[1];
          let myRuleitem = this.editForm.rule_items[myIdx];

          if (!myRuleitem.cond_type) {
            return callback(new Error('条件类型不能为空'));
          } else if (!myRuleitem.cond_arith) {
            return callback(new Error('条件算式不能为空'));
          } else {
            callback();
          }
        }
      },
      handleAddRule: function(target) {
        if (target == 'rule_items') {
          this.editModal.rule_index++;
        } else {
          this.editModal.time_index++;
        }
        this.editForm[target].push(_.cloneDeep(this.editModal.dft_editForm).rule_items[0]);
      },
      handleDelRule: function(target, idx) {
        this.editForm[target][idx].status = 0;
      },
      handleReset: function(name) {
        this.$refs[name].resetFields();
        this.editModal.show = false;
      }
    }
  }
</script>
