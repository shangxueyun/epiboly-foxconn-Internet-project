<template>
<div class="search-bar">
  <Form :model="formItem">
    <FormItem>
      <Input v-model="formItem.input" :placeholder="searchChoose" :icon="searchIcon"></Input>
    </FormItem>
    <FormItem v-if="maintainStatus">
      <Select v-model="formItem.select" placeholder="维保状态">
        <Option value="1">通过</Option>
        <Option value="0">不通过</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button type="primary" class="submit">查询</Button>
    </FormItem>
  </Form>
</div>
</template>

<script>
  export default {
    data () {
      return {
        searchChoose:'',
        searchIcon:'',
        formItem: {
          input: '',
          select: ''
        }
      }
    },
    props: ['maintainStatus', 'tableType'],
    mounted () {
      this.setPlaceholder(this.tableType);
    },
    methods: {
      setPlaceholder: function (textType) {
          if(textType=="ruleEngine") {
            this.searchChoose='    请输入规则名称、被分派人员、优先级';
            this.searchIcon='ios-search';
          }
          else {
            this.searchChoose='请输入搜索名称';
          }
      }
    }
  }
  
</script>

<style lang="scss" scoped>
  .search-bar {
    input {
      border: solid 1px #3dbeff;
      padding-left: 2.6rem;
      line-height: 1.8;
      background: url('~@/../static/img/ic-search.svg') no-repeat 0.5rem center;
    }
  }
  button {
    &.submit {
      height: 2.5rem;
      color: #fff;
      background-color: #32c0ff;
      padding: 0.2rem 0.8rem;
    }
  }
</style>