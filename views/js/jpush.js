document.getElementById('submit').onclick=function(){
    let title = document.querySelector('input[name=title]').value
    let content = document.querySelector('input[name=content]').value
    let transmissionContent = document.querySelector('input[name=transmissionContent]').value
    let badge = document.querySelector('input[name=badge]').value
    // let data = {title,content,transmissionContent,badge}
    // axios.post('/jpush',data).then((res)=>{
        //     console.log(res)
        // }).catch(e=>{
    //     console.log(e)
    // })
    let data = `title=${title}&content=${content}&transmissionContent=${transmissionContent}&badge=${badge}`
    ajax('POST','/jpush',data).then((res)=>{
        console.log(res)
    }).catch(e=>{
        console.log(e)
    })
}