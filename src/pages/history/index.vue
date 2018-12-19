<template>
  <div class="list-content">
    <ul class="list">
      <historylis  v-for="item in theList" :key="item" :msg3="item"></historylis>
    </ul>
  </div>
</template>

<script>
  import historylis from '../../components/historyList'
  import axios from 'axios'
  export default {
    data () {
      return {
        theList: [],
        testList: [],
        pageNum: 1
      }
    },
    beforeCreate: function () {
      var self = this
      axios.get(`/user/score/history/${this.pageNum}`).then(function (res) {
        var testList = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < testList.data.groups.length; i++) {
          var time = testList.data.groups[i].endTime
          var d = new Date(time)
          var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          testList.data.groups[i].endTime = times
          self.theList.push(testList.data.groups[i])
        }
      }).catch(function (error) {
        console.log(error)
        var test = {
          'status': 0,
          'message': 'SUCCESS',
          'data': {
            'groups': [
              {
                'title': '数据库作业',
                'finishedPeople': 5,
                'unfinishedDay': 4,
                'groupId': 1,
                'endTime': '2018-05-11T00:00:00.000+0000',
                'type': 1
              },
              {
                'title': '算法设计上机',
                'finishedPeople': 3,
                'unfinishedDay': 0,
                'groupId': 2,
                'endTime': '2018-04-10T00:00:00.000+0000',
                'type': 0
              },
              {
                'title': '软件工程大作业',
                'finishedPeople': 7,
                'unfinishedDay': 3,
                'groupId': 2,
                'endTime': '2018-04-10T00:00:00.000+0000',
                'type': 0
              },
              {
                'title': '数据结构大作业',
                'finishedPeople': 2,
                'unfinishedDay': 0,
                'groupId': 2,
                'endTime': '2018-04-10T00:00:00.000+0000',
                'type': 0
              }
            ],
            'pageSum': 1
          }
        }
        var testList = JSON.parse(JSON.stringify(test))
        for (let i = 0; i < testList.data.groups.length; i++) {
          var time = testList.data.groups[i].endTime
          var d = new Date(time)
          var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          testList.data.groups[i].endTime = times
          self.theList.push(testList.data.groups[i])
        }
      })
    },
    components: {
      historylis
    }
  }
</script>

<style>
  page{
    background-color: #FFC53D;
    margin-bottom: 100rpx;
  }
  .leftArea span{
    margin-left: 29rpx;
    display: block;
    font-size:24rpx;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(153,118,37,1);
  }
  .leftArea span:first-child{
    margin-bottom: 29rpx;
    display: block;
    font-size:32rpx;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(77,59,18,1);
  }
  .list{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rpx;
  }
  .list > li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 690rpx;
    height: 176rpx;
    margin: 15rpx 0;
    background-color: white;
    border-radius:6px;
    border-left: solid 6px #B583FF;
    position: relative;
  }
  .rightArea {
    position: absolute;
    top: 0rpx;
    right: 16rpx;
    font-size: 48rpx;
  }
  .rightArea img{
    height: 70rpx;
    width: 128rpx;
  }
  .list li:first-child{
    border-color:#83CAFF;
  }
</style>
