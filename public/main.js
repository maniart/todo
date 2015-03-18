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
		event.preventDefault();
		todoText = $todo.val(); 	
		$todo.val('');
		$.ajax({
			url: '/api',
			type: 'POST',
			data: { todo: todoText },
			success: function(data, textStatus, jqXHR) {	
				$list.prepend($('<li/>').text(data.todo));
			}, 
			error: function() {
				console.error('save failed', arguments);
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
				console.error('fetch failed', arguments);
			}
		});
	}

	return {
		init: init
	}

})();

$(document).ready(main.init);
