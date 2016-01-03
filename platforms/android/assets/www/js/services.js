
function IsUserLoggedOn() {
    var username = window.localStorage.getItem("username");

    console.log(" Processing IsUserLoggedOn() Username: " + username);
    return !(username == null || username == "null" || username == undefined || username == "");
}

//function Login(e){
//
//    var username = $("#username").val();
//    var password = $("#password").val();
//
//
//    if(username == "" || password == ""){
//        showAlert("Please enter both email/username and password.");
//        return;
//    }
//
//    $.ajax({
//        type: "POST",
//        url: baseServiceUrl.concat("HomeAssist/login.php"),
//        data: {Username: username, Password: password},
//
//
//        success: function(data){
//            alert(" inside LoginButton()  " + JSON.stringify(data));
//
//            if (data != null) {
//
//                var result = $.parseJSON(data);
//                alert(JSON.stringify(result));
//
//                if (result.Error == null || result.Error == "") {
//                    $("#username").val('');
//                    $("#password").val('');
//                    window.localStorage.setItem("username", result.Email);
//                    window.localStorage.setItem("password", result.Password);
//                    window.localStorage.setItem("roleid", result.RoleId);
//                    window.localStorage.setItem("personalId",result.Id);
//                    window.localStorage.setItem("isdeleted",result.is_deleted);
//                    $.mobile.page.prototype.options.domCache = true;
//
//                    //Sync personal info to local DB
//                    var data = {
//                        is_new_contact: false,
//                        first_name : result.FirstName,
//                        last_name : result.LastName,
//                        email : result.Email,
//                        password: result.Password,
//                        phone1 : result.Phone1,
//                        phone2 : result.Phone2,
//                        phone3 : result.Phone3,
//                        country: result.Country,
//                        privacy: result.Privacy,
//                        phone1_country_code: result.Phone1_CountryCode,
//                        phone2_country_code: result.Phone2_CountryCode,
//                        phone3_country_code: result.Phone3_CountryCode
//
//                    };
//
//                        window.location.hash = "#homeScreen";
//
//
//
////                   else if(result.RoleId==0 && result.is_deleted==0)
////                    {
////                        window.location.hash = "#AdminhomeScreen";
////                      // showAlert("admin page is under construction");
////                    }
//
//
//
//                }else {
//                    showAlert(result.Error);
//                }
//            }else {
//                showAlert("Error: Network is not available.");
//            }
//        },
//        error: function (e) {
//
//            alert(" Error received inside LoginButton() of index.js. Error: " + JSON.stringify(e));
//            showAlert("Error: Network is not available.");
//        }
//    });
//}
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

        }
//        error:function(error){
//            showAlert("Unable to connect to server.")
//            window.location.hash="login"
//        }

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
        window.location.hash = "#homeScreen";
    }
}
