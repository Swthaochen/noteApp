<template>
    <li @click="checkWorkInfo">
      <div class="leftArea">
        <span class="workTitle">{{msg.notetitle}}</span>
        <span>发布时间:{{startTime}}</span>
        <span>截止时间:{{endTime}}</span>
      </div>
      <div class="rightArea"><div class="buttonCon" @click.stop="configThis">{{isEnable == 0?'确认完成':'已完成'}}</div></div>
    </li>
</template>

<script>
  import {configFinish} from '../utils/API.js'
import {showModal,showToast,showLoading,hideLoading} from '../utils/wxAPI.js'
  export default {
    props: ['msg'],
    data(){
      return{

      }
    },
    computed:{
      startTime(){
        console.log(this.msg.starttime)
        let date = new Date(parseInt(this.msg.starttime))
        console.log(date)
        let hour,minite,second
        if(date.getHours() < 10){
          hour = '0' + date.getHours()
          console.log(hour)
        }else{
          hour = date.getHours()
        }
        if(date.getMinutes() < 10){
          minite = '0' + date.getMinutes()
        }else{
          minite = date.getMinutes()
        }
        if(date.getSeconds() < 10){
          second = '0' + date.getSeconds()
        }else{
          second = date.getSeconds()
        }
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日   ' + hour + ':' + minite + ':' + second
      },
      endTime(){
        let date = new Date(parseInt(this.msg.endtime))
        let hour,minite,second
        if(date.getHours() < 10){
          hour = '0' + date.getHours()
          console.log(hour)
        }else{
          hour = date.getHours()
        }
        if(date.getMinutes() < 10){
          minite = '0' + date.getMinutes()
        }else{
          minite = date.getMinutes()
        }
        if(date.getSeconds() < 10){
          second = '0' + date.getSeconds()
        }else{
          second = date.getSeconds()
        }
        return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日   ' + hour + ':' + minite + ':' + second
      },
      isEnable(){
        return this.msg.isFinish
      }
    },
    methods:{
      configThis(){
        if(this.isEnable == 0){
            configFinish(this.msg.workid).then((res)=>{
              console.log(res)
              showToast('任务完成','success',true,1500)
              this.$emit('fresh')
              this.msg.isFinish = 1
            })
        }
      },
      checkWorkInfo(){
        console.log('qqqq')
      }
    }
  }

</script>

<style scoped>
  li{
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
  .rightArea {
    margin-right: 31rpx;
    font-size: 48rpx;
  }
  .buttonCon{
    padding:0;
    height: 80rpx;
    line-height: 80rpx;
    width: 159rpx;
    font-size: 28rpx;
    background: darkorange;
    color: aliceblue;
    border-radius:50%;
    text-align: center; 
  }
  .list-content li:first-child{
    border-color:#83CAFF;
  }
</style>
