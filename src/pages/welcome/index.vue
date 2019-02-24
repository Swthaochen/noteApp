<template>
    <div class="container">
        <image src="../../images/beijing.jpg"/>
        <button open-type="getUserInfo" @getuserinfo="bindinfo">授 权 进 入</button>
    </div>
</template>
<script>
import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
import {getSettings,getUserInfo,jumpTo,switchTab,login} from '../../utils/utils.js'
import {getUserInfor} from '../../utils/API.js'
import store from '../../store/vuex.js'
export default {
    data(){

    },
    methods:{
        bindinfo(){
            getUserInfo().then((res)=>{
                console.log(res)
                return login()
            })
            .then((res)=>{
                var data = {
                    js_code:res.code
                }
                return getUserInfor(data)
            })
            .then((res)=>{
                wx.setStorageSync("cookieid", res.header["Set-Cookie"])
                showToast('授权登录成功','success',true,2000)
                store.commit('commitInfo',res.data.body[0])
                setTimeout(()=>{
                    switchTab('../index/main')
                },2000)
            })
            .catch((err)=>{
                console.log(err)
                showToast('获取授权信息和用户信息失败，请稍后重试')
            })
        }
    }
}
</script>
<style>
.container{
    padding: 0 0 ;
}
image{
    height: 100vh;
    width: 100vw;
}
button{
    position: absolute;
    bottom: 150rpx;
    background: #FFC53D;
    color: white;
    width: 300rpx;
    font-weight: bold;
    font-size: 40rpx;
}
</style>
