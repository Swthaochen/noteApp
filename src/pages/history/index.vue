<template>
  <div class="list-content">
    <ul class="list">
      <historylis  v-for="item in theList" :key="item" :msg3="item"></historylis>
    </ul>
  </div>
</template>

<script>
  import historylis from '../../components/historyList'
  import store from '../../store/vuex.js'
  import {getDateWork} from '../../utils/API.js'
  import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
var sd = require('silly-datetime');
  export default {
    data () {
      return {
        theList: [],
        testList: [],
        pageNum: 1,
        tt:''
      }
    },
    onLoad(options){
        console.log(options.date)
        let time=sd.format(options.date, 'YYYY-MM-DD HH:mm:ss');
        time = Date.parse(new Date(time))
        this.tt = time
        getDateWork(this.tt,store.state.userInfo.userId).then((res)=>{
          console.log(res)
          this.theList = res.data
        })
    },
    onShow(){
        getDateWork(this.tt,store.state.userInfo.userId).then((res)=>{
          console.log(res)
          this.theList = res.data
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
