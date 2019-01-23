<template>
  <div class="view-box" id="index">
    <nav class="main-nav">
      <div class="logo"></div>
      <div class="menu-control hamburger icon" @click="navToggleExpand"></div>
      <div class="billboard">富数据</div>
      <div class="profile float-right">
        <div @click="showItem('showAccountDetail')" :class="'icon account ' + (showAccountDetail ? 'unfold' : 'fold')"></div>
        <div v-show="showAccountDetail" class="account-detail pointer">
          <div>账户设置</div>
          <div>退出</div>
        </div>
      </div>
      <div class="welcome float-right">您好，<span></span></div>
      <div class="tool-group float-right">
        <div>
          <i class="icon icomoon-ic-alarm-fill"></i>
          <i class="icon icon-text">管理控制台</i>
          <i class="icon icomoon-ic-application"></i>
        </div>
      </div>
    </nav>
    <article class="main-article">
      <aside :class="[menuActive, {navToggleOpen : toggleOpen}]">
        <router-link active-class="menu-active" exact-active-class="menu-link-active" class="menu-btn pointer" to="/index">
          <div @click="setActive('index')">
            <Tooltip content="空间" placement="right" :disabled="!toggleOpen"><i class="icon level-1 icomoon-ic-home"></i>空间</Tooltip>
          </div>
        </router-link>
        <router-link active-class="menu-active" exact-active-class="menu-link-active" class="menu-btn pointer" to="/alarm">
          <div @click="setActive('alarmInfo')" class="has-child">
            <Tooltip content="告警" placement="right" :disabled="!toggleOpen"><i class="icon level-1 icomoon-ic-alarm"></i>告警</Tooltip>
          </div>
        </router-link>
        <router-link exact-active-class="menu-clicked" v-if="menuActive == 'alarmInfo'" v-for="item in menuList.alarmInfo" :key="item.path" :to="'/alarm/' + item.path" class="menu-btn menu-active pointer">
          <Tooltip :content="item.name" placement="right" :disabled="!toggleOpen"><i class="icon level-2"></i>{{ item.name }}</Tooltip>
        </router-link>
        <router-link active-class="menu-active" exact-active-class="menu-link-active" class="menu-btn pointer" to="/insight">
          <div @click="setActive('summary')" class="has-child">
            <Tooltip content="洞察" placement="right" :disabled="!toggleOpen"><i class="icon level-1 icomoon-ic-insight"></i>洞察</Tooltip>
          </div>
        </router-link>
        <router-link exact-active-class="menu-clicked" v-if="menuActive == 'summary'" v-for="item in menuList.insight" :key="item.path" :to="'/insight/' + item.path" class="menu-btn menu-active pointer">
          <Tooltip :content="item.name" placement="right" :class="item.hasChild == 1 ? 'has-child' : ''" :disabled="!toggleOpen"><i class="icon" :class="item.level"></i>{{ item.name }}</Tooltip>
        </router-link>
        <router-link active-class="menu-active" exact-active-class="menu-link-active" class="menu-btn pointer" to="/analysis">
          <div @click="setActive('analysis')" class="has-child">
            <Tooltip content="分析" placement="right" :disabled="!toggleOpen"><i class="icon level-1 icomoon-ic-analysis"></i>分析</Tooltip>
          </div>
        </router-link>
        <router-link exact-active-class="menu-clicked" v-if="menuActive == 'analysis'" v-for="item in menuList.analysis" :key="item.path" :to="'/analysis/' + item.path" class="menu-btn menu-active pointer">
          <Tooltip :content="item.name" placement="right" :class="item.hasChild == 1 ? 'has-child' : ''" :disabled="!toggleOpen"><i class="icon" :class="item.level"></i>{{ item.name }}</Tooltip>
        </router-link>
        <router-link active-class="menu-active" exact-active-class="menu-link-active" class="menu-btn pointer" to="/dataCenter">
          <div @click="setActive('dataCenter')">
            <Tooltip content="数据中心" placement="right" :disabled="!toggleOpen"><i class="icon level-1 icomoon-ic-data-center"></i>数据中心</Tooltip>
          </div>
        </router-link>
      </aside>
      <router-view></router-view>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
     return {
       menuActive: 'index',
       menuList: {
         'alarmInfo': [{ name: '列表信息', path: 'alarmInfo' }, { name: '规则引擎', path: 'ruleEngine' }],
         'insight': [{ name: '总览', path: 'summary', level: 'level-2', hasChild: 0 }, { name: '增量数据', path: 'dataIncrement', level: 'level-2', hasChild: 0 }, { name: '总览', path: 'dataIncrement/dataIncrementOverview', level: 'level-3', hasChild: 0 }, { name: '终端设备', path: 'dataIncrement/deviceInfo', level: 'level-3', hasChild: 0 }],
         'analysis':[{ name: '分析报表', path: 'analysisReport', level: 'level-2', hasChild: 0 },{ name: '机器学习', path: 'machineLearning', level: 'level-2', hasChild: 0 }, { name: '训练', path: 'machineLearning/analysisTrain', level: 'level-3', hasChild: 0 }, { name: '模型', path: 'machineLearning/analysisModel', level: 'level-3', hasChild: 0 },{ name: 'AI引擎', path: 'AIEngine', level: 'level-2', hasChild: 0 }]
       },
       showAccountDetail: false,
       toggleOpen: false
     }
  },
  methods: {
    showItem: function (target) {
      let vm = this;
      vm[target] = !vm[target];
    },
    setActive: function (target) {
      let vm = this;
      vm.menuActive = target;
    },
    navToggleExpand: function() {
      this.toggleOpen = !(this.toggleOpen);
    }
  },
  created: function() {
    let cur_path = this.$route.path
    this.menuActive = cur_path.split('/')[1];
  }
}
</script>