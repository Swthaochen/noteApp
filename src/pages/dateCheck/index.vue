<template>
  <div>
    <Calendar
      :months="months"
      :value="value"
      @next="next"
      @prev="prev"
      :events="events"
      lunar
      clean
      @select="select"
      ref="calendar"
      @selectMonth="selectMonth"
      @selectYear="selectYear"
    />
    <button @click="setToday">添加任务</button>
    <button @click="checkToday">查看任务</button>
  </div>
</template>

<script>
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css' 
import { jumpTo } from '../../../../../webProject/bangbang/src/utils/utils';
export default {
  data () {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      disabledarr: ['2018-12-19','2018-6-25'],
      value: [],
      begin:[2016,1,1],
      end:[2020,1,1],
      events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},
    }
  },
  components: {
    Calendar
  },
  mounted(){
    var myDate = new Date();
    this.value.push(myDate.getFullYear())
    this.value.push(myDate.getMonth()+1)
    this.value.push(myDate.getDate())
    this.select = this.value
  },
  methods: {
    selectMonth(month,year){
      console.log('bb',year,month)
    },
    prev(month){
      console.log('cc',month)
    },
    next(month){
      console.log('aa',month)
    },
    selectYear(year){
      console.log('dd',year)
    },
    setToday(val,val1,val2) {
        wx.switchTab({url:'/pages/newList/main'})
      this.$refs.calendar.setToday();
    },
    select(val, val2) {
      console.log('eee',val)
      this.select = val
      console.log(val2)
    },
    checkToday(){
      jumpTo(`../history/main?date=${this.select}`)
    }
  }
}
</script>
<style>
  page{
    background-color: #FFC53D;
  }
</style>
