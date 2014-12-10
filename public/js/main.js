$(function() {

	var url = 'http://www.colourlovers.com/api/palettes?numResults=100&format=json&jsonCallback=?';
	var colorArray = [];
	var startNum = 0;

	function getPalettes() {
		$.getJSON(url, function(data) {
			$.each(data, function(k,v) {
				colorArray.push(v.colors);
			});
		}).then(loadPalette);
	}

	function cyclePalette() {
		$(window).on('keypress', function(e) {
			if(e.keyCode === 32) {
				if(startNum === colorArray.length) {
					startNum = 0;
				}
				$('section').empty();
				loadPalette();				
			}
		});
	}

	function loadPalette() {
		$.each(colorArray[startNum], function(k,v) {
			$('<div/>',{
				class: 'color',
				'data-hex': v,
				html: '<p>#'+v+'</p>',
			}).css('background','#' + v).appendTo('section');
		});
		startNum = startNum + 1;
	}

	function init() {
		getPalettes();
		cyclePalette();
	}
	init();
});