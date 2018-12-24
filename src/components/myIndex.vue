<template>
  <div>
    <img class="menu_icon" src="../images/caidan.png" @click="leftjump()"/>
    <div class="information">
      <div class="myIcon"><div><open-data type="userAvatarUrl"></open-data></div></div>
      <div class="scoreArea">
        <open-data type="userNickName"></open-data>
        <div>
          <div class="simpleScore">
            <p>{{num}}</p>
            <p>今日完成</p>
          </div>
          <div class="manyScore">
            <p>{{num1}}</p>
            <p>今日任务</p>
          </div>
        </div>
      </div>
    </div>
    <div class="jumpBar">
      <div class="myList" :class="[isShow ? 'show':'hide']">
        <div class="left-head">
          <div><open-data type="userAvatarUrl"></open-data></div>
          <open-data type="userNickName"></open-data>
        </div>
        <div class="myNote">{{info}}</div>
        <div class="left-mune">
          <ul>
            <li @click="tobase()"><img src="../images/edit.png"/><p>基本资料</p></li>
            <li @click="toHistory()"><img src="../images/history.png"/><p>任务列表</p></li>
          </ul>
        </div>
      </div>
      <div class="anotherside" :class="[isShow ? 'show':'hide']" @click="leftback()">
      </div>
    </div>
  </div>
</template>

<script>
  import card from '@/components/card'
  import store from '../store/vuex.js'
  import bus from '../store/bus.js'
import {getWorkList} from '../utils/API.js'
  export default {
    data () {
      return {
        myIconUrl: '',
        userInfo: {},
        isShow: false,
        todayScore: 0,
        weekScore: 0,
        num:'',
        num1:''
      }
    },
    computed:{
      info(){
        return store.state.userInfo.note;
      }
    },
    mounted: function () {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              this.rootname = res.userInfo.nickName
              this.myIconUrl = res.userInfo.avatarUrl
            }
          })
        }
      })
      bus.$on('kk', content => { 
        console.log('aaa')
        this.num++
      });    
      console.log(this.userInfo)
    },
    onHide: function () {
      this.isShow = false
    },
    onShow(){
      //得到当前任务列表
      this.num = 0;
      this.num1 = 0;
      getWorkList(store.state.userInfo.userId).then((res)=>{
        res.data.forEach(element => {
          console.log(element)
          if(element.isFinish != 0)
            this.num++
        });
        this.num1 = res.data.length;
      })
    },
    mounted(){
      //得到当前任务列表
      this.num = 0;
      this.num1 = 0;
      getWorkList(store.state.userInfo.userId).then((res)=>{
        res.data.forEach(element => {
          console.log(element)
          if(element.isFinish != 0)
            this.num++
        });
        this.num1 = res.data.length;
      })
    },
    components: {
      card
    },
    methods: {
      leftjump () {
        this.isShow = true
      },
      leftback () {
        this.isShow = false
      },
      toHistory () {
        var url = '/pages/history/main'
        wx.navigateTo({url})
        this.isShow = false
      },
      tolink () {
        var url = '/pages/ranking-list/main'
        wx.navigateTo({url})
        this.isShow = false
      },
      tobase () {
        var url = '/pages/baseinfo/main'
        wx.navigateTo({url})
        this.isShow = false
      }
    }
  }
</script>
<style scoped>
  .information{
    margin-top: 100rpx;
    display: flex;
    width: 720rpx;
  }
  .myIcon{
    margin-left: 33rpx;
  }
  .myIcon > div{
    overflow: hidden;
    height: 160rpx;
    width: 160rpx;
    border-radius: 50%;
    border: burlywood solid 8rpx;
  }
  .left-head{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .left-head > div{
    overflow: hidden;
    height: 142rpx;
    width: 142rpx;
    border-radius: 50%;
    border: burlywood solid 1rpx;
    margin-top: 128rpx;
    margin-bottom: 31rpx;
  }
  .scoreArea{
    height: 200rpx;
    width: 100%;
    padding-left: 70rpx;
    padding-right: 50rpx;
    font-size:36rpx;
    font-family:SourceSansPro-Regular;
  }
  .menu_icon{
    height: 60rpx;
    width: 72rpx;
    position: absolute;
    top: 0;
    left: 20rpx;
  }
  .scoreArea > div{
    display: flex;
    justify-content: space-between;
  }
  .simpleScore,.manyScore{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
  }
  .simpleScore > p:first-child,.manyScore > p:first-child{
    font-size: 54rpx;
    font-family:DIN-Medium;
  }
  .simpleScore > p:nth-child(2),.manyScore > p:nth-child(2){
    font-size: 28rpx;
    font-family:DIN-Medium;
    color:rgba(153,118,37,1);
  }
  .bottom-list{
    background-color: white;
    height: 98rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 20;
    margin-left: -16rpx;
  }
  .bottom-list ul{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 22rpx;
  }
  ul img{
    margin-top: 10rpx;
    height: 50rpx;
    width: 48rpx;
  }
  .bottom-list img{
    margin-bottom: 6rpx;
   }
  .bottom-list ul li:nth-child(2) img{
    margin-top: 12rpx;
    height: 80rpx;
    width: 80rpx;
  }
  .bottom-list li a{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .myList{
    position: fixed;
    left: 0;
    top: 0;
    width: 50%;
    height: 1206rpx;
    background-color: white;
    flex-direction: column;
    align-items: center;
  }

  .left-mune{
    font-size: 28rpx;
    margin-top: 40rpx;
  }
  .left-mune img{
    margin-bottom: 15rpx;
    margin-right: 13rpx;
    height: 58rpx;
    width: 58rpx;
    border:1rpx dashed black;
  }
  .left-mune ul{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .left-mune li{
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .jumpBar{
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .anotherside{
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 1206rpx;
    background-color: black;
    opacity:0.5
  }
  .show{
    display: flex;
  }
  .hide{
    display: none;
  }
  .myNote{
    text-align: center;
    width: 340rpx;
    font-size: 26rpx;
    margin-top: 15rpx;
    color: rgba(77,59,18,1);
  }
</style>
