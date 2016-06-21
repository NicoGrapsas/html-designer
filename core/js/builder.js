var builder = new function() {
	self = this;

	self.pointer = Pointer;
	self.toolbox = Toolbox;
	
	$(function(){
		$('html').on('stopDraw', function(e, rect){ self.createElement(rect); });
	});

	self.createElement = function(rect) {
		fnc = 'create' + self.toolbox.currentSelected[0].toUpperCase() + self.toolbox.currentSelected.slice(1);
		window['builder'][fnc](rect);
	}

	self.createTextbox = function(rect) {
		$('<input/>', { 
			"css": {
				"position": "absolute",
				"top": self.pointer.dd.draw.start.y,
				"left": self.pointer.dd.draw.start.x,
				"height": rect.height ? rect.height : 'auto',
				"width": rect.width ? rect.width : 'auto',
			},
		}).appendTo('body');
	}

	self.createButton = function(rect) {
		$('<button/>', { 
			"css": {
				"position": "absolute",
				"top": self.pointer.dd.draw.start.y,
				"left": self.pointer.dd.draw.start.x,
				"height": rect.height ? rect.height : '20px',
				"width": rect.width ? rect.width : '70px',
			},
		}).appendTo('body');
	}
}