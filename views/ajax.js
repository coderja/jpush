function ajax(method,url,data,dataType){
    try{
        return new Promise((resolve,reject)=>{
            var xhr = null ;
           
            dataType = dataType || 'json'
           
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest()
             } else {
                 xhr = new ActiveXObject('Microsoft.XMLHTTP')
             }

             if(method.toLowerCase()=='get' && data!==undefined){
                 url+='?'+data
             }

             xhr.open(method,url)
             
             xhr.onreadystatechange = function(){
                 if(xhr.status==200 && xhr.readyState == 4){
                     if(dataType.toLowerCase()=='json'){
                          resolve(JSON.parse(xhr.responseText))
                     } else{
                         resolve(response)
                     }
                 }  
             }
             
             if(method.toLowerCase()=='post'){
                 xhr.setRequestHeader('Content-type','application/www-form-urlencoded')
                 xhr.send(data)
             } else {
                 xhr.send(null)
             }
         })
     }catch(e){
         reject(e)
     }
 }
