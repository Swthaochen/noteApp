<template>
  <div class="container">
    <div class="innerTitle">
      <span>任务标题</span>
      <span>{{info.notetitle}}</span>
    </div>
    <div class="innerConfig">
      <span>开始时间</span>
      <span>{{start}}</span>
    </div>
    <div class="innerConfig">
      <span>结束时间</span>
      <span>{{end}}</span>
    </div>
    <div class="innerConfig">
      <span>是否已完成</span>
      <span>{{info.isFinish == 1?'已完成':'未完成'}}</span>
    </div>
    <div class="innerText">
      <span class="top">任务描述</span>
      <div class="bottom">
        {{info.noteCon}}
      </div>
    </div>
    <div class="config" @click="config">
      {{word}}
    </div>
    <div class="bntConfig" @click="back">
      返回
    </div>
  </div>
</template>
<script>
  import store from '../../store/vuex.js'
  import {configFinish} from '../../utils/API.js'
import {insertWork,getWorkInfo} from '../../utils/API.js'
  import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
 export default{
   data(){
     return{
       startdate:'',
       enddate:'',
       info:'',
       id:'',
       isEnable:''
     }
   },
   
   methods:{
     back(){
        wx.navigateBack()
     },
     config(){
        if(this.isEnable == 0){
          configFinish(this.id).then((res)=>{
            console.log(res)
            showToast('任务完成','success',true,1500)
            getWorkInfo(this.id).then((res)=>{
                this.info = res.data[0]
                this.isEnable = res.data[0].isFinish
            })
          })
        }
     }
   },
   onLoad(options){
     console.log(options.id)
     this.id = options.id
     getWorkInfo(options.id).then((res)=>{
       console.log(res.data[0])
        this.info = res.data[0]
        this.isEnable = res.data[0].isFinish
     })
   },
   computed:{
     start(){
        let date = new Date(parseInt(this.info.starttime))
        console.log(date)
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
     },
     end(){
        let date = new Date(parseInt(this.info.endtime))
        console.log(date)
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
     },
     word(){
       console.log(this.isEnable)
       if(this.isEnable == 0){
         return '确认完成'
       }else{
         return '已完成'
       }
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
  .top{
      display: inline-block;
      margin-bottom: 7rpx;
  }
  .bottom{
      margin-bottom: 55rpx;
  }
  .innerConfig{
    padding: 10rpx 40rpx;
    font-size:30rpx;
    background: white;
    height: 80rpx;
    width: 80vw;
    line-height: 80rpx;
    border-radius: 10rpx;
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
  }
  .innerText{
    padding: 10rpx;
    padding-left: 40rpx;
    padding-right: 40rpx;
    font-size:30rpx;
    background: white;
    width: 80vw;
    margin-bottom: 30rpx;
    border-radius: 10rpx;
  }
  .innerTitle{
    padding: 10rpx;
    padding-left: 40rpx;
    padding-right: 40rpx;
    border-radius: 10rpx;
    background: white;
    font-size:30rpx;
    margin-bottom: 30rpx;
    height: 60rpx;
    line-height: 60rpx;
    width: 80vw;
    display: flex;
    justify-content: space-between;
  }
  .bntConfig{
    margin-top: 20rpx;
    border: 3rpx solid black; 
    height: 76rpx;
    width: 80vw;
    line-height: 76rpx;
    text-align: center;
    border-radius: 38rpx;
    background-color: #FFC53D;
  }
  .config{
    margin-top: 100rpx;
    border: 3rpx solid black; 
    height: 76rpx;
    width: 80vw;
    line-height: 76rpx;
    text-align: center;
    border-radius: 38rpx;
    background-color: #FFC53D;
  }
  .delete{
    margin-top: 20rpx;
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
