<template>
  <div class="container">
    <div class="innerTitle">
      <span>任务标题</span>
      <input v-model="title" placeholder="请填写您想要完成的任务"/>
    </div>
    <div class="innerText">
      <span>任务描述</span>
      <input v-model="workCon" placeholder="请填写您想要完成的任务"/>
    </div>
    <div class="innerConfig">
      <span>开始时间</span>
        <picker
          mode="date"
          :value="startdate"
          @change="bindDateStart"
        >
          <view class="picker">{{startdate == ''?'请选择日期':startdate}}</view>
        </picker>
    </div>
    <div class="innerConfig">
      <span>结束时间</span>
        <picker
          mode="date"
          :value="enddate"
          @change="bindDateEnd"
        >
          <view class="picker">{{enddate == ''?'请选择日期':enddate}}</view>
        </picker>
    </div>
    <div class="innerConfig">
      <span>是否设置提醒</span>
      <switch checked bindchange="switch1Change" />
    </div>
    <div class="bntConfig" @click="submitForm">
      点击提交
    </div>
  </div>
</template>
<script>
  import store from '../../store/vuex.js'
import {insertWork} from '../../utils/API.js'
  import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
var sd = require('silly-datetime');
 export default{
   data(){
     return{
       startdate:'',
       enddate:''
     }
   },
   methods:{
     bindDateStart(e){
       this.startdate = e.mp.detail.value
     },
     bindDateEnd(e){
       this.enddate = e.mp.detail.value
     },
     submitForm(){
        let time=sd.format(this.startdate, 'YYYY-MM-DD HH:mm:ss');
        time = Date.parse(new Date(time))
        let time1 = sd.format(this.enddate, 'YYYY-MM-DD HH:mm:ss');
        time1 = Date.parse(new Date(time1))
       var data = {
          endtime:time1,
          starttime:time,
          userid:store.state.userInfo.userId,
          notetitle:this.title,
          noteCon:this.workCon
       }
       insertWork(data).then((res)=>{
         console.log(res)
         if(res.statusCode == 200){
          showToast('新建任务成功','success',true,2000)
         }else{
          showToast('新建任务失败','success',true,2000)
         }
       })
       .catch((err)=>{
          showToast('新建任务失败,请重试','success',true,2000)
       })
     }
     
   }
}
</script>
<style>
  page{
    padding-top: 20rpx;
    background-color: #FFC53D;
    margin-bottom: 100rpx;
  }
  .innerConfig{
    padding: 10rpx;
    font-size:30rpx;
    background: white;
    height: 80rpx;
    width: 90vw;
    line-height: 80rpx;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .innerText{
    padding: 10rpx;
    font-size:30rpx;
    background: white;
    height: 230rpx;
    width: 90vw;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
  .innerTitle{
    padding: 10rpx;
    position: relative;
    border-radius: 10rpx;
    background: white;
    font-size:30rpx;
    margin-bottom: 20rpx;
    height: 60rpx;
    line-height: 60rpx;
    width: 90vw;
  }
  .innerTitle span{
    position: absolute;
  }
  .innerTitle input{
    height: 60rpx;
    padding-left:132rpx;
  }
  .bntConfig{
    margin-top: 85rpx;
    border: 3rpx solid black; 
    height: 76rpx;
    width: 80vw;
    line-height: 76rpx;
    text-align: center;
    border-radius: 38rpx;
    background-color: #FFC53D;
  }
</style>
<style scoped>
  .container{
    padding-top:30rpx;
  }
</style>
