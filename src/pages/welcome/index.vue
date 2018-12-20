<template>
    <div>
        <button open-type="getUserInfo" @getuserinfo="bindinfo">授权进入</button>
    </div>
</template>
<script>
import {showModal,showToast,showLoading,hideLoading} from '../../utils/wxAPI.js'
import {getSettings,getUserInfo,jumpTo,switchTab} from '../../utils/utils.js'
import { login } from '../../../../../webProject/bangbang/src/utils/utils.js';
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
                console.log(res.code)
                var data = {
                    js_code:res.code
                }
                return getUserInfor(data)
            })
            .then((res)=>{
                console.log(res)
                showToast('授权登录成功','success',true,2000)
                store.commit('commitInfo',res.data[0])
                console.log(store.state.userInfo)
                setTimeout(()=>{
                    switchTab('../index/main')
                },2000)
            })
            .catch((err)=>{
                showToast('获取授权信息和用户信息失败，请稍后重试')
            })
        }
    }
}
</script>
<style>

</style>
