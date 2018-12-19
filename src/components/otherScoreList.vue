<template>
  <li>
    <div class="othername">
      <span class="weici">{{lindex1}}</span>
      <img src="../images/my.jpg"/>
      <span>{{msg2.username}}</span>
    </div>
    <span class="score">{{msg2.peopleScore}}</span>
  </li>
</template>

<script>
  export default {
    name: 'otherScoreList',
    props: ['msg2', 'lindex1']
  }
</script>

<style scoped>

  .otherlist li{
    background-color: white;
    display: flex;
    height: 82rpx;
    width: 690rpx;
    align-items: center;
    position: relative;
    padding: 10rpx 0;
  }
  .otherlist img{
    height: 59rpx;
    width: 59rpx;
    margin-left: 41rpx;
    margin-right: 10rpx;
    border-radius: 50%;
  }
  .othername{
    display: flex;
    align-items: center;
    font-size: 30rpx;
  }
</style>
