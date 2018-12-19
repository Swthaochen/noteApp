<template>
  <div>
    <div class="nav-title">
        <span>任务村</span>
        <span class="theCheck">排行榜</span>
    </div>
    <ul class="list">
      <highlist  v-for="(item,index) in theList" :key="item" :msg1="item" :lindex="index + 1"></highlist>
    </ul>
    <ul class="otherlist">
      <otherslist  v-for="(item,index) in otherList" :key="item" :msg2="item" :lindex1="index + 4"></otherslist>
    </ul>
  </div>
</template>

<script>
  import highlist from '../../components/highScoreList'
  import otherslist from '../../components/otherScoreList'
  import axios from 'axios'
  export default {
    data () {
      return {
        otherList: [],
        pageNum: 1,
        totallist: [],
        theList: []
      }
    },
    beforeCreate: function () {
      var self = this
      axios.get(`/user/rank/${this.pageNum}`).then(function (res) {
        self.theList = JSON.parse(JSON.stringify(res.data))
      }).catch(function (error) {
        var test = {
          'status': 0,
          'message': 'SUCCESS',
          'data': {
            'pageSum': 1,
            'rank': [
              {'username': 'DingDing', 'peopleScore': 3595},
              {'username': 'HuaHua', 'peopleScore': 2846},
              {'username': 'lalalal', 'peopleScore': 50},
              {'username': 'janzs', 'peopleScore': 100},
              {'username': 'DongDong', 'peopleScore': 766},
              {'username': 'MingMing', 'peopleScore': 1094},
              {'username': 'MingMing', 'peopleScore': 999},
              {'username': 'FangFang', 'peopleScore': 754},
              {'username': 'FangFang', 'peopleScore': 322}
            ]
          }
        }
        console.log(error)
        self.totallist = JSON.parse(JSON.stringify(test))
        function sortScore (a, b) {
          return b.peopleScore - a.peopleScore
        }
        self.totallist.data.rank.sort(sortScore)
        for (let i = 0; i < self.totallist.data.rank.length && i < 3; i++) {
          (function (i) {
            self.theList.push(self.totallist.data.rank[i])
          })(i)
        }
        for (let i = 3; i < self.totallist.data.rank.length; i++) {
          (function (i) {
            self.otherList.push(self.totallist.data.rank[i])
          })(i)
        }
      })
    },
    components: {
      highlist,
      otherslist
    }
  }
</script>

<style>
  page{
    background-color: #FFC53D;
    margin-bottom: 100rpx;
  }
  .list{
    padding-top: 92rpx;
  }
  ul{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list li{
    border-radius:6px;
    background-color: white;
    display: flex;
    height: 176rpx;
    width: 690rpx;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    align-items: center;
    position: relative;
  }
  .otherlist{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24rpx;
  }
  .weici{
    margin-left: 40rpx;
  }
  .score{
    position: absolute;
    right: 34rpx;
  }
  .nav-title{
    padding-bottom: 30rpx;
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 32rpx;
    height: 62rpx;
    z-index: 3;
    background-color: #FFC53D;
  }
  .nav-title > span{
    text-align: center;
    display: inline-block;
    height: 100%;
    width: 172rpx;
    line-height: 62rpx;
  }
  .theCheck{
    background:rgba(255,212,112,1);
    border:4rpx solid rgba(51,39,12,1);
    border-radius:36rpx;
  }
</style>
