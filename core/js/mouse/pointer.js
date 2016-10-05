class Pointer {

	constructor(){
		this.dd = new DragDraw(this, document.getElementById('drawArea'));
		this.pos = {x: 0, y: 0};
		this.currentElement = null;
		$(self => {
			$('html').mouseup(e => { this.dd.stopDrag(e); this.dd.stopDraw(e); });
			$('html').mousedown(e => { this.dd.startDrag(e); this.dd.startDraw(e); $('html').trigger('ElementFocus', [e.target]); });
			$("html").mousemove(e => { this.dd.updateDrag(e); this.dd.updateDraw(e); });
		});
	}

	getElement() {
		return document.elementFromPoint(this.pos.x - document.body.scrollLeft, this.pos.y - document.body.scrollTop);
	}

	setPosition(e) {
		this.pos.x = e.pageX;
		this.pos.y = e.pageY;
	}
}
