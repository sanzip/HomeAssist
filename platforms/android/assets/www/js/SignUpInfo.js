/**
 * Created by adore on 1/2/2016.
 */
var globalPersonalInfoValidator;
$(document).delegate("#personalInformation", "pageshow", function() {
    $("#email").focus();
    var username = window.localStorage.getItem("username");

});

var globalPersonalInfo = {
    isNewContact : true,

    resetAll : function(){
        globalPersonalInfo.isNewContact = true;
    }
};

appPersonalInfoPanel = {

    initialize: function(){

        globalPersonalInfoValidator = $( "#frmPersonalInfo" ).validate({
            rules: {
                name: { required: true },
                location: { required: true },
                uname: { required: true},
                passwordPInfo: { required: true},
                confirmPasswordPInfo: {required: true, equalTo: "#passwordPInfo"},
                phone: { required: true, regex: /^[0-9-+()]+$/ }

            },
            errorPlacement: function( error, element ) {
                error.insertAfter( element.parent() );
            }
        });
    },
    reset : function(){

        $("#frmPersonalInfo")[0].reset();
        globalPersonalInfoValidator.resetForm();
        globalPersonalInfo.resetAll();

    }

};


