<template>
  <div class="main-content">
    <nav :class="'option-bar nav-to-' + optionBarActive">
      <div class="toolbox float-right">
        <search-bar class="seacrhbar" tableType="ruleEngine"></search-bar>
        <div class="engineBtn">
          <Button class="normal" @click="openModal('add')" type="primary"><i class="icomoon-ic-circle-add"></i><span>新增</span></Button>
        </div>
      </div>
    </nav>
    <div class="info-table">
      <device-table :listData="listData" tableType="ruleEngine"></device-table>
      <footer>
        <Page class="blue-footer" :total="returnLength('listData')"></Page>
      </footer>
    </div>
    <div  v-if="editModal.show" class="ivu-modal-mask Alarm_popUP" >
        <div class="ivu-modal popUP_H">
          <div class="ivu-modal-header">
            <div class="ivu-modal-header-inner popUP_Title">新增规则引擎</div>
          </div>
          <div class="ivu-modal-body">
            <div class="popUP_name">
              <span>规则名称</span>
              <Input placeholder="请命名规则名称…"></Input>
            </div>
            <div class="popUP_name_content" scrollable="true">
              <div class="content_scroll">
                <!-- v-for -->
                <div class="content_if">
                  <h3>告警條件1</h3>
                    <Row>
                        <Col span="2"><span>传感器类型:</span></Col>
                        <Col span="5">
                          <Select  placeholder="类型选择">
                          </Select>
                        </Col>
                        <Col class="right" span="2"><span>終端EUI:</span></Col>
                        <Col span="5"><Input class="if_input" placeholder="请输入EUI..."></Input></Col>
                        <Col class="right" span="2"> <span>条件设定:</span></Col>
                        <Col span="3">
                          <Select placeholder="设定选项" placement="bottom">
                          </Select>
                        </Col>
                        <Col span="2">
                          <Select placeholder="=" placement="bottom">
                          </Select>  
                        </Col>
                        <Col span="2"><Input placeholder="数值输入…"></Input></Col>
						            <Col span="1"></Col>
                    </Row>
                </div>

              </div>
              <Row>
                <Col span="24" style="text-align: center;"><Button class="Btn" type="primary">＋添加告警条件</Button></Col>
              </Row>
            </div>
            <div class="popUP_name">
              <span>备注</span>
            </div>
            <div class="textarea">
              <Input  type="textarea" placeholder="请输入详细的内容"></Input>
            </div>
            <div style="width:100%;padding: 3rem 0px 4rem 2rem;">
              <Col span="2" style="line-height:3rem;font-size: 14px;color: #6ba0ff;font-weight: bolder;"><span>添加地址:</span></Col>
              <Col span="8"><input id="Bvalue" type="text"></Col>
              <Col span="12"></Col>
            </div>
            <div class="map_div">
              <iframe id="iframe_baidu" src="~@/html/baiduMap.html"></iframe>
            </div>
            <div class="popUP_name">
              <span>提醒设置</span>
            </div>
            <div class="Remind_set">
              <Row>
                <Col span="1"><span>日期:</span></Col>
                <Col span="4"><DatePicker type="date" :start-date="new Date()" placeholder="2018-05-05"></DatePicker></Col>
                <Col span="1"><span>-</span></Col>
                <Col span="4"><DatePicker type="date" :start-date="new Date()" placeholder="2018-05-05"></DatePicker></Col>

                <Col span="2"><span>重复日:</span></Col>
                <Col span="5"><Select  placeholder="周一,周二" placement="bottom"></Select></Col>
                <Col span="2"><span>时间编辑:</span></Col>
                <Col span="5"><TimePicker format="HH:mm" type="timerange" placement="bottom-end" placeholder="00:00-00:00"></TimePicker></Col>
              </Row>
            </div>
            <div class="popUP_name">
              <span>被分派人员</span>
            </div>
            <div class="popUP_list">
              <Row>
                <Col span="3"><span>被分派人员:</span></Col>
                <Col span="6"><Select placeholder="类型选择" placement="bottom"></Select></Col>
                <Col span="3" class="center"><span>通知方式:</span></Col>
                <Col span="6"><Select placeholder="一般" placement="bottom"></Select></Col>
                <Col span="8"><span></span></Col>
              </Row>
            </div>
            <div class="popUP_name">
              <span>其他设置</span>
            </div>
            <div class="popUP_list">
              <Row>
                <Col span="2"><span>优先级:</span></Col>
                <Col span="6"><Select placeholder="一般" placement="bottom"></Select></Col>
                <Col span="3" class="center"><span>还原设置:</span></Col>
                <Col span="4"><button class="restore">点击还原所有设置</button></Col>
                <Col span="8"><span></span></Col>
              </Row>
            </div>
          </div>
          <div class="ivu-modal-footer">
            <button @click="editModal.show = false" type="button" class="ivu-btn ivu-btn-text ivu-btn-large">
              <span>取消</span>
            </button>
            <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large">
             <span>保存</span>
            </button>
          </div>
        </div>
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
        editForm: _.cloneDeep(dft_editForm),
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
          name: info.name,
          position: '(' + info.lat + ', ' + info.lon + ')',
          update_date: info.update_date,
          person: info.person,
          priority: info.priority,
          status: info.status,
          options: {
            remove: true,
            info: true,
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
        let _data = [{name: '縱火偵測', lat: 1, lon: 1, person: '张三（人資部：510-50133）', priority: '高', update_date: '2018/05/18', status: '北門塑膠成型場'}];
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
<style lang="scss">
.seacrhbar {
 .ivu-input {
   border: 1px solid #6ba0ff ;
  }
 .ivu-btn {
   border: none;
   background-color: #6ba0ff !important;
 }
 .ivu-input {
   width: 29.416rem;
   height: 2.75rem;
 }
}
.engineBtn {
  span {
    letter-spacing: 8px;
  }
  .normal {
    height: 2.5rem;
    width: 9rem;
    background-color: #6ba0ff !important;
    border: none;
  }
}
.Alarm_popUP {
  .popUP_H {
    width: 45.8vw;
    height: auto;
    font-size: 14px;
    background: #f8f8f8;
    border-radius: 6px;
    .ivu-modal-header {
      border-bottom: none;
    }
    .ivu-modal-body {
      height: 74vh;
      width: 100%;
      overflow-y: scroll;
    }
	  .ivu-modal-body::-webkit-scrollbar {
	    width: 0px;
    }
    .ivu-modal-footer {
      border-top: none;
      text-align: center;
      button {
        width: 9.5rem;
      }
      .ivu-btn-text {
        box-shadow:0 0 4px 0px rgba(0, 0, 0, 0.38);
        background: #fefefe;
        color: #333;
      }
      .ivu-btn-text:hover {
        border: 1px solid rgba(0, 0, 0, 0.2);
        color: #333;
      }
      .ivu-btn-primary {
        box-shadow: 0 0 3px 0px #6ba0ff;
        background: #6ba0ff;
        margin-left: 9rem;
      }
    }
    .popUP_name {
      padding: 0 0 1rem 2rem;
      border-bottom: 2px solid #6ba0ff;
      font-size: 14px;
      color: #6ba0ff;
      font-weight: bolder;
      input {
        float: right;
        width: 35%;
      }
      .ivu-input-wrapper {
        width: 92%;
      }
    }
    .popUP_name_content {
      padding: 1.4rem 0 2rem 2rem;
      .content_scroll {
        width: 100%;
        height: 10rem;
        overflow-y: scroll;
      }
      .content_scroll::-webkit-scrollbar {
        width: 0px;
      }
      .content_if {
        width: 100%;
        height: 6rem;
        span {
          line-height: 3rem
        }
        h3{
          padding-bottom: 1rem;
          font-size: 12px;
          color: #5e5e5e;
          font-family: initial;
          font-weight: bolder;
          height: initial;
        }
        .right {
          text-align: right;
          padding-right: 1rem;
        }
      }
      .Btn {
        background: #6ba0ff;
      }
    }
    .textarea {
      padding-top: 2rem;
      textarea {
        resize: none;
        border: 1px solid #6ba0ff;
      }
    }
    .map_div {
      width: 100%;
      height: auto;
    }
    .Remind_set {
      padding: 2rem 0 2rem 2rem;
      text-align: center;
      span {
        line-height: 3rem;
      }
    }
    .popUP_list {
      padding: 2rem 0 2rem 2rem;
      text-align: left;
      span {
        line-height: 3rem;
      }
      .center {
        text-align: center;
      }
      .restore {
        width: 14rem;
        border-radius: .2rem;
        height: 3rem;
        color: #fff;
        background: #6ba0ff;
      }
    }
    input {
      border: 1px solid #6ba0ff;
    }
    .ivu-select-selection {
      border: 1px solid #6ba0ff;
    }
  }
  .popUP_Title {
    padding: 0 0 3rem 0;
    font-size: 18px;
  }
}
</style>

