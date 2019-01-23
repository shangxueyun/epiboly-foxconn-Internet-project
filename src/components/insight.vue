<template>
<section>
  <h4>
    <Breadcrumb separator=">">
      <BreadcrumbItem>洞察</BreadcrumbItem>
      <BreadcrumbItem v-for="(name, idx) in routerName" :key="idx">{{ replaceSensorType(name) }}</BreadcrumbItem>
    </Breadcrumb>
  </h4>
  <router-view @returnSensorType="returnSType"></router-view>
</section>
</template>

<script>
import deivce_functions from '@/assets/js/utility.js';
export default {
  name: 'Insight',
  data() {
    return {
      nameOnNav: ''
    }
  },
  mounted () {},
  computed: {
    routerName: function () {
      return this.$route.name;
    },
    replaceSensorType: function () {
      return function (name) {
        let vm = this;
        
        if(name === '#sensor') {
          return deivce_functions().type2Name(vm.nameOnNav);
        }
        return name; 
      }
    }
  },
  methods: {
    returnSType: function (type) {
      this.nameOnNav = type;
    }
  }
}
</script>