/**
 * Created by HP-PC on 5/15/2016.
 */
(function ( $ ) {

    $.fn.imagePicker = function( options ) {

        // Define plugin options
        var settings = $.extend({
            // Input name attribute
            name: "images",
            // Classes for styling the input
            class: "form-control btn btn-default btn-block",
            // Icon which displays in center of input
            icon: "glyphicon glyphicon-plus"
        }, options );

        // Create an input inside each matched element
        var count=1;
        return this.each(function() {
            $(this).html(create_btn(this, settings, count));
            count++;
        });

    };

    // Private function for creating the input element
    function create_btn(that, settings, count) {
        // The input icon element
        var picker_btn_icon = $('<i class="'+settings.icon+'"></i>');
        // The actual file input which stays hidden
        var picker_btn_input = $('<input type="file" id="imagePicker_'+count+'" class="file_input" name="'+settings.name+'[]" />');
        // The actual element displayed
        var picker_btn = $('<div class="'+settings.class+' img-upload-btn" onclick="changeImage(\'imagePicker_'+count+'\',\'img-picker-'+count+'\','+count+')"></div>')
            .append(picker_btn_icon);
        $("#imageInputs").append(picker_btn_input);
        return picker_btn
    };

}( jQuery ));

$(document).ready(function() {
    $('.img-picker').imagePicker({name: 'images'});
})


/**
 * ---- Custom Methods Added
 * ---- By Bmax
 */
function changeImage(arg0,arg1,arg2){
    $("#"+arg0).trigger('click');
    FileChange(arg0,arg1,arg2);
}
function FileChange(arg0,arg1,arg2){
    $("#"+arg0).on('change', function(){ //on file input change
        var div_id = $(this).attr("data-id");
        var base_url = $(this).attr("data-icon");

        if (window.File && window.FileReader && window.FileList && window.Blob) //check File API supported browser
        {
            //$('#thumb_output_'+id).html(''); //clear html of output element
            var data = $(this)[0].files; //this file data
            $.each(data, function(index, file){ //loop though each file
                if(/(\.|\/)(gif|jpe?g|png)$/i.test(file.type)){ //check supported file type
                    var fRead = new FileReader(); //new filereader
                    fRead.onload = (function(file){ //trigger function on successful read
                        return function(e) {
                            createPreview(e.target.result,arg1,arg2);
                        };
                    })(file);
                    fRead.readAsDataURL(file); //URL representing the file's data.
                }
            });

        }else{
            alert("Your browser doesn't support File API!"); //if File API is absent
        }
    });
};
/**
 * Create Image Thumb and remove button
 * @param src
 * @returns {void|*|jQuery}
 */
function createPreview(src,arg1,arg2) {
    // The preview image
    var picker_preview_image = $('<img src="'+src+'" class="img-responsive img-rounded" />');
    // The remove image button
    var picker_preview_remove = $('<button type="button" class="btn btn-link" onclick="createBtn(\'imagePicker_'+arg2+'\',\'img-picker-'+arg2+'\','+arg2+')"><small>Remove</small></button>');
    // The preview element
    var picker_preview = $('<div class="text-center"></div>')
        .append(picker_preview_image)
        .append(picker_preview_remove);
    $("#"+arg1).html('');
    $("#"+arg1).append(picker_preview);
};

// Create Image Button to Select
function createBtn(source, div_id, count) {
    // reset File src
    $("#"+source).attr("src","");
    // The input icon element
    var picker_btn_icon = $('<i class="glyphicon glyphicon-plus"></i>');
    // The actual file input which stays hidden
    var picker_btn_input = $('<input type="file" id="imagePicker_'+count+'" class="file_input" name="images[]" />');
    // The actual element displayed
    var picker_btn = $('<div class="form-control btn btn-default btn-block img-upload-btn" onclick="changeImage(\'imagePicker_'+count+'\',\'img-picker-'+count+'\','+count+')"></div>')
        .append(picker_btn_icon);
    $("#"+div_id).html('');
    $("#"+div_id).append(picker_btn);
};