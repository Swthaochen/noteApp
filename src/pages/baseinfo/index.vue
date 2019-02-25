<template>
  <div>
    <form @submit="formSubmit">
      <ul class="list">
        <li>
          <span>头像</span>
          <div><open-data type="userAvatarUrl"></open-data></div>
        </li>
        <li>
          <span>性别</span>
          <radio-group class="radio-group" @change="radioChange">
            <label class="radio">
              <radio value="1" checked="true" hidden="true"/> <img :id="[pickedSex === '1' ? 'checked':'']" src="../../images/man.png"/>
            </label>
            <label class="radio">
              <radio value="0" hidden="true"/> <img :id="[pickedSex === '0' ? 'checked':'']" src="../../images/woman.png"/>
            </label>
          </radio-group>
        </li>
        <li>
          <span>出生年月</span>
          <picker mode="date" :value="date" start="1970-09-01" end="2018-12-30" @change="bindDateChange">
            <view class="picker">
              {{date == '' || date == null?'请选择您的出生日期':date}}
            </view>
          </picker>
        </li>
        <li>
          <span>个性签名</span>
          <input placeholder="请填写您的个性签名" v-model="note"/>
        </li>
      </ul>
      <ul class="other-list">
        <li>
          <span>大学</span>
          <picker mode="selector" :value="schoolIndex" :range="univer" @change="bindPickerChange">
            <view class="picker">
              {{school}}
            </view>
          </picker>
        </li>
        <li>
          <span>年级</span>
          <picker mode="selector" :value="GradeIndex" :range="grade" @change="bindgradeChange">
            <view class="picker">
              {{GradeIndex === ''? '请选择年级':grade[GradeIndex]}}
            </view>
          </picker>
        </li>
      </ul>
      <div class="bot">
        <button class="btn_login"  formType="submit">保存</button>
      </div>
    </form>
  </div>
</template>

<script>
  import store from '../../store/vuex.js'
  import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
  import {getSettings,getUserInfo,jumpTo,switchTab} from '../../utils/utils.js'
  import {updateUserInfo} from '../../utils/API.js' 
import {getUserInfor, getUserInformation} from '../../utils/API.js'
export default {
    data () {
      return {
        univer: [
          '清华大学', '北京大学', '上海交通大学', '南京大学', '武汉大学'
        ],
        grade: [
          '大一', '大二', '大三', '大四'
        ],
        schoolIndex: '',
        GradeIndex: '',
        date: '',
        pickedSex: '1',
        note:''
      }
    },
    computed:{
      school(){
        return this.schoolIndex === ''? '请选择学校':this.univer[this.schoolIndex]
      }
    },
    beforeMount(){
      var univerSet = store.state.userInfo.univer
      var gradeSet = store.state.userInfo.grade
      this.univer.forEach((item,index)=>{
        if(item == univerSet){
          this.schoolIndex = index
        }
      })
      this.grade.forEach((item,index)=>{
        if(item == gradeSet){
          this.GradeIndex = index
        }
      })
      this.pickedSex = store.state.userInfo.sex || 1
      this.date = store.state.userInfo.birthday
      this.note = store.state.userInfo.note
    },
    methods: {
      bindDateChange: function (e) {
        this.date = e.mp.detail.value
      },
      radioChange: function (e) {
        this.pickedSex = e.mp.detail.value
      },
      formSubmit: function () {
        console.log(this.Index)
        var data = {
          userId:store.state.userInfo.userId,
          univer:this.univer[this.schoolIndex],
          grade:this.grade[this.GradeIndex],
          sex:this.pickedSex,
          note:this.note,
          date:this.date
        }
        let isComplete = true;
        Object.keys(data).forEach(function(key){
          //如果有未填写的项
          if(data[key] == '' || data[key] == undefined){
            showModal('您的信息填写不完整')
            isComplete = false
          }
        });
        console.log(data)
        if(isComplete)
        {
          updateUserInfo(store.state.userInfo.userId, data).then((res)=>{
            console.log(res)
            getUserInformation(store.state.userInfo.userId)
          })
          // showToast('信息更新成功','success',true,2000)
          // setTimeout(()=>{
          //   switchTab('../index/main')
          // },2000)
        }
      },
      bindPickerChange: function (e) {
        this.schoolIndex = e.mp.detail.value
      },
      bindgradeChange: function (e) {
        this.GradeIndex = e.mp.detail.value
      }
    }
}
</script>

<style>
  page{
    background-color: #FFC53D;
    margin-bottom: 100rpx;
    padding-top: 50rpx;
  }
  ul{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .list li,.other-list li{
    height: 80rpx;
    width: 630rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
  }
  .other-list{
    margin-top: 30rpx;
    font-size: 26rpx;
  }
  .list li span:nth-child(2),.other-list li span:nth-child(2){
    font-size: 28rpx;
    color: #997625;
  }
  picker{
    font-size: 28rpx;
    color: #997625;
  }
  .list li:first-child{
    height: 180rpx;
  }
  .list li:first-child div{
    overflow: hidden;
    height: 144rpx;
    width: 144rpx;
    border-radius: 50%;
    border: burlywood solid 1rpx;
  }
  .list li span:first-child{
    font-size: 26rpx;
  }
  .list li:nth-child(2) img{
    width: 44rpx;
    height: 44rpx;
  }
  .list li:nth-child(2) div{
    display: flex;
    align-items: center;
  }
  .bot{
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: white;
    position: absolute;
    bottom: 0;
  }
  .btn_login{
    height: 88rpx;
    width: 690rpx;
    background-color: #FFC53D;
    margin-top: 12rpx;
    margin-bottom: 12rpx;
    border-radius: 44rpx;
  }
  radio-group label:first-child{
    margin-right: 36rpx;
  }
  #checked{
    border: blueviolet solid 2rpx; ;
  }
  li>input{
    font-size: 28rpx;
    text-align: right
  }
</style>
