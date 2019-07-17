const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const cors = require('cors')
const qs = require('querystring')

let app = express()
let server = http.createServer(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',express.static('views'));
server.listen(8081,()=>{
    console.log('监听'+server.address().port)
})

app.get('/',function(req,res){
    res.render('index')
})

//配置跨域中间件
app.use(cors({
    origin:["http://127.0.0.1",'http://localhost:8081'],  //允许来自某些域名跨域访问
    credentials:true              //访问时请带cookie
}));

app.post('/jpush', function(req,res){
    // let result = {title, content, transmissionContent, badge} = req.body
    /**---原生ajax请求----**/
    var post = ''; 
    req.on('data',(chunk)=>{
        post += chunk
    })
    req.on('end',() => {
        post = qs.parse(post)
        let result = {title, content, transmissionContent, badge} = post
    /**---原生ajax请求----**/
        if(title || content || transmissionContent || badge){
            var JPush = require("jpush-async").JPushAsync
            var client = JPush.buildClient('89e051adea35be0cfcd976fb', '7581c41564bd2e2cf4988222')
            //easy push
            client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification('Hi, JPush', JPush.ios(content,'sound',badge), JPush.android('android alert', null, 1))
            .setMessage(title,transmissionContent,'text',{'key':'value'}) //设置透传信息
            .setOptions(null,null,null,true)
            .send()
            .then(function(result) {
                console.log(result)
            }).catch(function(err) {
                console.log(err)
            });
            res.send(result)
        } else {
            res.send({'message':'至少填写一个参数'})
        }
    /**---原生ajax请求----**/
    })
    /**--------**/
})

//class tool{
//	constructor(){
//		this.stack = []
//	}
//	sub(fn){
//		this.stack.push(fn)
//	}
//	pub(){
//		this.stack.forEach(fn=>fn())
//	}
//}
//
//var t = new tool()
//t.sub(function(){console.log(1)})
//t.sub(function(){console.log(12)})
//t.sub(function(){console.log(123)})
//t.pub()
