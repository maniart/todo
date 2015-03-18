var main = (function() {

	var $form = $('form')
	  , $todo = $('#todo')
	  , todoText = ''
	  , $list = $('.list ul');

	function init() {
		fetch();
		$form.on('submit', submit);
	}

	function submit(event) {
		event.preventDefault($('.todo'));
		todoText = $todo.val(); 	
		$todo.val('');
		$.ajax({
			url: '/api',
			type: 'POST',
			data: { todo: todoText },
			success: function(data, textStatus, jqXHR) {	
				$list.prepend($('<li/>').text(data.todo));
			}, 
			error: function(data, textStatus, jqXHR) {
				console.log('successfully saved');
			}
		});
	}

	function fetch() {
		$.ajax({
			url: '/api',
			type: 'GET',
			success: function(data, textStatus, jqXHR) {
				$.each(data, function(index, obj) {
					$list.prepend($('<li/>').text(obj.todo));
				})
			},
			error: function(data, textStatus, jqXHR) {
				console.log('err');
			}
		});
	}

	return {
		init: init
	}

})();

$(document).ready(main.init);