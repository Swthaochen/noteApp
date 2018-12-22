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
const getWorkList = (id)=>{
    return ajax(`http://localhost:8002/getTodayList?id=${id}`,'GET')
}
const configFinish = (id)=>{
    return ajax(`http://localhost:8002/configFinish?id=${id}`,'GET')
}
const insertWork = (data)=>{
    return ajax(`http://localhost:8002/insertWork`,'GET',data)
}
const getWorkInfo = (id)=>{
    return ajax(`http://localhost:8002/getWorkInfo?id=${id}`,'GET')
}
const getDateWork = (date,id)=>{
    return ajax(`http://localhost:8002/getDateWork?date=${date}&id=${id}`,'GET')
}
export {
    getUserInfor,
    checkUserInfor,
    updateUserInfo,
    getWorkList,
    configFinish,
    insertWork,
    getWorkInfo,
    getDateWork
}