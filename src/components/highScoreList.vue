<template>
  <li>
    <div class="namespace">
      <img :src="[myUrl]"/>
      <img src="../images/my.jpg"/>
      <span>{{msg1.username}}</span>
    </div>
    <span class="score">{{msg1.peopleScore}}</span>
  </li>
</template>

<script>
  export default {
    data () {
      return {
        myUrl: '../../images/jiangbei' + this.lindex + '.png'
      }
    },
    props: ['msg1', 'lindex'],
    name: 'highScoreList'
  }
</script>

<style scoped>

  .namespace{
    display: flex;
    align-items: center;
  }
  .namespace img:first-child{
    height: 54rpx;
    width: 48rpx;
    margin-left: 34rpx;
    margin-right: 32rpx;
  }
  .namespace > img:nth-child(2){
    height: 120rpx;
    width: 120rpx;
    border-radius: 50%;
    border: burlywood solid 1rpx;
  }
  .namespace span{
    margin-left: 11rpx;
    font-size: 36rpx;
  }
</style>
