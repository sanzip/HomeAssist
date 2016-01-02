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
                url:'http://192.168.0.52/HomeAssist/fetchCategory.php',
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

        function appendCategory(whichCat){
            $("#catList").empty();
            $("#subScriberForm").appendTo("#catList");
            var acDiv = $("#catList").find("#subScriberForm");
            acDiv.find("#addSubscriber").remove();
            acDiv.find("categoryTitle").attr("onChange",'fetchData("'+whichCat+'")')
        }

        function fetchData(whichCat) {
            if (whichCat == "seekers") {
                fetchSubscriber();
            } else {
                fetchTask()
            }
        }

        function fetchSubscriber(){
            var categoryTitle = $("#categoryTitle").val();
            var data = "categoryTitle="+categoryTitle;
            $("#subScriberTable").empty();
            var subScriberTable = document.createElement("div");
            subScriberTable.setAttribute("id", "subScriberTable");
            $("#catList").append(subScriberTable);
            subScriberTable.append("<table id='subcTable'></table>");
            $("#subcTable").append("<tr><th>Name</th><th>Location</th><th>Phone Number</th></tr>");
            $("#subcTable").append("<tbody id='subcTableBody'></tbody>");
            var dataName=["Name","Location","PhoneNo"];
            $.ajax({
                url:'http://192.168.0.52/HomeAssist/subscriberList.php',
                type:'POST',
                data:data,
                dataType:"JSON",
                success:function(data){
                    if(data!=null){

                        for(var i=0;i<data.length;i++){
                            var taskD = $("#subcTable").find("#subcTableBody");
                            taskD.append('<tr id="'+i+'"></tr>');
                            for(var k=0;k<dataName.length;k++){
                                $(taskD).find("#"+i).append($('<td>"'+data[i][dataName[k]]+'"</td>'))
                            }

                        }
                    }else{

                    }

                }
            })
        }


        function fetchTask(){
            $("#taskTableDiv").empty();
            var subScriberTable = document.createElement("div");
            subScriberTable.setAttribute("id", "taskTableDiv");
            $("#catList").append(subScriberTable);
            subScriberTable.append("<table id='taskTable'></table>");
            $("#taskTable").append("<tr><th>Title</th><th>Description</th><th>StartTime</th><th>End Time</th><th>Name</th>" +
            "<th>Location</th><th>Phone No</th><th>Email</th></tr>");
            $("#taskTable").append("<tbody id='taskTableBody'></tbody>");
            var categoryTitle = $("#categoryTitle").val();
            var taskD = $("#taskTable").find("#taskTableBody");
            taskD.empty();
            var data = "categoryTitle="+categoryTitle;
            var dataName=["Title","Description","StartTime","EndTime","Name","Location","PhoneNo","Email"];
            $.ajax({
                url:'http://192.168.0.52/HomeAssist/fetchTask.php',
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
                url:'http://192.168.0.58/HomeAssist/saveSubscriber.php',
                type:'POST',
                dataType: "JSON",
                data:data,
                success:function(data){
                    if(data["result"]=="success"){
                        showAlert(data["subscriber"])
                        window.location.hash="homescreen";
                    }else{
                        showAlert(data["subscriber"]);
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


