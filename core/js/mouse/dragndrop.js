var DragDraw = new function(){
	var self = this;

	self.pointer = null;

	self.drag = {start: {x: 0, y: 0}, stop: {x: 0, y: 0}, dist: {top: 0, left: 0}, ing: false, element: false};
	self.draw = {start: {x: 0, y: 0}, stop: {x: 0, y: 0}, rect: {height: 0, width: 0}, ing: false, do: false, element: false};

	self.init = function(pointer) {
		self.pointer = pointer;
	}

	self.startDrag = function(e) {
		if (!self.draw.ing) {
			self.pointer.setPosition(e);
			self.drag.start.x = self.pointer.pos.x;
			self.drag.start.y = self.pointer.pos.y;
			self.drag.element = self.pointer.getElement();
			if ($(self.drag.element).hasClass('non-select')) {
				self.drag.element = null;
			}
		}
	}

	self.updateDrag = function(e) {
		if (self.drag.element) {
			self.drag.ing = true;
			self.pointer.setPosition(e);
			self.drag.dist.top = self.pointer.pos.y - self.drag.start.y;
			self.drag.dist.left = self.pointer.pos.x - self.drag.start.x;
			yDif = parseInt($(self.drag.element).css('top'));  
			xDif = parseInt($(self.drag.element).css('left'));
			self.drag.element.style.top = yDif + self.drag.dist.top + 'px';
			self.drag.element.style.left = xDif + self.drag.dist.left + 'px';
			self.drag.start.x = self.pointer.pos.x;
			self.drag.start.y = self.pointer.pos.y;
		}
	}

	self.stopDrag = function(e) {
		self.drag.ing = false;
		if (self.drag.element) {
			self.updateDrag(e);
			self.drag.stop.x = self.pointer.pos.x;
			self.drag.stop.y = self.pointer.pos.y;
			self.drag.element = false;
		}
	}



	self.startDraw = function(e) {
		if (self.draw.do) {
			self.pointer.setPosition(e);
			self.draw.start.x = self.pointer.pos.x;
			self.draw.start.y = self.pointer.pos.y;
			self.draw.ing = true;
			self.draw.do = false;
			console.log('STARTx: ' + self.draw.start.x);
			console.log('STARTy: ' + self.draw.start.y);
		}
	}

	self.updateDraw = function(e) {
		if (self.draw.ing) {
			self.pointer.setPosition(e);
			self.draw.rect.width = self.pointer.pos.x - self.draw.start.x;
			self.draw.rect.height = self.pointer.pos.y - self.draw.start.y;
		}
	}

	self.stopDraw = function(e) {
		if (self.draw.ing) {
			self.updateDraw(e);
			self.draw.stop.x = self.pointer.pos.x;
			self.draw.stop.y = self.pointer.pos.y;
			self.draw.ing = false;
			$('html').trigger('stopDraw', [self.draw.rect]);
			$("#pointer").click();
			console.log("STOPx: " + self.draw.stop.x);
			console.log("STOPy: " + self.draw.stop.y);
		}
	}


}