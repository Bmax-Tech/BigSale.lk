/**
 * Created by HP-PC on 5/12/2016.
 */
/**
 * Set Up Secure Connection With BackEnd
 */
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
/*
 * ~~~~~~~~~~~~~~~~~~~~~
 * Global Variables >>>>
 * ~~~~~~~~~~~~~~~~~~~~~
 */

var URL='/ajax';// Default Ajax Posting URL
var ALPH_PATTERN = /^[A-Za-z]+$/;//Use to check alphabetical pattern
var NUM_PATTERN = /[0-9]|\./;//Use to check numerical pattern
var EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//Use to check email`s pattern
var PHONE_PATTERN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[ ]?([0-9]{4})$/;//Use to check phone number pattern
var NIC_PATTERN = /^\(?([0-9]{9})\)?[Vv]$/;//Use to check phone number pattern
var AJAX_CHECK_EMAIL = true; // Status after checking email
var AJAX_CHECK_USERNAME = true; // Status after checking username
var PASSWORD_PATTERN = false;// Status of password pattern
var CAPTCHA_VERIFY = false;// Status of the captcha verification
var LOCALHOST_PREFIX = "BigSale.lk/";
var routes = {
    'CHANGE_SIDE_TAB':LOCALHOST_PREFIX+'AdminPanel/ChangeSideTab',
    'SAVE_PRODUCT' : LOCALHOST_PREFIX+'AdminPanel/SaveProduct'
};

/*
 * ~~~~~~~~~~~~~~~~~~~~~
 * Global Variables <<<<
 * ~~~~~~~~~~~~~~~~~~~~~
 */


$(window).load(function() {
    $("html").addClass("block_html");
    ChangeTab("Home","FIRST_TIME");
});

/*
 * ~~~~~~~~~~~~~~~~~~~~~
 * Global Functions >>>>
 * ~~~~~~~~~~~~~~~~~~~~~
 */

/*
 * function checks for input text is empty or not
 */
function valid_length_input(para_1){
    if($("input[name="+para_1+"]").val().length == 0){
        /* return true when input field is empty */
        return true;
    }else{
        /* return false when input field has some value */
        return false;
    }
};

/*
 *  function check whether input field contain only letter
 */
function check_input_no_num(para_1){
    if(ALPH_PATTERN.test($("input[name="+para_1+"]").val())){
        /* if all are letters return true */
        return false;
    }else{
        /* if some numbers found return false */
        return true;
    }
};

/*
 * ~~~~~~~~~~~~~~~~~~~~~
 * Global Functions <<<<
 * ~~~~~~~~~~~~~~~~~~~~~
 */

/**
 * ChangeTab function used for invoke Side panel tab changes
 * @param arg0 -> Parent Tab
 * @param arg1 -> Child Tab
 * @constructor
 */
function ChangeTab(arg0,arg1){
    $("#loading_progress").css("width",1+"%");
    $("#content_loading").fadeIn();
    $("#PAGE_CONTAINER").html("");
    RequestAjax(arg0,arg1);
};

/**
 * Global Ajax Request
 * @param arg0 -> Route
 * @param arg1 ->
 */
function RequestAjax(arg0,arg1){
    var newUrl = "/"+routes.CHANGE_SIDE_TAB;
    if(arg1 != "FIRST_TIME"){
        var dataString = "pageType="+arg0+''+arg1;
    }else{
        var dataString = "pageType="+arg0;
    }
    $.ajax({
        xhr: function()
        {
            var xhr = new window.XMLHttpRequest();
            //Upload progress
            xhr.upload.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $("#loading_progress").css("width",percentComplete+"%");

                }
            }, false);
            //Download progress
            xhr.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                }
            }, false);
            return xhr;
        },
        type:'POST',
        dataType:'json',
        data:dataString,
        url: newUrl,
        cache: false,
        success: function(response){
            $("#PAGE_CONTAINER").html(response.page);
            $("#loading_progress").css("width",100+"%");
            // Append Scripts Only when Home Loads First Time
            if(arg1 == "FIRST_TIME"){
                AppendScripts();
                LOAD_STATUS=false;
            }
            $("#content_loading").fadeOut();
            $("html").removeClass("block_html");
        },
        error: function(){
            console.log("Error -> when loading "+newUrl+" with ("+dataString+")");
        }
    });
};

function AppendScripts(){
    var PARENT = $("#SCRIPTS").attr("data-type");
    var txt = "<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->" +
        "<script>$.widget.bridge('uibutton', $.ui.button);</script>" +
        '<script src="'+PARENT+'assets/Admin/plugins/morris/morris.min.js"></script>' +
        '<!-- Sparkline -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/sparkline/jquery.sparkline.min.js"></script>' +
        '<!-- jvectormap -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>' +
        '<script src="'+PARENT+'assets/Admin/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>' +
        '<!-- jQuery Knob Chart -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/knob/jquery.knob.js"></script>' +
        '<!-- daterangepicker -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/daterangepicker/daterangepicker.js"></script>' +
        '<!-- datepicker -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/datepicker/bootstrap-datepicker.js"></script>' +
        '<!-- Bootstrap WYSIHTML5 -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>' +
        '<!-- Slimscroll -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/slimScroll/jquery.slimscroll.min.js"></script>' +
        '<!-- FastClick -->' +
        '<script src="'+PARENT+'assets/Admin/plugins/fastclick/fastclick.min.js"></script>' +
        '<!-- AdminLTE App -->' +
        '<script src="'+PARENT+'assets/Admin/dist/js/app.min.js"></script>' +
        '<!-- AdminLTE dashboard demo (This is only for demo purposes) -->' +
        '<script src="'+PARENT+'assets/Admin/dist/js/pages/dashboard.js"></script>' +
        '<!-- AdminLTE for demo purposes -->' +
        '<script src="'+PARENT+'assets/Admin/dist/js/demo.js"></script>';
    $("#SCRIPTS").html(txt);
};


/**
 * Options Picker
 * Add Dynamically New input fields
 * Ex :- Add Product Page Features
 */
function OptionsPicker(arg0,arg1,arg2,arg3){
    var current = parseInt($("#"+arg3).html());
    if(arg1 == "+"){
        if(current<arg2) {
            current++;
            for (var i = 1; i <= arg2; i++) {
                if (i <= current) {
                    $("#" + arg0 + "" + i).fadeIn();
                } else {
                    $("#" + arg0 + "" + i).hide();
                    $("#" + arg0 + "input_" + i).val("");
                }
            }
            $("#" + arg3).html(current);
        }
    }else{
        if(current > 1) {
            current--;
            for (var i = 1; i <= arg2; i++) {
                if (i <= current) {
                    $("#" + arg0 + "" + i).fadeIn();
                } else {
                    $("#" + arg0 + "" + i).hide();
                    $("#" + arg0 + "input_" + i).val("");
                }
            }
            $("#" + arg3).html(current);
        }
    }
};

/**
 * Validate form data
 * then open confirmation message
 * @param arg0
 * @constructor
 */
function Validate(arg0){
    if(arg0 == "productAddForm"){
        // Product Add Page Run Validation
        if(ProductAdd()){
            $("#confirmMessage").fadeIn(500);
        }
    }
};

/**
 * ----- Validation -----
 * Product Add Validation
 */
function ProductAdd(){
    // Check for Features
    var featuresStatus = true;
    for(var i=1;i<=parseInt($("#features_count").html());i++){
        if(valid_length_input("feature_"+i)){
            featuresStatus = false;
        }
    }

    if($("#categoryOPT").val() == "" ||
        $("#subcategoryOPT").val() == "" ||
        valid_length_input("productName") ||
        valid_length_input("productBrand") ||
        $("#description").val() == "" ||
        valid_length_input("price") || 
        !featuresStatus || 
        valid_length_input("guarantee") || 
        valid_length_input("inStocks")){
        
        $("#alertPopup").slideToggle().delay(2000).slideToggle();
        return false;
    }else{
        return true;
    }
};

/**
 * -------------------------------------------------------------
 */

/**
 * Confirmation Message
 */
function Confirm(arg0,arg1){
    if(arg0 == "close"){
        $("#confirmMessage").fadeOut(500);
    }else if(arg0 == "save"){
        Save(arg1);
    }
};

/**
 * Loading Messages
 */
function LoadingMessages(arg0){
    if(arg0 == "productAddForm"){
        $("#"+arg0+"Savebtn").unbind('click');
    }
    $(this).css({'cursor':'wait'});
};

/**
 * Success Massages
 */
function SuccessMessages(arg0){
    if(arg0 == "productAddForm"){
        $("#"+arg0+"Savebtn").bind('click');
        $("#confirmMessage").fadeOut();
        $("#successPopup").fadeIn().delay(1500).fadeOut();
    }
    $(this).css({'cursor':'default'});
};

/**
 * Fail Warning Massages
 */
function FailMessages(arg0){
    if(arg0 == "productAddForm"){
        $("#"+arg0+"Savebtn").bind('click');
        $("#confirmMessage").fadeOut();
        $("#failPopup").fadeIn().delay(1500).fadeOut();
    }
    $(this).css({'cursor':'default'});
};

/**
 * Save Function
 * Which sends data to back end with form data attached
 */
function Save(arg0){
    /* Loading Function */
    LoadingMessages(arg0);
    var formData = new FormData($('#'+arg0)[0]);
    var newURL = "/"+routes.SAVE_PRODUCT;
    $.ajax({
        method: 'POST',
        url: newURL,
        data: formData,
        // THIS MUST BE DONE FOR FILE UPLOADING
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            if(data.response = "SUCCESS"){
                /* Success Function */
                SuccessMessages(arg0);
            }else{
                /* Fail Function */
                FailMessages(arg0);
            }
        }
        // ... Other options like success and etc
    })
};

/**
 * -------------------------------------------------------------
 */
