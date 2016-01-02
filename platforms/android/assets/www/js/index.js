$(document).delegate("#login", "pageshow", function() {
    appPersonalInfoPanel.reset();

});
var dbConnection=null;
var isLastImport = false;
var isFirstSignUp=true;
var db ;
var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
    onDeviceReady: function() {
        db = window.openDatabase("Database", "1.0", "HomeAssist", 5242880);
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
        $.mobile.buttonMarkup.hoverDelay = 50;
        $.mobile.defaultDialogTransition = "none";
        $.mobile.defaultPageTransition = "none";
        window.location.hash="login";

        $("#LoginButton").on("click", function(e){
            console.log("DW: Processing login button....");

            Login(e);
        });

        $("#btnSave").on("click", function(e){

            alert("Calling");
//            var form = $( "#frmPersonalInfo" );
//            form.validate();
//
//            if (!form.valid()){
//                globalPersonalInfoValidator.focusInvalid();
//                return;
//            }
            alert("here");
            register();


        });
        function register(){
            var data = $("#frmPersonalInfo").serialize();
            alert(data);
            $.ajax({
                url:'http://192.168.0.58/HomeAssist/register.php',
                type:'POST',
                data:data,
                dataType:"JSON",
                success:function(data){
                    if(data["result"]=="success"){
                        showAlert(data["register"])
                    }else{
                        showAlert(data["register"]);
                        window.location.hash="personalInformation";

                    }

                }
            });
            window.location.hash="login";

        }

        function fetchCategory(){
            $("#categoryTitle").empty();
            $("#categoryTitle").append($('<option value="">'+"Select Option"+'</option>'));
            $.ajax({
                url:'http://localhost/HomeAssist/fetchCategory.php',
                type:'POST',
                dataType: "JSON",
                success:function(data){
                    var i=1;
                    for(var j=0;j<data.length;j++){
                        $("#categoryTitle").append($('<option value="'+data[j][i]+'">'+data[j][i]+'</option>'));
                        i++;
                    }
                }
            });
        }

        function showLoading() {
            $('.ajax-panel').html('<div class="overlay"></div><div class="loading">&nbsp;</div>');
        }

        function hideLoading() {
            $('.ajax-panel').html('');
        }





        $("#btnsignup").on("click", function(e){

            window.location.hash='#personalInformation';


        });


















        appPersonalInfoPanel.initialize();


        VerifyUser();

    },
    onBackKeyDown:function() {
        var hashId = window.location.hash;
        if (hashId == null || hashId == "" || hashId == "#homescreen" || hashId == "#login") {
            // Define the Dialog and its properties.
//            if(confirm('Do you want to exit application?')){
//                navigator.app.exitApp();
//            }
            navigator.notification.confirm(
                'Do you want to exit application?',  // message
                function(result){
                    if(result == 1){
                        navigator.app.exitApp();
                    }
                }
            );
        }else{
            navigator.app.backHistory();
        }
    }
};

function showAlert(msg) {
    navigator.notification.alert(
        msg,  // message
        null,         // callback
        'Alert',            // title
        'Ok'                  // buttonName
    );
}


