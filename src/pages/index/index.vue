<template>
  <div class="container">
  <my-index></my-index>
  <div class="current">
    <div class="current-title">
      <img src="../../images/work.png"/>
      <span>当前任务</span>
    </div>
    <div class="list-content">
      <ul class="list">
        <mylist v-for="(item,index) in mywork" :key="item" :msg="item" :theindex="index"></mylist>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
  import myIndex from '../../components/myIndex'
  import mylist from '../../components/mylist'
  import axios from 'axios'
export default {
    data () {
      return {
        myIconUrl: '../../images/my.jpg',
        userInfo: {},
        isShow: false,
        mywork: [],
        rootname: ''
      }
    },
    beforeCreate () {
      axios.post('/user/login').then(function (res) {
        if (!res.isNew) {
          var url = '/pages/baseinfo/main'
          wx.navigateTo({url})
        }
      }).catch(function (error) {
        console.log('初始化用户信息失败,原因是：' + error)
      })
      axios.get('/user/score').then(function (res) {
        this.peopleScore = res.peopleScore
        this.personScore = res.personScore
      }).catch(function (error) {
        console.log('初始化用户积分失败,原因是：' + error)
      })
    },
    mounted: function () {
      var self = this
      axios.get('/task/pending').then(function (res) {
        self.theList = JSON.parse(JSON.stringify(res.data))
        for (let i = 0; i < self.workobject.data.groups.length; i++) {
          var time = self.workobject.data.groups[i].endTime
          var d = new Date(time)
          var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          self.workobject.data.groups[i].endTime = times
          self.mywork.push(self.workobject.data.groups[i])
        }
      }).catch(function (error) {
        var test = {
          'status': 0,
          'message': 'SUCCESS',
          'data': {
            'groups': [
              {
                'totalTask': 4,
                'title': '软件工程大作业',
                'finishedTask': 5,
                'finishedPeople': 9,
                'groupId': 2,
                'endTime': '2018-05-30T00:00:00.000+0800',
                'type': 1
              },
              {
                'totalTask': 4,
                'title': '数据库作业',
                'finishedTask': 8,
                'finishedPeople': 8,
                'groupId': 2,
                'endTime': '2018-05-30T16:00:00.000+0800',
                'type': 1
              },
              {
                'totalTask': 4,
                'title': '算法设计上机',
                'finishedTask': 1,
                'finishedPeople': 5,
                'groupId': 2,
                'endTime': '2018-05-30T00:00:00.000+0800',
                'type': 1
              },
              {
                'totalTask': 4,
                'title': '数据结构大作业',
                'finishedTask': 4,
                'finishedPeople': 6,
                'groupId': 2,
                'endTime': '2018-05-19T08:04:52.000+0800',
                'type': 1
              }
            ]
          }
        }
        console.log(error)
        var workobject = JSON.parse(JSON.stringify(test))
        for (let i = 0; i < workobject.data.groups.length; i++) {
          var time = workobject.data.groups[i].endTime
          var d = new Date(time)
          var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          workobject.data.groups[i].endTime = times
          self.mywork.push(workobject.data.groups[i])
        }
      })
    },
    components: {
      myIndex,
      mylist
    }
}
</script>
<style>
  page{
    background-color: #FFC53D;
  }
</style>
<style scoped>
.container{
  background-color: #FFC53D;
  padding: 0;
}
.current{
  width: 100%;
}
.current-title{
  font-size: 32rpx;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(153,118,37,1);
  display: flex;
  align-items: center;
}
.current-title > img{
  height: 36rpx;
  width: 36rpx;
  margin-left: 32rpx;
  margin-right: 10rpx;
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
.list li{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 690rpx;
  height: 176rpx;
  margin: 15rpx 0;
  background-color: white;
  border-radius:6px;
  border-left: solid 6px #B583FF;
}
.list mylist:first-child{
  border-color:#83CAFF;
}
</style>
