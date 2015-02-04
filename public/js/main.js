$(function() {

	var hexArray = [];
	var colorArray = [];
	var startNum = 0;


	function compileUrl() {
		var numResults = 100;
		var format = 'json';		
		var hex_logic = 'AND';
		var url = 'http://www.colourlovers.com/api/palettes?jsonCallback=?&numResults='+numResults+'&hex='+hexArray+'&hex_logic='+hex_logic;
		return url;
	}

	function getPalettes() {		
		$.getJSON(compileUrl(), function(data) {
			$.each(data, function(k,v) {
				colorArray.push(v.colors);
			});
		}).then(loadPalette);
	}

	function loadPalette() {
		$.each(colorArray[startNum], function(k,v) {
			$('<div/>',{
				class: 'color',
				'data-hex': v,
				html: '<p>#'+v+' <img class="hidden" src="/img/lock-20.png" /></p>',
			}).css('background','#' + v).appendTo('section');
		});
		startNum = startNum + 1;
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


	// Lock HEX Values and serve palettes with those colors.
	function lockHex() {		
		$(document).on('click','.color', function() {
			var hexValue = $(this).data('hex');
			hexArray.push(hexValue);
			var $img = $(this).find('img');
			$img.toggleClass('hidden');
			getPalettes();
		});
	}

	function init() {
		lockHex();
		getPalettes();
		cyclePalette();		
	}
	init();

});