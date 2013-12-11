/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'FinomenonIcons\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-facebook' : '&#x66;',
			'icon-twitter' : '&#x74;',
			'icon-arrow-left' : '&#x61;',
			'icon-linkedin' : '&#x21;',
			'icon-mail' : '&#x65;',
			'icon-box-add' : '&#x22;',
			'icon-new-tab' : '&#x23;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};