let menu = (function() {
	function showMenu() {
		let menu = document.querySelector('.fullscreen-menu'),
			buttonOpen = document.querySelector('.hamburger-menu'),
			body = document.querySelector('body');

		buttonOpen.addEventListener('click',function(){
		menu.classList.add('isactive')
		})

		buttonOpen.addEventListener('click',function(){
		body.classList.add('locked')
		})

	};

	function closeMenu() {
		let menu = document.querySelector('.fullscreen-menu'),
			buttonClose = document.querySelector('.close-menu'),
			body = document.querySelector('body'); 

		buttonClose.addEventListener('click',function(){
			menu.classList.remove('isactive')   
		})
		
		buttonClose.addEventListener('click',function(){
		body.classList.remove('locked')
		})
	}
	
	return {
		show: showMenu,
		close: closeMenu
	}
})()

menu.show()
menu.close()




        


