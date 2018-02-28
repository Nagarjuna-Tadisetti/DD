$(document).ready(function(){
    //setCookie('login_flag','set',3);
    //delete_cookie('login_flag');
if(getCookie('login_flag') == 'set'){
   var topbarTemplate = `<div style="display: inline-block;">&nbsp;</div>
            <div style="display: inline-block;float: right;">
                <span style="color:white">Welcome</span>
                <div class="sign-in">
                <a href="LogoutServelet" class="sign-in">Logout</a>
                </div>
              </div>`;
    $('.my-top-bar').html(topbarTemplate);
    var name = getCookie('user');
    $('.my-top-bar span').html('Welcome user &nbsp;&nbsp;'+name);
   
   }

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
    
});