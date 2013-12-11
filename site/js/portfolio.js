$(document).ready(function() {
	// not working in IE. moving everything to $(window).load
});
$(window).load(function() {
	EF.Portfolio.Main.init();
});

EF = {};
EF.Portfolio = {};
EF.Portfolio.Main = {
	init: function() {
		EF.Portfolio.Model.load('/json/portfolio.json');
	}
}

EF.Portfolio.Model = {
	grid_data:[],

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
						if(data.Projects) {
							EF.Portfolio.Model.grid_data = data.Projects;
							EF.Portfolio.Render.projectGrid(data.Projects);
						} else {
							alert('Data Error: "Projects" not found.');
						}
					}
				} else {
					// if data returned == null
					alert('Data Error: data = null.');
				}
	        },
			error: function(jqXHR, textStatus, errorThrown) {
				alert("fail: " + errorThrown + "\n" + textStatus);
			}
	    });
	}
}

EF.Portfolio.Render = {
	projectGrid: function(data, append) {
		var grid_str = "";
		for(var i = 0; i<data.length; i++) {
			grid_str += this.addGridItem("col", data[i]);
		}
		$('.project-grid ul').html(grid_str);
	},

	addGridItem: function(li_class, data) {
		var str = "";
		str += '<li class="' + li_class + '">' +
					'<div class="project-name"><span>' + data.Name + '</span></div>' +
	                '<a href="/project?id=' + data.PageID + '">' +
	                    '<img src="' + data.Thumb + '" alt="' + data.Name + ' Image"></a>' +
	                //'<div class="project-name"><span>' + data.Name + '</span></div>' +
	            '</li>';
	    return str;
	}
}