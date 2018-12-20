import ajax from './ajax'
const getUserInfor = (data)=>{
    // return ajax('http://132.232.37.121:8002/index','GET',data)
    return ajax('http://localhost:8002/index','GET',data)
}
const checkUserInfor = (id)=>{
    return ajax(`http://localhost:8002/check?id=${id}`,'GET',data)
}
export {
    getUserInfor,
    checkUserInfor
}