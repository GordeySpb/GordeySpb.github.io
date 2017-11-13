let menu = (function() {
	function showMenu() {
		let menu = document.querySelector('.fullscreen-menu'),
			buttonOpen = document.querySelector('.hamburger-menu');

		buttonOpen.addEventListener('click',function(){
		menu.classList.add('isactive')
		})

	};

	function closeMenu() {
		let menu = document.querySelector('.fullscreen-menu'),
			buttonClose = document.querySelector('.close-menu'); 

		buttonClose.addEventListener('click',function(){
			menu.classList.remove('isactive')   
		})   
	}
	
	return {
		show: showMenu,
		close: closeMenu
	}
})()

menu.show()
menu.close()




        


