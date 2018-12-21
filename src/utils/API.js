import ajax from './ajax'
const getUserInfor = (data)=>{
    // return ajax('http://132.232.37.121:8002/index','GET',data)
    return ajax('http://localhost:8002/index','GET',data)
}
const checkUserInfor = (id)=>{
    return ajax(`http://localhost:8002/check?id=${id}`,'GET',data)
}
const updateUserInfo = (data)=>{
    return ajax(`http://localhost:8002/updateinfo`,'GET',data)
}
const getWorkList = (data)=>{
    return ajax(`http://localhost:8002/getTodayList`,'GET',data)
}
const configFinish = (id)=>{
    return ajax(`http://localhost:8002/configFinish?id=${id}`,'GET')
}
export {
    getUserInfor,
    checkUserInfor,
    updateUserInfo,
    getWorkList,
    configFinish
}