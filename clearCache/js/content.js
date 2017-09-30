$(document).ready(function(){
	console.log("window onload...");
	AutoDudu.initPopPage();
})

var AutoDudu = {
	config: {
		btnId : 'autoTestBtn',
		timeOut: '1500'	//ms
	}
};

AutoDudu.initPopPage = function() {
	console.log("init initPopPage...");

	if (jQuery('.dudu')) {
		jQuery('.dudu').remove();
	}
	
	var content = "<div class='dudu'>";
	//add menu part
	content += "<div class='dudu-menu'>";
	content += "<a href='javascript:void(0);' target='blank' class='dudu-index'>";
	content += " <span>DD</span>";
	content += " </a>";
	content += "</div>";
	//add popup part
	content += "<div class='dudu-pop'>";
	content += "<div class='dudu-title'><a title='click me refresh' id='dudu-title-refresh'>Page Info</a></div>";
	content += "<div class='dudu-content'>";
	content += AutoDudu.getPageInfo();
	content += "</div>";
	content += "</div>";
	content += "</div>";
	jQuery('body').append(content);
	
	var menu = jQuery(".dudu-menu"); 
	var popUp = jQuery(".dudu-pop");
	menu.on("dblclick", AutoDudu.refreshPage); 
	menu.on("mouseover mouseout", function(event) {
        if (event.type == "mouseover") {
            popUp.addClass('show');
        } else if (event.type == "mouseout") {
            popUp.removeClass('show');
        }
    });
    popUp.on("mouseover mouseout", function(event) {
        if (event.type == "mouseover") {
            popUp.addClass('show');
        } else if (event.type == "mouseout") {
            popUp.removeClass('show');
        }
    });

	var refreshBtn = jQuery("#dudu-title-refresh"); 
	refreshBtn.on("click", AutoDudu.refreshBtnClick); 

    $(".dudu").draggable();        
    $(".dudu").mousedown(function() {
        $(this).css("cursor", "pointer");
    }).mouseup(function() {
        $(this).css("cursor", "default");
    });
	
};

AutoDudu.refreshBtnClick = function() {
	console.log("click refresh button");
	var content = AutoDudu.getPageInfo();
	$(".dudu-content").html(content);
};

AutoDudu.getPageInfo = function() {
	var formTotal = jQuery("form").length + jQuery("iframe").contents().find('form').length;
	var tableTotal = jQuery("table").length + jQuery("iframe").contents().find('table').length;
	var buttonTotal = jQuery("button").length + jQuery("iframe").contents().find('button').length;
	var inputTotal = jQuery("input").length + jQuery("iframe").contents().find('input').length;
	var selectTotal = jQuery("select").length + jQuery("iframe").contents().find('select').length;
	var content = "<ul>";
	content += "<li>Form : "+formTotal+"</li>";
	content += "<li>Table : "+tableTotal+"</li>";
	content += "<li>Button : "+buttonTotal+"</li>";
	content += "<li>Input : "+inputTotal+"</li>";
	content += "<li>Select : "+selectTotal+"</li>";
	content += "</ul>"; 
	content += "<hr>"; 
	content += "<ul>";
	content += "</ul>"; 
	return content;
};

AutoDudu.refreshPage = function() {
	 window.location.reload();
};

Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1] || "anonymous";
}