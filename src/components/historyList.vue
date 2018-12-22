<template>
  <li @click="getThis">
    <div class="leftArea">
      <span class="workTitle">{{msg3.notetitle}}</span>
      <span>开始时间:{{start}}</span>
      <span>截止时间:{{end}}</span>
    </div>
    <div class="rightArea"><img :src="[isfinish != 0 ? myUrl1 : myUrl2]"/></div>
  </li>
</template>
<script>
import {getSettings,getUserInfo,jumpTo,switchTab} from '../utils/utils.js'
  export default {
    data () {
      return {
        myUrl1: '../../images/finish.png',
        myUrl2: '../../images/unfinish.png',
        isfinish: this.msg3.isFinish
      }
    },
    computed:{
     start(){
        let date = new Date(parseInt(this.msg3.starttime))
        console.log(date)
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
     },
     end(){
        let date = new Date(parseInt(this.msg3.endtime))
        console.log(date)
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
     }
    },
    methods:{
      getThis(){
        jumpTo(`/pages/workDetails/main?id=${this.msg3.workid}`)
      }
    },
    props: ['msg3'],
    name: 'historyList'
  }
</script>

<style scoped>

</style>
