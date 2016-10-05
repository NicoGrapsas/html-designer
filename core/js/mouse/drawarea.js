class DrawArea {

  constructor(element) {
    this.e = element;
    this.origin = {x: 0, y: 0};
  }

  setOrigin(point) {
    this.origin.x = point.x;
    this.origin.y = point.y;

    this.e.style.top = this.origin.y + 'px';
    this.e.style.left = this.origin.x + 'px';
    this.e.style.display = 'block';
  }

  updateRect(size) {
    this.e.style.width = size.width + 'px';
    this.e.style.height = size.height + 'px';
  }

  clearRect() {
    this.e.style.display = 'none';
    this.origin = {x: 0, y: 0};
    this.e.style.width = '0px';
    this.e.style.height = '0px';
  }
}
