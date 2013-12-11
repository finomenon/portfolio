$(document).ready(function() {
	// not working in IE. moving everything to $(window).load
});
$(window).load(function() {
	EF.Project.Main.init();
});

EF = {};
EF.Project = {};
EF.Project.Main = {
	init: function() {
		EF.Project.Model.initLoad(EF.Project.Model.getParameterByName('id'));
	}
}

EF.Project.Model = {
	project_name:'',
	links:[],
	project_data:[],

	/**
	* @function getParameterByName
	* get query string vars
	*/
	getParameterByName: function(name) {
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},

	/**
	* @function initLoad
	* construct data file URL and load data
	*/
	initLoad: function(id_str) {
		var data_file = ('/json/projects/' + id_str + '.json');
		EF.Project.Model.load(data_file);
	},

	/**
	* @function load
	* - ajax loader for JSON grid data
	* - parse data and trigger render classes
	*/
	load: function(file) {
		$.ajax({
	        url: file,
	        dataType: 'json',
	        success: function(data, textStatus, jqXHR) {
	        	if(data) {
					if(data.error) {
						// if error in loaded data
						alert('Data Error');
					} else {
						// success!
						EF.Project.Model.project_name = data.ProjectName;
						EF.Project.Model.links = data.Links;
						EF.Project.Render.addNav(EF.Project.Model.project_name, EF.Project.Model.links);
						if(data.ProjectDetails) {
							EF.Project.Model.project_data = data.ProjectDetails;
							EF.Project.Render.projectDetails(EF.Project.Model.project_data);
						}
					}
				} else {
					// if data returned == null
					alert('Data Error: data is null.');
				}
	        },
			error: function(jqXHR, textStatus, errorThrown) {
				alert("fail: " + errorThrown + "\n" + textStatus);
			}
	    });
	}
}

EF.Project.Render = {

	addNav: function(name_data, links_data) {

		var nav_str =  (name_data) ? ('<div class="title"><span class="project-name">' + name_data + '</span></div><hr>') : '';
		if(links_data) {
			nav_str += '<ul class="links center">';
			for(var i = 0; i<links_data.length; i++) {
				nav_str += this.addNavLink(links_data[i]);
			}
			nav_str += '</ul><hr>';
		}

		$('.nav').html(nav_str);
		if($('.nav').hasClass('display-none')) {
			$('.nav').removeClass('display-none');
		}
	},

	addNavLink: function(data) {
		var str = "";
		str += 	'<li><a href="' + data.Href + '" target="_blank"><span class="icn icon-new-tab"></span><span class="label">' + data.Label + '</span></a></li>';
	    return str;
	},

	projectDetails: function(data, append) {
		var project_str = "";

		for(var i = 0; i<data.length; i++) {
			project_str += this.addProjectItem("col", data[i]);
		}
		$('.project-details ul').html(project_str);
	},

	addProjectItem: function(li_class, data) {
		var str = "";
		var desc_str = (data.Description != '') ? '<div class="desc"><span>' + data.Description + '</span></div>' : '';
		str += 	'<li class="' + li_class + '">' +
					desc_str +
	                '<div class="project-img"><img src="' + data.Image + '" alt=" "></a>' +
	            '</li>';
	    return str;
	}
}