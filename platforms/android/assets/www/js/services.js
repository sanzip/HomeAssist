
function IsUserLoggedOn() {
    var username = window.localStorage.getItem("username");

    console.log(" Processing IsUserLoggedOn() Username: " + username);
    return !(username == null || username == "null" || username == undefined || username == "");
}
function Login(e){
    var userName = $("#username").val();
    var password = $("#password").val();
    var data = "Username="+userName+"&Password="+password;
    var dataName=["login","name","location","phoneNumber","emailAddress","username"];
    if(userName == "" || password == ""){
        showAlert("Please enter both email/username and password.");
        return;
    }
    $.ajax({
        url:'http://192.168.0.58/HomeAssist/login.php',
        type:'POST',
        data:data,
        dataType: "JSON",
        success:function(data){
            if(data[dataName[0]]==true){
                alert("Logged in successfully!!");
                for(var i=0;i<dataName.length;i++){
//                   alert(data[dataName[i]]);
                    window.localStorage.setItem(dataName[i], data[dataName[i]]);
                    $.mobile.page.prototype.options.domCache = true;
//
                }

            }else{
                showAlert("Username and Password did not match..");
                    window.location.hash="login";
            }

        },
        error:function(error){
            showAlert("Unable to connect to server.")
            window.location.hash="login"
        }

    });
    window.location.hash="homescreen";
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function VerifyUser(){

    var username = window.localStorage.getItem("username");
    var password = window.localStorage.getItem("password");

    if (username == null || username == "null" || username == undefined || username == "" || password == null || password == "null" || password == undefined) {
        window.location.hash = "#login";
    }
    else {
        window.location.hash = "#homescreen";
    }
}
