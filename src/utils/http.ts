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
     console.log(options)
    }
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)