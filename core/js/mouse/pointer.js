var Pointer =  new function() {
	var self = this;

	self.dd = DragDraw;
	self.pos = {x: 0, y: 0};
	self.currentElement = null;

	$(function(){
		self.dd.init(self);
		$('html').mouseup(function(e){ self.dd.stopDrag(e); self.dd.stopDraw(e); });
		$('html').mousedown(function(e){ self.dd.startDrag(e); self.dd.startDraw(e); $('html').trigger('ElementFocus', [e.target]); });
		$("html").mousemove(function(e) { self.dd.updateDrag(e); self.dd.updateDraw(e); });
	});

	self.getElement = function() { 
		return document.elementFromPoint(self.pos.x, self.pos.y);
	}

	self.setPosition = function(e) {
		self.pos.x = e.pageX;
		self.pos.y = e.pageY;
	}
}