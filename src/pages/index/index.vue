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
        <mylist v-for="(item,index) in mywork" :key="item" :msg="item" :theindex="index" @fresh="getList"></mylist>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
  import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
  import myIndex from '../../components/myIndex'
  import mylist from '../../components/mylist'
  import store from '../../store/vuex.js'
import {getWorkList} from '../../utils/API.js'
import { jumpTo } from '../../utils/utils.js';
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
    methods:{
      getList(){
        //得到当前任务列表
        getWorkList(store.state.userInfo.userId).then((res)=>{
          console.log(res)
            this.mywork = res.data
        })
      }
    },
    onShow(){
      //得到当前任务列表
      getWorkList(store.state.userInfo.userId).then((res)=>{
        console.log(res)
          this.mywork = res.data
      })
    },
    mounted: function () {
      if(store.state.userInfo.sex == null || store.state.userInfo.birthday == null){
        showModal('您的信息不完整，请填写个人信息').then(()=>{
          jumpTo('../baseinfo/main')
        })
        .catch(()=>{
          jumpTo('../baseinfo/main')
        })
      }
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
