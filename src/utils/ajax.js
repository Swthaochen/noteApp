const ajax = function(url,methods='GET',data={}){
    let cookie = wx.getStorageSync("cookieid")
    console.log(cookie)
    if(cookie == '')
        return new Promise((resolve,reject)=>{
            wx.request({
                url: url, 
                method:methods,
                data: data,
                success (res) {
                    resolve(res)
                },
                fail(err){
                    reject(err)
                }
            })
        })
    else
        return new Promise((resolve,reject)=>{
            wx.request({
                url: url, 
                method:methods,
                header: {'cookie':cookie},
                data: data,
                success (res) {
                    resolve(res)
                },
                fail(err){
                    reject(err)
                }
            })
        })
}
export default ajax