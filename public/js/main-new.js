$(function() {

	var App = {

		paletteArray: [],
		startNumber: 0,
		lockedValues: [],

		compileUrl: function(arg,cat) {
			var baseUrl = 'http://www.colourlovers.com/api/palettes/';
			var category = 'top';
			var format = '?format=json';
			var jsonCallback = '&jsonCallback=?';
			var hex_logic = '&hex_logic=AND';
			var hex = '&hex=' + arg;
			var numResults = 50;
			var compiledUrl = baseUrl+				
				category+
				format+
				jsonCallback+
				hex_logic+
				hex+
				'&numResults='+numResults;
			return compiledUrl;
		},

		loadPalettesOnScreen: function() {
			$.each(this.paletteArray[this.startNumber], function(k,v) {
				$('<div/>', {
					class: 'color',
					'data-hex' : v,
					html: '<p>#' + v + ' <span>(Locked)</span></p>',
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
					if($this.startNumber === $this.paletteArray.length) {
						$this.startNumber = 0;
					}
					console.log($this.startNumber);
					$('section').empty();
					$this.loadPalettesOnScreen();
				}
			});
		},

		lockValue: function() {
			var $this = this;
			$(document).on('click','.color', function() {
				$this.lockedValues.push( $(this).data('hex') );
				$this.getPaletteData();
				$this.cyclePalette();
			})
		},

		getPaletteData: function() {
			var $this = this;
			$this.paletteArray.length = 0;
			$.getJSON( $this.compileUrl($this.lockedValues,'top'), function(data) {
				console.log( $this.compileUrl($this.lockedValues,'top') );
				console.log(data.length);
				$.each(data, function(key,value) {
					$this.paletteArray.push(value.colors);
				});
			}).then(function() {
				$('section').empty();				
				$this.loadPalettesOnScreen();
			});
		}
	}	
	App.getPaletteData();
	App.cyclePalette();
	App.lockValue();
});