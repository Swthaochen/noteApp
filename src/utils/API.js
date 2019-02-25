import ajax from './ajax'
const getUserInfor = (data)=>{
    return ajax('http://132.232.37.121:3000/noteapp/getUserInfo','GET',data)
}
const checkUserInfor = (id)=>{
    return ajax(`http://132.232.37.121:8002/check?id=${id}`,'GET',data)
}
const updateUserInfo = (id,data)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/information/${id}`,'POST',data)
}
const getWorkList = (id)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/today_work/${id}`,'GET')
} 
const configFinish = (id)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/configFinish?${id}`,'GET')
}
const insertWork = (id,data)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/insert_work/${id}`,'post',data)
}
const getWorkInfo = (id)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/getWorkInfo?${id}`,'GET')
}
const getDateWork = (id,date)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/getDateWork?/${id}/${date}`,'GET')
}
const getUserInformation = (id)=>{
    return ajax(`http://132.232.37.121:3000/noteapp/getUserInfor/${id}`,'GET')
}
export {
    getUserInfor,
    checkUserInfor,
    updateUserInfo,
    getWorkList,
    configFinish,
    insertWork,
    getWorkInfo,
    getDateWork,
    getUserInformation
}