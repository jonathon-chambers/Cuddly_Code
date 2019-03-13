let test = document.querySelector('td.pbButton');
let pbId = test.getAttribute('id').replace('topButtonRow', '');
console.log(test, pbId);
test.querySelectorAll('input.btn[name]').forEach(function (btn) {
	let btnName = btn.getAttribute('name');
	switch (btnName) {
		case 'edit':
			let base = '{!$CurrentPage.URL}',
				recordId = '{!grc__Risk__c.Id}';
			let target = [
				'{!domainUrl}', '/',
				recordId,
				'/e?returnUrl=',
				encodeURIComponent(base),
				encodeURIComponent('&isdtp=vw')
			].join('');
			btn.onclick = function (event) {
				navigateToUrl(target, 'DETAIL', 'edit');
			}
			break;
		case 'inlineEditSave':
			btn.onclick = function (event) {
				sfdcPage.save(pbId);
				setTimeout(closeAndReload, 1000);
			}
			console.log(btn.onclick);
			break;
		case 'inlineEditCancel':
			btn.onclick = function (event) {
				window.reload();
			}
			break;
		default:
			break;
	}
});