$(function() {

	var App = {

		paletteArray: [],
		lockedValues: [],
		startNumber: 0,

		compileUrl: function(arg,cat) {
			var baseUrl = 'http://www.colourlovers.com/api/palettes/';
			var format = '?format=json';
			var jsonCallback = '&jsonCallback=?';
			var hex_logic = '&hex_logic=AND';
			var hex = '&hex=' + arg;
			var numResults = 100;
			var compiledUrl = baseUrl+				
				cat+
				format+
				jsonCallback+
				hex_logic+
				hex+
				'&numResults='+numResults;
			return compiledUrl;
		},

		loadPalettesOnScreen: function() {
			$('section').empty();
			$.each(this.paletteArray[this.startNumber], function(k,v) {
				$('<div/>', {
					class: 'color',
					'data-hex' : v,
					html: '<p>#' + v + '</p>',
				}).css({
					'background' : '#' + v
				}).appendTo('section');
			});
		},

		cyclePalette: function() {
			var $this = this;
			$(window).on('keypress', function(e) {
				$this.startNumber++;
				if(e.keyCode === 32) {
					// Once we reach the end of the array we start over
					if($this.startNumber === $this.paletteArray.length) {
						$this.startNumber = 0;
					}
					$this.loadPalettesOnScreen();
				}
			});
		},

		getPaletteData: function() {
			var $this = this;
			$this.paletteArray.length = 0;
			$.getJSON( $this.compileUrl($this.lockedValues,'top'), function(data) {
				$.each(data, function(key,value) {
					$this.paletteArray.push(value.colors);
				});
			}).then(function() {
				$this.loadPalettesOnScreen();
			});
		},

		init: function() {
			this.getPaletteData();
			this.cyclePalette();		
		}

	}

	App.init();

});