function changeTime(msg){
    let date = new Date(msg)
    let hour,minite,second
    if(date.getHours() < 10){
      hour = '0' + date.getHours()
      console.log(hour)
    }else{
      hour = date.getHours()
    }
    if(date.getMinutes() < 10){
      minite = '0' + date.getMinutes()
    }else{
      minite = date.getMinutes()
    }
    if(date.getSeconds() < 10){
      second = '0' + date.getSeconds()
    }else{
      second = date.getSeconds()
    }
    return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日   ' + hour + ':' + minite + ':' + second
  }
  
  export default{
    changeTime
  }
    
  