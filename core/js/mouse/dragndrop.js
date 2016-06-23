class DragDraw {

	constructor(pointer) {
		this.pointer = pointer;

		this.drag = {start: {x: 0, y: 0}, stop: {x: 0, y: 0}, dist: {top: 0, left: 0}, ing: false, element: false};
		this.draw = {start: {x: 0, y: 0}, stop: {x: 0, y: 0}, rect: {height: 0, width: 0}, ing: false, do: false, element: false};
	}

	startDrag(e) {
		if (!this.draw.ing) {
			this.pointer.setPosition(e);
			this.drag.start.x = this.pointer.pos.x;
			this.drag.start.y = this.pointer.pos.y;
			this.drag.element = this.pointer.getElement();
			if (this.drag.element.classList.contains('non-select')) {
				console.log('NON SELECT');
				this.drag.element = null;
			}
		}
	}

	updateDrag(e) {
		if (this.drag.element) {
			this.drag.ing = true;
			this.pointer.setPosition(e);
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

	stopDrag(e) {
		this.drag.ing = false;
		if (this.drag.element) {
			this.updateDrag(e);
			this.drag.stop.x = this.pointer.pos.x;
			this.drag.stop.y = this.pointer.pos.y;
			this.drag.element = false;
		}
	}

	startDraw(e) {
		if (this.draw.do) {
			this.pointer.setPosition(e);
			this.draw.start.x = this.pointer.pos.x;
			this.draw.start.y = this.pointer.pos.y;
			this.draw.ing = true;
			this.draw.do = false;
			console.log('STARTx: ' + this.draw.start.x);
			console.log('STARTy: ' + this.draw.start.y);
		}
	}

	updateDraw(e) {
		if (this.draw.ing) {
			this.pointer.setPosition(e);
			this.draw.rect.width = this.pointer.pos.x - this.draw.start.x;
			this.draw.rect.height = this.pointer.pos.y - this.draw.start.y;
		}
	}

	stopDraw(e) {
		if (this.draw.ing) {
			this.updateDraw(e);
			this.draw.stop.x = this.pointer.pos.x;
			this.draw.stop.y = this.pointer.pos.y;
			this.draw.ing = false;
			$('html').trigger('stopDraw', [this.draw.rect]);
			$("#pointer").click();
			console.log("STOPx: " + this.draw.stop.x);
			console.log("STOPy: " + this.draw.stop.y);
		}
	}
}