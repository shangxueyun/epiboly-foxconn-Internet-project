<template>
  <section>
    <h4 class="single">{{ title }}</h4>
    <div class="main-content">
      <div :class="'nav-to-' + btnNav2" class="map-frame">
        <div class="baidu">
          <iframe id="iframe_baidu" src="~@/html/baiduMap.html"></iframe>
        </div>
        <div class="navvis">
          <iframe id="iframe_navvis" src="~@/html/NavVis.html"></iframe>
        </div>
      </div>
      <div class="info-frame">
        <div v-for="infoBox in infoBoxes" :class="'infoBox ' + infoBox.class">
          <h6>{{ infoBox.title }}</h6>
          <h5 class="float-right">{{ formatNumber(infoBox.value) }}<span class="commt">{{ infoBox.unit }}</span></h5>
          <div class="overlay"><div class="wave1"></div><div class="wave2"></div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MapIndex',
  data () {
    return {
      title: '地图',
      btnNav2: 'baidu',
      infoBoxes: {}
    }
  },
  created () {
    let vm = this
    let boxes = [
      {title: '传感器总数', value: 18512, unit: '个', class: 'bg-frame-1'},
      {title: '设备总数', value: 100, unit: '个', class: 'bg-frame-2'},
      {title: '数据总量', value: 2000, unit: 'KB', class: 'bg-frame-3'}
    ]
    _.forEach(boxes, function(val, key) {
      vm.$set(vm.infoBoxes, key, val)
    });
  },
  mounted() {
    let vm = this;
    window.addEventListener('message', vm.getMsgFromIframe, false);
  },
  computed: {},
  methods: {
    getMsgFromIframe: function (event) {
      let vm = this;
      if (event.data.flag == 'navvis_init_finish') {
        vm.postMsgToIframe('iframe_baidu', event.data);
      } else if (event.data.flag == 'switch_to_navvis') {
        vm.switchMapTo('navvis');
        vm.postMsgToIframe('iframe_navvis', event.data);
      }
    },
    postMsgToIframe: function (iframe_id, msg) {
      let iframeIdx = document.getElementById(iframe_id);
      iframeIdx.contentWindow.postMessage(msg, '*');
    },
    formatNumber: function (num) {
      return String(num).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    },
    switchMapTo: function (target) {
      this.btnNav2 = target;
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav-to-baidu, .nav-to-navvis {
    > div {
      height: calc(100% - 2rem);
      width: calc(100% - 3.3334rem);
      position: absolute;
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .nav-to-baidu {
    .baidu { z-index: 10; }
    .navvis { z-index: 9; }
  }
  .nav-to-navvis {
    .baidu { z-index: 9; }
    .navvis { z-index: 10; }
  }
</style>