window.fbAsyncInit = function() {
    FB.init({
      appId      : '539116639521636',
      xfbml      : true,
      version    : 'v2.0',
      cookie     : true
    });
    initialize();
};
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

    var user;

function initialize() {


    var baseUrl = "https://graph.facebook.com/v2.1/";
    getLoginStatus();
    $("#fb-login").click(function(){
        getLoginStatus(login);
    })
    $("#post-now").click(function(){
        $("#post-form").attr("action","/post-now").submit();
    })
    $("#fb-logout").click(logout);

    $("#post-form [name='date_to_post']").keypress(function(ev){
        ev.preventDefault();
    });

    $("#post-form").submit(function(){
        $("#post-form [name='access_token']").val(user.accessToken);
        $("#post-form [name='fbID']").val(user.userID);
        var date= new Date($("#post-form [name='date_to_post']").val());
        if(date<new Date()){
            alert('Invalid Date');
            return false;
        }
    });

    function getLoginStatus(callback){
        FB.getLoginStatus(function(response){
            if(response.status=="connected"){
                getFBresponse(response);
                toggleLogin();
            }else if(typeof callback === 'function' && callback()){
                callback(response);
            }
        });
    }
    
    function getFBresponse(response){
        user=response.authResponse;
        if(user){
            $("#list").attr("href","/list/"+user.userID);
        }else{
            alert("Please Login");
        }
        
    }
    function login(){
        FB.login(function(response){
            if(response.authResponse){
                getFBresponse(response);
                toggleLogin();
            }
        }, {scope: 'publish_actions',return_scopes:true});
    }
    function logout(){
        FB.logout(function(){
            toggleLogin();
            user=null;    
        });
    }

    function toggleLogin(){
        $("#fb-login,#fb-logout").toggle();
    }
}

$(function () {
    $('#datetimepicker').datetimepicker({ startDate: new Date() });
});