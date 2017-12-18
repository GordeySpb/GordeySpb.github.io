
// Меню

let menu = (function() {
let menu = document.querySelector('.fullscreen-menu'),
	body = document.querySelector('body');


	function showMenu() {
		
		let buttonOpen = document.querySelector('.hamburger-menu');
		
			

		buttonOpen.addEventListener('click',function(){
		menu.classList.add('isactive')
		body.classList.add('locked')
		})



	};

	function closeMenu() {

		let buttonClose = document.querySelector('.close-menu');
		let menuList = document.querySelector('.fullscreen__list');
		
		buttonClose.addEventListener('click',function(){
			menu.classList.remove('isactive')
			body.classList.remove('locked')   
		})
		menuList.addEventListener('click',function(e) {

			if (e.target.classList.contains('fullscreen__link')) {
				menu.classList.remove('isactive')
				body.classList.remove('locked')	
			}
		})
	}
	
	return {
		show: showMenu,
		close: closeMenu
	}
})()

menu.show()
menu.close()




// Горизонтальный Аккордион

$(document).ready(() => {

	let teamAcco = () => {
		$('.team__item').on('click  touchstar', e =>{
			e.preventDefault();

			const $this = $(e.target);
			const item = $this.closest('.team__item');
			const container = $this.closest('.team__list');
			const items = $('.team__item',container);
			const content = item.find('.team__info');
			const otherContent = $('.team__info',container);
			
	
			if (!item.hasClass('team__item--active')) {
				items.removeClass('team__item--active');
				item.addClass('team__item--active');
				otherContent.stop(true).slideUp();
				content.stop(true).slideDown();
				
			} else {
				item.removeClass('team__item--active');
				content.stop(true).slideUp();
			};
		});
	};

	teamAcco();

	// Вертикальный аккордион


	let verticalAcco = () => {
		let calculateWidth = () => {
			let windowWidth = $(window).width();
			let links = $('.menu-burger__trigger');
			let linksWidth = links.width();
			let reqWidth = windowWidth - linksWidth * links.length;
			
			return reqWidth > 550 ? 550 : reqWidth;
		};

		const openItem = item => {
			let container = $('.menu-burger__list');
			let otherItems = $('.menu-burger__item');
			let content = item.find('.menu-burger__desc');
			let accoText = $('p',container);
			let activeItem = otherItems.filter('.menu-burger__item--active');
			let activeContent = activeItem.find('.menu-burger__desc');
			let openWidth = calculateWidth();

			otherItems.removeClass('menu-burger__item--active');
			item.addClass('menu-burger__item--active');

			accoText.hide();
			activeContent.animate({ width: '0px' });

			content.animate(
				{
					width: openWidth + 'px'
				},
				function(){
					accoText.fadeIn();
				}
			);

		};

		const closeItem = item => {
			item.removeClass('menu-burger__item--active');

			item
				.closest('.menu-burger__list')
				.find('p')
				.stop(true, true)
				.fadeOut(function() {
					item.find('.menu-burger__desc').animate({ width: "0px" });
				});

		}


		$('.menu-burger__trigger').on('click  touchstar', e =>{
			e.preventDefault();

			let $this = $(e.target);
			let item = $this.closest('.menu-burger__item');
			item.hasClass('menu-burger__item--active') ? closeItem(item) : openItem(item);
		})

		$(document).on('click', e => {
			const $this = $(e.target);

			if (!$this.closest('.menu-burger__list').length) {
				closeItem($('.menu-burger__item'));
			}
		})


	};

	verticalAcco();

	//Слайдер

	let moveSlide =(container,slideNum) =>{
		
	

		let	items = container.find('.slider__item');
		let activeSlide = items.filter('.slider__item--active');
		let reqItem = items.eq(slideNum);
		let reqIndex = reqItem.index();
		let list = container.find('.slider__list');
		let duration = 500;
		
		
		if (reqItem.length){
			
			list.animate({
				'left' : -reqIndex * 100 + '%'
			},duration,function(){
				activeSlide.removeClass('slider__item--active');
				reqItem.addClass('slider__item--active');
			});
		}
	};

	$('.slider__btn').on('click touchstar', e => {
		e.preventDefault();
		
		let $this = $(e.target);
		let	container = $this.closest('.burgesrs__wrap');
		let items = $('.slider__item',container);
		let activeItem = items.filter('.slider__item--active');
		let existedItem, edgeItem,reqItem;
		let item = $this.closest('.slider__btn');
		

		if (item.hasClass('slider__btn--next')){ // вперед
			existedItem = activeItem.next();
			edgeItem = items.first();
			console.log(existedItem)
		}

		if(item.hasClass('slider__btn--prev')){ // назад
			existedItem = activeItem.prev();
			edgeItem = items.last();
		};

		reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
		
		moveSlide(container,reqItem);
	});


	//onePageScroll

	const main = $('.maincontent');
	const sections = $('.section');

	let inScroll = false;

	const mobileDetect = new MobileDetect(window.navigator.userAgent);
	const isMobile = mobileDetect.mobile();

	const showMenuActiveClass = sectionEq  => { // подсветка fixed menu 

		$('.pagination__item').eq(sectionEq).addClass('pagination__item--active')
			.siblings().removeClass('pagination__item--active')

	}

	const performTransition = sectionEq => { 

		if (inScroll) return
		inScroll = true

		const position = (sectionEq * -100) + '%';

		main.css({
			'transform' : `translate(0, ${position})`,
			'~webkit-transform' :`translate(0, ${position})` 
		});

		sections.eq(sectionEq).addClass('section--active')
		.siblings().removeClass('section--active');

		setTimeout(() => {
			inScroll = false;
			showMenuActiveClass(sectionEq);
		},1300);
		


			
	};


	const defineSections = sections => {
		const activeSection = sections.filter('.section--active');
		return {
			activeSection : activeSection,
			nextSection   : activeSection.next(),
			prevSection   : activeSection.prev(),

		}
	};

	const scrollToSection = direction => {
		const section = defineSections(sections);

		if (inScroll) return;

		if (direction === 'up' && section.nextSection.length) {
			performTransition(section.nextSection.index())
		}

		if (direction === 'down' && section.prevSection.length) {
			performTransition(section.prevSection.index())
		}
		
	};



	$('.wrapper').on({
		wheel : e => {
			const deltaY = e.originalEvent.deltaY;
			let direction = (deltaY > 0) ? 'up' : 'down'

			scrollToSection(direction);
	
		},
		touchmove : e =>(e.preventDefault())
	});

	$(document).on('keydown', e => {
		const section = defineSections(sections);

		if (inScroll) return

		switch (e.keyCode) {
			case 40 :
			if (!section.nextSection.length) return;
			performTransition(section.nextSection.index());
			break;

			case 38 :
			if (!section.prevSection.length) return;
			performTransition(section.prevSection.index());
			break;
		}
	});

	if (isMobile) {
		$(window).swipe({
		  swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			scrollToSection(direction);
		  }
		})
	}

	$('[data-scroll-to]').on('click touchstart', e => {
		e.preventDefault();

		const $this =  $(e.currentTarget);
		const sectionIndex = parseInt($this.attr('data-scroll-to'));
		
		performTransition(sectionIndex);
	});

	//fancybox

	let fancyboxModal = () => {
		$('.users__btn').fancybox({
		  touch: true,
		  smallBtn: false,
		  infobar: false,
		  toolbar : false,
		  smallBtn: '<button data-fancybox-close class = "fancybox-close-small "title =" {{CLOSE}} "> </ button> '
		});
	  };
	  fancyboxModal();
	
	
	//droplist

	let showIngridients = () => {

		let container = $('.slider__item');
		let ingridients = container.find('.ingredients');
		let menuList = container.find('.burgers-composition');

		$('.ingredients').on('mouseenter', e => {
			e.preventDefault();
	
			menuList.addClass('burgers-composition--active');
	
		})

		$('.ingredients').on('mouseleave', e => {
			e.preventDefault();
	
			menuList.removeClass('burgers-composition--active');
	
		})
	};



	showIngridients()


	//yandex map

	ymaps.ready(init);

    var myMap,
        myPlacemark,
        myPlacemarks = [{
            latitude: 59.93315362,
            longitude: 30.33363551,
            hintContent: 'Mr.Burger на Садовой',
            balloonContent: 'Садовая улица, 22к2'
        },
            {
                latitude: 59.94186039,
                longitude: 30.27567834,
                hintContent: 'Mr.Burger на Васильевском острове',
                balloonContent: '8-я Линия ВО, 36'
            },

            {
                latitude: 59.973999,
                longitude: 30.311091,
                hintContent: 'Mr.Burger на Чапыгина',
                balloonContent: 'улица Чапыгина, 13А'
            }];

    function init(){
        myMap = new ymaps.Map("map", {
            center: [59.92606548, 30.32610869],
            zoom: 12
        });

        myPlacemarks.forEach(function(obj) {
            myPlacemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
                hintContent: obj.hintContent,
                hintContent: obj.balloonContent
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-15, -50]
            });

            myMap.geoObjects.add(myPlacemark);
        });

        myMap.behaviors
            .disable('scrollZoom')
	}


});

	
	//Форма

let ajaxForm = function (form) { // Универсальная функция формы
	
	let url = form.attr('action'),
		data = form.serialize();

	return $.ajax({
		type: 'POST',
		url: url,
		data: data,
		dataType: 'JSON'
	});

}

let submitForm = function(e) {

	e.preventDefault();

	
	let form = $(e.target);
	let request = ajaxForm(form);
	

	request.done(function(msg) {

		const popupOrder = msg.status ? '#success' : '#error';
		$status = $(popupOrder);
		$status.html(msg.mes)

		$.fancybox.open( 
			$status
			, {
				type: 'inline',
				maxWidth: 250,
				fitToView: false,
				padding: 0,
				afterClose() {
				form.trigger('reset');
				}
			});
			});
		
			request.fail(function(jqXHR, textStatus) {
			$.fancybox.open( 
				$('#error').html("На сервере произошла ошибка: " + textStatus)
			, {
				type: 'inline',
				maxWidth: 250,
				fitToView: false,
				padding: 0,
				afterClose() {
					form.trigger('reset');
				}
				});
			});
		
	};







$('#order-form').on('submit',submitForm)








	
