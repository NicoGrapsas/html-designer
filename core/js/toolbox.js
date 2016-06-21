var Toolbox = new function() {
	var self = this;

	self.pointer = Pointer;
	self.currentSelected = 'pointer';

	$(function(){
		$("#toolbox li ul li a").each(function(){
			$(this).click(function(){
				if (this.id == 'pointer') {
					self.currentSelected = "pointer";
					$('html').css('cursor', 'auto');
				} else {
					self.pointer.dd.draw.do = true;
					self.currentSelected = this.id;
					$('html').css('cursor', 'crosshair');
				}
			})
		});
		$("#toolbox ul, li, a, img, span").each(function(){
			this.className = this.className + ' non-select';
		});
	});
}