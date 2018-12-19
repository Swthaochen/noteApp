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
              <radio value="1" checked="true" hidden="true"/> <img :id="[picked === '1' ? 'checked':'']" src="../../images/man.png"/>
            </label>
            <label class="radio">
              <radio value="0" hidden="true"/> <img :id="[picked === '0' ? 'checked':'']" src="../../images/woman.png"/>
            </label>
          </radio-group>
        </li>
        <li>
          <span>出生年月</span>
          <picker mode="date" :value="date" start="1970-09-01" end="2018-09-30" @change="bindDateChange">
            <view class="picker">
              {{date}}
            </view>
          </picker>
        </li>
      </ul>
      <ul class="other-list">
        <li>
          <span>大学</span>
          <picker mode="selector" :value="Index" :range="univer" @change="bindPickerChange">
            <view class="picker">
              {{univer[Index]}}
            </view>
          </picker>
        </li>
        <li>
          <span>年级</span>
          <picker mode="selector" :value="GradeIndex" :range="grade" @change="bindgradeChange">
            <view class="picker">
              {{grade[GradeIndex]}}
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
  import axios from 'axios'
export default {
    data () {
      return {
        univer: [
          '未设置', '清华大学', '北京大学', '上海交通大学', '南京大学', '武汉大学'
        ],
        grade: [
          '未设置', '大一', '大二', '大三', '大四'
        ],
        Index: 0,
        myChoose: 1,
        GradeIndex: 0,
        date: '未设置',
        picked: '1',
        imgUrl: '',
        textShow: '默认头像'
      }
    },
    beforeCreate () {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.imgUrl = res.userInfo.avatarUrl
            }
          })
        }
      })
    },
    methods: {
      imageSubmit: function () {
        console.log('上传图片')
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            this.imgUrl = res.tempFilePaths
            console.log(this.imgUrl)
            this.textShow = '已设置'
          }
        })
      },
      bindDateChange: function (e) {
        this.date = e.mp.detail.value
      },
      radioChange: function (e) {
        this.picked = e.mp.detail.value
      },
      formSubmit: function () {
        if (parseInt(this.Index) === 0 || this.date === '未设置' || parseInt(this.GradeIndex) === 0) {
          wx.showModal({
            title: '提示',
            content: '请将信息表填写完整',
            success: function (res) {
            }
          })
        } else {
          var sendData = {
            'username': 'root',
            'avatar': this.imgUrl,
            'birthday': this.date,
            'gender': this.picked,
            'grade': this.grade[this.GradeIndex],
            'collage': this.univer[this.Index],
            'location': '陕西西安'
          }
          wx.uploadFile({
            url: ' /user/info',
            filePath: this.imgUrl,
            formData: null,
            success: (res) => {
              console.log('上传成功')
            },
            fail: (res) => {
              console.log('上传失败')
            },
            complete: () => {
              console.log('上传完毕')
            }
          })
          axios.put('/user/info', sendData).then((res) => {
            if (res.data.message !== 'SUCCESS') {
              console.log('信息提交失败')
            } else {
              console.log('信息提交成功')
              var url = '/pages/index/main'
              wx.navigateTo({url})
            }
          }).catch((err) => {
            console.log(err)
            wx.showModal({
              title: '提示',
              content: '已提交',
              success: function (res) {
              }
            })
          })
        }
      },
      bindPickerChange: function (e) {
        this.Index = e.mp.detail.value
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
</style>
