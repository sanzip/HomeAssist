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
                url:'http://localhost:81/HomeAssist/register.php',
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
                url:'http://localhost:81/HomeAssist/fetchCategory.php',
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



        $(function(){
            $("#pButton").on("click",function(){
                alert("Showing");
                $("#pro").show();
                $("#seek").hide();
                $.ajax({
                    url:'http://localhost:81/HomeAssist/fetchCategory.php',
                    type:'POST',
                    dataType: "JSON",
                    success:function(data){
                        var i=1;
                        for(var j=0;j<data.length;j++){
                            $("#proCat").append($('<option value="'+data[j][i]+'">'+data[j][i]+'</option>'));
                            i++;
                        }
                    }
                });
            });
            $("#sButton").on("click",function(){
                $("#pro").hide();
                $("#seek").show();
                $.ajax({
                    url:'http://localhost:81/HomeAssist/fetchCategory.php',
                    type:'POST',
                    dataType: "JSON",
                    success:function(data){
                        alert(data);
                        var i=1;
                        for(var j=0;j<data.length;j++){
                            $("#seekCat").append($('<option value="'+data[j][i]+'">'+data[j][i]+'</option>'));
                            i++;
                        }
                    }
                });
            });

            $("#proCat").on("change",function(){
                alert("Select Changed");
                fetchData("provider")
            });
            $("#seekCat").on("change",function(){
                alert("Select Changed");
                fetchData("seeker")
            });


        });




        function fetchData(whichCat) {
            if (whichCat == "provider") {
                fetchSubscriber();
            } else {
                fetchTask();
            }
        }

        function fetchSubscriber(){
            $("#pro").show();
            $("#seek").hide();
            $("#subscriberId").show();
//            $("#subscriberId").empty();
            var categoryTitle = $("#categoryTitle").val();
            var data = "categoryTitle="+categoryTitle;
            var dataName=["Name","Location","PhoneNo"];
            $.ajax({
                url:'http://localhost:81/HomeAssist/subscriberList.php',
                type:'POST',
                data:data,
                dataType:"JSON",
                success:function(data){
                    if(data!=null){

                        for(var i=0;i<data.length;i++){
                            var taskD = $("#subList");
                            for(var k=0;k<dataName.length;k++){
                                $(taskD).append($('<li>"'+data[i][dataName[k]]+'"</li>'))
                            }
                        }
                    }else{

                    }

                }
            })
        }


        function fetchTask(){
            $("#pro").hide();
            $("#seek").show();
            $("#taskTableId").show();
//            $("#taskTableId").empty();
            var categoryTitle = $("#categoryTitle").val();
            var taskD = $("#taskTableId").find("#taskTableBody");
            taskD.empty();
            var data = "categoryTitle="+categoryTitle;
            var dataName=["Title","Description","StartTime","EndTime","Name","Location","PhoneNo","Email"];
            $.ajax({
                url:'http://localhost:81/HomeAssist/fetchTask.php',
                type:'POST',
                data:data,
                dataType:"JSON",
                success:function(data){
                    for(var i=0;i<data.length;i++){
                        var taskD = $("#taskTable").find("#taskBody");
                        taskD.append('<tr id="'+i+'"></tr>');
                        for(var k=0;k<dataName.length;k++){
                                $(taskD).find("#"+i).append($('<td>"'+data[i][dataName[k]]+'"</td>'))
                            }
                    }
                }
            })
        }



        function showLoading() {
            $('.ajax-panel').html('<div class="overlay"></div><div class="loading">&nbsp;</div>');
        }

        function hideLoading() {
            $('.ajax-panel').html('');
        }

        $("#addSubscriber").on("click",function(e){
            var data = "CategoryTitle="+$("#categoryTitle").val()+"&Username="+window.localStorage.getItem("username");
            $.ajax({
                url:'http://localhost:81/HomeAssist/saveSubscriber.php',
                type:'POST',
                dataType: "JSON",
                data:data,
                success:function(data) {
                    if (data != null) {
                        if (data["result"] == "success") {
                            showAlert(data["subscriber"])
                            window.location.hash = "homescreen";
                        } else {
                            showAlert(data["subscriber"]);
                            window.location.hash = "homescreen";
                        }
                    } else {
                        showAlert("Failed to build a connection with server");
                        window.location.hash = "homescreen";
                    }
                }
                });
        });

        $("#addSeeker").on("click",function(e){
            var data = $("#seekerDataForm").serialize();
            data = data+"&Username="+window.localStorage.getItem("username");
            $.ajax({
                url:'http://localhost:81/HomeAssist/saveTask.php',
                type:'POST',
                dataType: "JSON",
                data:data,
                success:function(data){
                    if(data["result"]=="success"){
                        showAlert(data["task"]);
                        window.location.hash="homescreen";
                    }else{
                        showAlert(data["task"]);
                        window.location.hash="homescreen";
                    }
                }
            });
        });



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


