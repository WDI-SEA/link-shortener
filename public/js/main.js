$('document').ready(function() {
	console.log('working')

	$('.urlForm').on('submit', function(e) {
		e.preventDefault();
		console.log('clicked');

		var formElement = $(this);
		var redirect = formElement.attr('action');
		var urlLink = $('.urlData').val();

		$.ajax({
			method: 'POST',
			url: redirect,
			data: {link: urlLink}
		}).done(function(dataObj) {
			formElement.remove();
			window.location.href = dataObj.redirectUrl;
		})
	})

})