<template>
  <li>
    <div class="leftArea">
      <span class="workTitle">{{msg3.title}}</span>
      <span>截至时间:{{msg3.endTime}}</span>
      <span>完成人数:{{msg3.finishedPeople}}人</span>
    </div>
    <div class="rightArea"><img :src="[isfinish <= 0 ? myUrl1 : myUrl2]"/></div>
  </li>
</template>
<script>
  export default {
    data () {
      return {
        myUrl1: '../../images/finish.png',
        myUrl2: '../../images/unfinish.png',
        isfinish: this.msg3.unfinishedDay
      }
    },
    props: ['msg3'],
    name: 'historyList'
  }
</script>

<style scoped>

</style>
