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
  </div>
</template>

<script>
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css' 
export default {
  data () {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      disabledarr: ['2018-12-19','2018-6-25'],
      value: [2018,12,19],
      begin:[2016,1,1],
      end:[2020,1,1],
      events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},
    }
  },
  components: {
    Calendar
  },
  methods: {
    selectMonth(month,year){
      console.log(year,month)
    },
    prev(month){
      console.log(month)
    },
    next(month){
      console.log(month)
    },
    selectYear(year){
      console.log(year)
    },
    setToday(val,val1,val2) {
        wx.switchTab({url:'/pages/newList/main'})
      this.$refs.calendar.setToday();
    },
    select(val, val2) {
      console.log(val)
      console.log(val2)
    }
  }
}
</script>
<style>
  page{
    background-color: #FFC53D;
  }
</style>
