var Properties = new function(){
	var self = this;

	self.item = null;

	$(function(){
		$("#properties_frame table, tr, th, td, input").attr('class', 'non-select');
		$('html').on('ElementFocus', function(e, element){ self.getProperties(element); });
		$('#properties_frame table tr td input').change(function(e){ self.setProperty(e); });
	})

	self.getProperties = function(e){
		if ($(e).hasClass('non-select')) { return; }
		if ($(e).prop('tagName') == 'HTML') { return; }
		self.item = e;
		$("#properties_frame table tr td input[name='tagName']").val($(e).prop('tagName'));
		$("#properties_frame table tr td input[name='Name']").val($(e).attr('name'));
		$("#properties_frame table tr td input[name='ID']").val($(e).attr('id'));
		$("#properties_frame table tr td input[name='Text']").val($(e).text());
	}

	self.setProperty = function(e){
		fnc = 'set'+$(e.target).attr('name')
		window['Properties'][fnc]($(e.target).val());
	}

	self.setAttr = function(name, value) {
		$(self.item).attr(name, value); 
	}

	self.setText = function(value) {
		$(self.item).text(value);	
	}

	self.setID = function(value) {
		self.setAttr('id', value);
	}

	self.setName = function(value) {
		self.setAttr('name', value);
	}

	self.setValue = function(value) {
		self.setText(value);
	}
}