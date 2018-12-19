import ajax from './ajax'
const getUserInfor = (data)=>{
    return ajax('http://localhost:8002/index','GET',data)
}

export {
    getUserInfor,
}