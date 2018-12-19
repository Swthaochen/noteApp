<template>
    <li>
      <div class="leftArea">
        <span class="workTitle">{{msg.title}}</span>
        <span>发布时间:{{msg.endTime}}</span>
        <span>截止时间:{{msg.endTime}}</span>
      </div>
      <div class="rightArea"><div class="buttonCon">确认完成</div></div>
    </li>
</template>

<script>
  export default {
    props: ['msg']
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
