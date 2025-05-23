import { useMemberStore } from "@/stores/modules/member"

const baseURL='https://pcapi-xiaotuxian-front-devtest.itheima.net'

//添加拦截器
const httpInterceptor={
    //拦截前触发
    invoke(options:UniApp.RequestOptions){
     //1.拼写非http来头地址
     if(!options.url.startsWith('http')){
        options.url=baseURL+options.url
     }
     //2.请求超时，默认60s
     options.timeout=10000
     //3.添加小程序端请求头标识
     options.header={
        ...options.header,
        'source-client':'miniapp',
     }
     // 4.添加token
     const memberStore=useMemberStore() 
     const token=memberStore.profile?.token
     if(token){
        options.header.Authorization=token
     }
     console.log(options)
     
    }
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)

interface Data<T>{
   code:string,
   msg:string,
   result:T
}
//2.2添加类型，支持泛型
export const http=<T>(options:UniApp.RequestOptions)=>{
   //1.返回Promise对象
   return new Promise<Data<T>>((resolve,reject)=>{
       uni.request({
          ...options,
          //2。请求成功
          success(res){
            //状态码 2XX axios就是这样设计的
            if(res.statusCode>=200&&res.statusCode<300){
               resolve(res.data as Data<T>)
            }else if(res.statusCode===401){
               //401错误 -》清理用户信息 跳转登录页
               const memberStore=useMemberStore()
               memberStore.clearProfile()
               //跳转登录页
               uni.navigateTo({url:'/pages/login/login'})
               reject(res)
            }else{
               //其他错误
               uni.showToast({
               icon:'none',
               title: (res.data as Data<T>).msg||'请求错误'
               })
               reject(res)
               
            }
           
          },
          //响应失败
          fail(err){
            uni.showToast({
               icon: 'none',
               title:'网络错误，换个网络试试',

            })
            reject(err)
          }

       })
   })
}
