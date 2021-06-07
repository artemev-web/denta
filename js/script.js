

$(function(){
	AOS.init({
		 once: true
	});

	// Мобильное меню

	 $('.hamburger-title').click(function(e){
		 setTimeout (function() {
			 e.preventDefault();
			  $('.hamburger-menu').toggleClass('active');
			  $('.hamburger').toggleClass('active');
			  $('body').toggleClass('fixed');
			  
		 },200);
	});

	// document.addEventListener('click', function(event){
	//     if (!event.target.closest('.hamburger-menu')&&!event.target.closest('.hamburger-title')) {
	//         $('.hamburger-menu').removeClass('active');
	//         $('.hamburger').removeClass('active');
	//         $('body').removeClass('fixed');
	//     }
	// });

  $('input[type=tel]').inputmask('+7 (999) 999-99-99');

	$('.open-modal').click(function(e) {
		 $('#ModalCall').arcticmodal();
		 e.preventDefault();
	}); 

	/*
const accordionsPrice = document.querySelectorAll('.our-prices__item');

for(item of accordionsPrice){
	item.addEventListener('click', function(){
		if(this.classList.contains('active')){
			this.classList.remove('active');
		}else{
			for(el of accordionsPrice){
				el.classList.remove('active');
			}
			this.classList.add('active');
		}
	})
}
*/


const swiperMainPage = new Swiper('.main-swiper-container', {
	// Optional parameters
	loop: true,
	slidesPerView: 1,
	slidesPerGroup: 1,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	 },
	 pagination: {
		el: ".swiper-pagination",
		clickable: true,
	 },
	
});

const swiperOpinionPage = new Swiper('.opinion__swiper-container', {
	// Optional parameters
	loop: true,
	slidesPerView: 1,
	 pagination: {
		el: ".swiper-pagination",
		clickable: true,
	 },
	 
});


const swiperOtherPage = new Swiper('.implant-tooth__swiper-container', {
	// Optional parameters

	 loop: true,
	 Infinity: true,
	 slidesPerView: 2,
	 slidesPerGroup: 2,
	 speed: 1000,
	 autoplay: true,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		 pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
		breakpoints: {
		  320: {
			 slidesPerView: 1,
			 slidesPerGroup: 1,
		  },
	  401: {
			 slidesPerView: 1,
		  },
		  // when window width is >= 320px
		  577: {
			 slidesPerView: 2,
		  },
		  992: {
			 slidesPerView: 2,
			 spaceBetween: 30
		  },
	 }
	
});


	$('.our-price__heading').on('click', function (e) {
		 e.preventDefault();

		 // Add the correct active class
		 if ($(this).closest('.our-price__item').hasClass('active')) {
			  // Remove active classes
			  $('.our-price__item').removeClass('active');
		 } else {
			  // Remove active classes
			  $('.our-price__item').removeClass('active');

			  // Add the active class
			  $(this).closest('.our-price__item').addClass('active');
		 }

		 // Show the content
		 var $content = $(this).next();
		 $content.slideToggle(300);
		 $('.our-price__item .content').not($content).slideUp(500);
		 $('.our-price__heading').not(this).next().stop(true,true).slideUp(500);
	});

});

//Валидация и отправка формы
$(document).ready(function () {

  $('[data-submit]').on('click', function(e) {
		 e.preventDefault();
	  $(this).submit();
	})
	$.validator.addMethod(
		 "regex",
		 function(value, element, regexp) {
			  var re = new RegExp(regexp);
			  return this.optional(element) || re.test(value);
		 },
		 "Please check your input."
	);

	// Функция валидации и вывода сообщений
	function valEl(el) {

		 el.validate({
			  rules: {
					phone: {
						 required: true,
						 regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
					},
					name: {
						 required: true
					},
				  //  email: {
				  //      required: true,
				  //      email: true
				  //  }
			  },
			  messages: {
					phone: {
						 required: 'Поле обязательно для заполнения',
						 regex: 'Телефон может содержать символы + - ()'
					},
					name: {
						 required: 'Поле обязательно для заполнения',
					},
					email: {
						 required: 'Поле обязательно для заполнения',
						 email: 'Неверный формат E-mail'
					}
			  },

			  // Начинаем проверку id="" формы
			  submitHandler: function(form) {
					$('#loader').fadeIn();
					var $form = $(form);
					var $formId = $(form).attr('id');
					switch ($formId) {
						 // Если у формы id="goToNewPage" - делаем:
						 case 'goToNewPage':
							  $.ajax({
										 type: 'POST',
										 url: $form.attr('action'),
										 data: $form.serialize(),
									})
									.always(function(response) {
										
									});
							  break;
						 // Если у формы id="popupResult" - делаем:
						 case 'popupResult':
							  $.ajax({
										 type: 'POST',
										 url: $form.attr('action'),
										 data: $form.serialize(),
									})
									.always(function(response) {
										 setTimeout(function() {
										 $('#loader').fadeOut();
										 }, 800);
										 setTimeout(function() {
											  $('#overlay').fadeIn();
											  $form.trigger('reset');
											 $('#ModalCall').arcticmodal('close');
											  //строки для остлеживания целей в Я.Метрике и Google Analytics
										 }, 1100);
										 $('#overlay').on('click', function(e) {
											  $(this).fadeOut();
										 });

									});
							  break;
					}
					return false;
			  }
		 })
	}

	// Запускаем механизм валидации форм, если у них есть класс .js-form
	$('.js-form').each(function() {
		 valEl($(this));
	});
	
});


