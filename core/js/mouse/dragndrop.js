class DragDraw {

	constructor(pointer) {
		this.pointer = pointer;

		this.drag = {start: {x: 0, y: 0}, stop: {x: 0, y: 0}, dist: {top: 0, left: 0}, ing: false, element: false};
		this.draw = {start: {x: 0, y: 0}, stop: {x: 0, y: 0}, rect: {height: 0, width: 0}, ing: false, do: false, element: false};
	}

	startDrag(evt) {
		if (!this.draw.ing) {
			this.pointer.setPosition(evt);
			this.drag.start.x = this.pointer.pos.x;
			this.drag.start.y = this.pointer.pos.y;
			this.drag.element = this.pointer.getElement();
			if (!this.isDraggable(this.drag.element)) {
				console.log('NON SELECT');
				this.drag.element = null;
			}
		}
	}

	updateDrag(evt) {
		if (this.drag.element) {
			this.drag.ing = true;
			this.pointer.setPosition(evt);
			this.drag.dist.top = this.pointer.pos.y - this.drag.start.y;
			this.drag.dist.left = this.pointer.pos.x - this.drag.start.x;
			var yDif = parseInt(getComputedStyle(this.drag.element)['top']);  
			var xDif = parseInt(getComputedStyle(this.drag.element)['left']);
			this.drag.element.style.top = yDif + this.drag.dist.top + 'px';
			this.drag.element.style.left = xDif + this.drag.dist.left + 'px';
			this.drag.start.x = this.pointer.pos.x;
			this.drag.start.y = this.pointer.pos.y;
		}
	}

	stopDrag(evt) {
		this.drag.ing = false;
		if (this.drag.element) {
			this.updateDrag(evt);
			this.drag.stop.x = this.pointer.pos.x;
			this.drag.stop.y = this.pointer.pos.y;
			this.drag.element = false;
		}
	}

	startDraw(evt) {
		if (this.draw.do) {
			this.pointer.setPosition(evt);
			this.draw.start.x = this.pointer.pos.x;
			this.draw.start.y = this.pointer.pos.y;
			this.draw.ing = true;
			this.draw.do = false;
			console.log('STARTx: ' + this.draw.start.x);
			console.log('STARTy: ' + this.draw.start.y);
		}
	}

	updateDraw(evt) {
		if (this.draw.ing) {
			this.pointer.setPosition(evt);
			this.draw.rect.width = this.pointer.pos.x - this.draw.start.x;
			this.draw.rect.height = this.pointer.pos.y - this.draw.start.y;
		}
	}

	stopDraw(evt) {
		if (this.draw.ing) {
			this.updateDraw(evt);
			this.draw.stop.x = this.pointer.pos.x;
			this.draw.stop.y = this.pointer.pos.y;
			this.draw.ing = false;
			$('html').trigger('stopDraw', [this.draw.rect]);
			$("#pointer").click();
			console.log("STOPx: " + this.draw.stop.x);
			console.log("STOPy: " + this.draw.stop.y);
		}
	}

	isDraggable(el) {
		if (el.classList.contains('no-drag')) { return false; }
		else { return true; }	
	}
}