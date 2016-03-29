// This Test requires WordPress REST API (Version 2): https://wordpress.org/plugins/rest-api/


//------------------------------------------------
// Global Variables
//------------------------------------------------
var StylesheetURL = StylesheetURL; 
var WP_API_Settings = WP_API_Settings; 
var wysiwygElements   = StylesheetURL + '/partials/wysiwyg.html'; 
var wysiwygDIV = document.getElementById('wysiwyg'); // 
var contentDIV = document.getElementById("content-body"); 

var beforeSend = function(xhr) { //  lil' help with routing for this test
	"use strict";
    xhr.setRequestHeader('X-WP-Nonce', WP_API_Settings.nonce);

    if (beforeSend) {
        return beforeSend.apply(this, arguments);
    }
};

var workPage = WP_API_Settings.root + 'wp/v2/pages/2'; // Sample Page, ID = 2

//------------------------------------------------
// Just another test, console.log img attributes when img selected
// http://qnimate.com/adding-multiple-images-using-wordpress-media-uploader/
//------------------------------------------------

function open_media_uploader_multiple_images() {  
	document.getElementById('mediaUpload').addEventListener('click', function(evt){
		
		media_uploader = wp.media({
			frame:    "post", 
			state:    "insert", 
			multiple: true 
		});
	
		media_uploader.on("insert", function(){
	
			var length = media_uploader.state().get("selection").length;
			var images = media_uploader.state().get("selection").models
	
			for(var iii = 0; iii < length; iii++)
			{
				var image_url = images[iii].changed.url;
				var image_caption = images[iii].changed.caption;
				var image_title = images[iii].changed.title;
				console.log(image_url);
				//console.log(image_caption);
				//console.log(image_title);
			}
						
		});
	
		media_uploader.open();
	});
}



//------------------------------------------------
// Event Listener, Update Content of post
//------------------------------------------------
function updateContent() {
	// Update Our Content to WP on submit
	"use strict";
	document.getElementById('wysiwyg-form').addEventListener('submit', function(evt){	
					
				evt.preventDefault(); 
				
				var content = document.getElementById('editor').innerHTML; // Editor Content
				
				jQuery.ajax( {
					url: WP_API_Settings.root + 'wp/v2/pages/2', // REST API for PAGE ID 2 "Sample Page"
					method: 'POST',
					beforeSend: function ( xhr ) {
						xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );
					},
					data:{
						'content' : content // Update the content with editor content
					}
					
				} ).done( function ( response ) {	// Response				
					console.log( response ); 
				} );
									
				jQuery('#wysiwyg').modal( 'hide' ); //Hide the wysiwyg now that we're done
				
				contentDIV.innerHTML = content; 
				
	});	
}
//------------------------------------------------
// Get The Content using rest API 
//------------------------------------------------
function getTheContent() {
	
   "use strict";	
   var xmlHttp = new XMLHttpRequest();

   xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
		   var a = JSON.parse(xmlHttp.responseText);		   
		   var editorDIV = document.getElementById("editor");
		   contentDIV.innerHTML = a.content.rendered;
		   editorDIV.innerHTML = a.content.rendered;
		}
	};

	xmlHttp.open("GET", workPage, true); 
	xmlHttp.send(null);	   
   
}
//------------------------------------------------
// Get the wysiwyg editor html file
//------------------------------------------------
function getEditor() {
	
   "use strict";	
   var xmlHttp = new XMLHttpRequest();

   xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
		   wysiwygDIV.innerHTML = xmlHttp.responseText;
		   wysiwygEditor();
		   updateContent();
		   open_media_uploader_multiple_images();
		}
	};

	xmlHttp.open("GET", wysiwygElements, true); 
	xmlHttp.send(null);
}

//------------------------------------------------
// Run
//------------------------------------------------
getEditor();
getTheContent();



//------------------------------------------------
// wysiwyg execution, https://mindmup.github.io/bootstrap-wysiwyg/ 
//------------------------------------------------

function wysiwygEditor() {
	  "use strict";
	  jQuery(function($){
		function initToolbarBootstrapBindings() {
		  var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
				'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
				'Times New Roman', 'Verdana'],
				fontTarget = $('[title=Font]').siblings('.dropdown-menu');
		  $.each(fonts, function (idx, fontName) {
			  fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
		  });
		  $('a[title]').tooltip({container:'body'});
			$('.dropdown-menu input').click(function() {return false;})
				.change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
			.keydown('esc', function () {this.value='';$(this).change();});
	
		  $('[data-role=magic-overlay]').each(function () { 
			var overlay = $(this), target = $(overlay.data('target')); 
			overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
		  });
		  if ("onwebkitspeechchange"  in document.createElement("input")) {
			var editorOffset = $('#editor').offset();
			$('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
		  } else {
			$('#voiceBtn').hide();
		  }
		}
		function showErrorAlert (reason, detail) {
			var msg='';
			if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
			else {
				console.log("error uploading file", reason, detail);
			}
			$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
			 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
		}
		initToolbarBootstrapBindings();  
		$('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
		window.prettyPrint && prettyPrint();
	  });
}