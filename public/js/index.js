$(function(){
    if(window.Notification && Notification.permission !=="granted"){
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                console.log('grabbing permision')
                Notification.permission = status;
            }
        });
    }
    let button= document.getElementById('noti-test');
    button.addEventListener('click',function(){
        if(window.Notification && Notification.permission !=="granted"){
            var n = new Notification('Hi!');
        }else if(window.Notification && Notification.permission !== "denied"){
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                  Notification.permission = status;
                }
        
                // 如果用户同意了
                if (status === "granted") {
                  var n = new Notification("Hi!");
                }
        
                // 否则，我们可以让步的使用常规模态的 alert
                else {
                  alert("Hi!");
                }
              });
        }else{
            alert('Hi');
        }
    })
    
})