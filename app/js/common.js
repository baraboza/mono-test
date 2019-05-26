$(function() {
//меню
	$(function() {
		$('.menu__btn').on('click', function() {
			$('.menu__list').toggleClass('menu__list_open');
		})
	})

//Загрузка файла
	var fileContainer = document.querySelector('#file-container');
	var fileInput = document.querySelector('#file-input');

	fileContainer.addEventListener('dragover', (e) => {
	  e.preventDefault();
	  fileContainer.classList.add('dragging');
	});

	fileContainer.addEventListener('dragleave', () => {
	  fileContainer.classList.remove('dragging');
	});

	fileContainer.addEventListener('drop', (e) => {
	  e.preventDefault();
	  fileContainer.classList.remove('dragging');
	  fileInput.files = e.dataTransfer.files;
		$("#file-inner span").html(fileInput.value.split('/').pop().split('\\').pop());
	});

	$('#file-input').change(function() {
		$("#file-inner span").html(fileInput.value.split('/').pop().split('\\').pop());
	});

//Проверка полей
	var fields = [
		{
			'name': 'name',
			'text': 'ФИО',
			'empty': true
		},
		{
			'name': 'city',
			'text': 'Ваш город',
			'empty': true
		},
		{
			'name': 'country',
			'text': 'Страна',
			'empty': true
		},
		{
			'name': 'index',
			'text': 'Индекс',
			'empty': true
		},
		{
			'name': 'address',
			'text': 'Почтовый адрес',
			'empty': true
		},
		{
			'name': 'phone',
			'text': 'Телефон',
			'empty': true
		},
		{
			'name': 'email',
			'text': 'Электронная почта',
			'empty': true
		}
	]

	//приведение к начальному состоянию
	var p = document.querySelector('#check-block');
	function fillString() {
		p.innerHTML = 'Осталось заполнить поля: ';
		fields.forEach(function(item) {
			if (item['empty'] == true) {
				if (p.innerHTML == 'Осталось заполнить поля: ') {
					p.innerHTML += "<span data-name='" + item['name'] + "'>" + item['text'] + "</span>";
				} else {
					p.innerHTML += ", <span data-name='" + item['name'] + "'>" + item['text'] + "</span>";
				}
			}
		});
		if (p.innerHTML == 'Осталось заполнить поля: ' || p.innerHTML == 'Все необходимые поля заполнены, спасибо!') {
			p.innerHTML = 'Все необходимые поля заполнены, спасибо!';
			$("#check-btn").prop('disabled', false);
		} else {
			$("#check-btn").prop('disabled', true);
		}
	}
	fillString();
	
  //отслеживание ввода
	$('.check-input').on('input', function() {
		if ($(this).val() != '' && $(this).attr('name') != 'country' || $(this).attr('name') == 'country'  && $(this).val() != 'Страна') {
			var name = $(this).attr('name');
			for (var i = 0; i < fields.length; i++) {
				if(fields[i]['name'] == name) {
					fields[i]['empty'] = false;
				}
			}
		} else {
			var name = $(this).attr('name');
			for (var i = 0; i < fields.length; i++) {
				if(fields[i]['name'] == name) {
					fields[i]['empty'] = true;
					break;
				}
			}
		}
		fillString();
	});

	//убираем подсветку поля при клике на любое поле
	$('.form__fieldset input, .form__fieldset select').click(function() {
		$('.check-input').removeClass('marker-input');
	});

	//ставим подсветку новому полю
	p.onclick = function(event) {
		var target = event.target;
		if (target.tagName != 'SPAN') return;
		var name = target.getAttribute('data-name');
		$('.check-input').removeClass('marker-input');
		$(".check-input[name='" + name + "']").addClass('marker-input');
	}

});
