"use strict";

//  ####################
//  ###     start    ###
//  Функция для показа строки поиска и крестика

const searchIcon = document.querySelector('.search__link');

if (searchIcon) {
	let searchForm = document.querySelector('.menu__search');
	let closeIcon = document.querySelector('.search__link.close');
	
	searchIcon.addEventListener("click", function(e){
		searchForm.classList.add('search-active');
	});

	closeIcon.addEventListener('click', function(e){
		searchForm.classList.remove('search-active');
	});
}

//  ###     end    ###
//вариант на tyny-slider
if (document.querySelector('.sertificate__slider')) {
	var certifSlider = tns({
		container: '.sertificate__slider',
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: false
	});
}

const btnCertifSlidNext = document.querySelector('.sertificate__btn-next');
const btnCertifSlidPrev = document.querySelector('.sertificate__btn-prev');

if (btnCertifSlidPrev && btnCertifSlidNext) {
	btnCertifSlidPrev.addEventListener('click', () => {
		certifSlider.goTo('prev');
	});

	btnCertifSlidNext.addEventListener('click', () => {
		certifSlider.goTo('next');
	});
}

//========================

//рабочий вариант, чистый JS
/* const itemsSrftc = document.querySelectorAll('.sertificate__item');
const sliderLine = document.querySelector('.sertificate__slider');
let count = 0;
let width;

function init() {
	width = document.querySelector('.sertificate__content').offsetWidth;
	sliderLine.style.minWidth = width * itemsSrftc.length + 'px';
	itemsSrftc.forEach(item => {
		item.style.minWidth = width + 'px';
		//item.style.height = 'auto';
	});
	rollSlider();
}

init();
window.addEventListener('resize', init);

document.querySelector('.sertificate__btn-next').addEventListener('click', function () {
	count++;
	if (count >= itemsSrftc.length) {
		count = 0;
	}
	rollSlider();
});

document.querySelector('.sertificate__btn-prev').addEventListener('click', function () {
	count--;
	if (count < 0) {
		count = itemsSrftc.length - 1;
	}
	rollSlider();
});

function rollSlider() {
	sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}
 */
if (document.querySelector('.gallery__slider')) {
	var gallerySlider = tns({
		container: '.gallery__slider',
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: false,
		"responsive": {
			"992": {
				"items": 3
			},
			"640": {
				"items": 2,
				gutter: 30
			}
		}
	});
}

const btnGalleryNext = document.querySelector('.gallery__btn-next');
const btnGalleryPrev = document.querySelector('.gallery__btn-prev');

if (btnGalleryPrev && btnGalleryNext) {
	btnGalleryPrev.addEventListener('click', () => {
		gallerySlider.goTo('prev');
	});

	btnGalleryNext.addEventListener('click', () => {
		gallerySlider.goTo('next');
	});
}
if (document.querySelector('.review__container')) {
	var slider = tns({
		container: '.review__container',
		items: 1,
		slideBy: 'page',
		autoplay: true,
		controls: false,
		nav: false,
		mouseDrag: true,
		autoplayButtonOutput: false,
		autoplayHoverPause: true
	});
}

const btnReviewNext = document.querySelector('.review__btn-next');
const btnReviewPrev = document.querySelector('.review__btn-prev');

if (btnReviewPrev && btnReviewNext) {
	btnReviewPrev.addEventListener('click', () => {
		slider.goTo('prev');
		slider.pause();
		setTimeout(slider.play, 10000);
	});

	btnReviewNext.addEventListener('click', () => {
		slider.goTo('next');
		slider.pause();
		setTimeout(slider.play, 10000);
	});
}

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function(e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.getElementsByClassName.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(() => {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// требуется для поддержки <IE11
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
const iconMenu = document.querySelector('.icon-menu');
if (iconMenu) {
	const menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener("click", () => {
		document.body.classList.toggle('lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}

//	работа калькулятора на основной странице и в поп-апе
const calcCheckboxs = document.querySelectorAll('.checkbox');
let priceList = new Map();

if (calcCheckboxs.length > 0) {
	let calcTotal = 0;

	calcCheckboxs.forEach(calcCheckbox => {
		calcCheckbox.addEventListener('change', (event) => {
			const priceAmounts = document.querySelectorAll('.price__amount');
			if (event.target.checked) {
				calcTotal += parseInt(event.target.value, 10);

				//	формируем элемент DIV для вставки в поп-ап
				/*console.log("--- элемент DIV для вставки ---");
				let divElem = document.createElement('div');
				divElem.className = "price-item";
				divElem.innerHTML = document.getElementById(event.target.id).nextElementSibling.innerHTML +
					` <span>` + event.target.value + `</span>`;
				console.log(divElem);
				console.log("----------------");*/

				//	формируем MAP для вставки в поп-ап
				let priceItem = `<div class="price-item"> ` +
					document.getElementById(event.target.id).nextElementSibling.innerHTML +
					` <span>` + event.target.value + `</span>
							</div>`;
				priceList.set(event.target.id, priceItem);
			} else {
				calcTotal -= parseInt(event.target.value, 10);
				//	удаляем элемент из МАР, когда снимаем галку с этого элемента
				priceList.delete(event.target.id);
			}

			if (priceAmounts.length > 0) {
				priceAmounts.forEach(priceAmount => {
					const calcButton = document.querySelector('.price__btn');
					if (calcTotal === 0) {
						calcButton.classList.add('disable');
						priceAmount.textContent = "выберите процедуру для расчета стоимости";
					} else {
						priceAmount.textContent = `${calcTotal} руб.`;
						calcButton.classList.remove('disable');
					}
				});
			}
		});
	});
}

/*const priceBtn = document.querySelector('.price__btn');

if (priceBtn) {
	const formPrice = document.querySelector('.form__price');

	priceBtn.addEventListener('click', () => {
		if (formPrice) {
			//	очистка списка выбранных услуг
			while (formPrice.firstChild) {
				formPrice.firstChild.remove();
			}

			//	вставка выбранных услуг
			for (let priceMapElement of priceList.values()) {
				formPrice.insertAdjacentHTML("beforeend", priceMapElement);
			}
		}
	});
}*/


//  ####################
//  ###     start    ###
//  JS-функция определения поддержки WebP

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});

//  ###     end    ###


//  ####################
//  ###     start    ###
//  скрипт для работы стрелочки выпадающего меню на тачах (реализован ниже)

let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;		// объект, на котором произошел клик

		//	скрипт для работы стрелочки выпадающего меню на тачах
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}

			// удаляем класс '._hover' у всех элементов, у которых он есть
			let elements_hover = document.querySelectorAll('.menu__item._hover');
			if (!targetElement.closest('.menu__item') && elements_hover.length > 0) {
				for (let elem of elements_hover) {
					elem.classList.remove('_hover');
				}
			}
		}

		//	показываем форму/скрываем поиска и кнопку поиска/закрыть
		if (targetElement.classList.contains('search-form__icon') ||
			targetElement.classList.contains('search-form__icon-close')) {
			document.querySelector('.header__search').classList.toggle('_active');
		}

		//	клика по кнопке "записаться" на главной странице для показа выбранных услуг в поп-апе
		if (targetElement.classList.contains('price__btn')) {
			const formPrice = document.querySelector('.form__price');
			if (formPrice) {
				//	очистка списка выбранных услуг
				while (formPrice.firstChild) {
					formPrice.firstChild.remove();
				}

				//	вставка выбранных услуг
				for (let priceMapElement of priceList.values()) {
					formPrice.insertAdjacentHTML("beforeend", priceMapElement);
				}
			}
		}
	}
}

//  ###     end    ###

//#region скрипт для динамического изменения ширины поля поиска (есть небольшие глюки)
resizeSearchField();
window.addEventListener('resize', resizeSearchField);

function resizeSearchField() {
	if ((document.documentElement.clientWidth < 930) && (document.documentElement.clientWidth > 767)) {
		document.querySelector('.search-form__item').style.width = document.querySelector('.menu__body').offsetWidth * 0.91 + 'px';
	} else if (document.documentElement.clientWidth < 767) {
		document.querySelector('.search-form__item').style.width = document.querySelector('.menu__item').offsetWidth + 'px';
	} else {
		document.querySelector('.search-form__item').style.width = document.querySelector('.menu__body').offsetWidth * 0.87 + 'px';
	}
}

//#endregion

//#region скрипт для плавной прокрутки страницы к нужному разделу по клику на ссылку

const signUpLinks = document.querySelectorAll('.promo__btn[data-goto]');
if (signUpLinks.length > 0) {
	signUpLinks.forEach(signUpLink => {
		signUpLink.addEventListener('click', onSignUpLinkClick);
	});

	function onSignUpLinkClick(e) {
		const signUpLink = e.target;
		if (signUpLink.dataset.goto && document.querySelector(signUpLink.dataset.goto)) {
			const gotoBlock = document.querySelector(signUpLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - 100;
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//#endregion

//#region SPOLLERS
//	SPOLLERS

const spollersArray = document.querySelectorAll('[data-spollers]');

if (spollersArray.length > 0) {
	//	получение обычных спойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});

	//инициализация обычных спойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// инициализация спойлеров с медиа-запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		//	получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		//	работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			//	Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			//	событие
			//matchMedia.addListener(function () {	//	устаревшая функция
			matchMedia.addEventListener("click", function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}

	//	Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}

	//	работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}

	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

// SlideToggle
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginBottom = 0;
		target.style.marginTop = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginBottom = 0;
		target.style.marginTop = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('margin-top');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

//========================================
/*
Для родителя спойлеров пишем атрибут data-spollers
Для заголовков спойлеров пишем атрибут data-spoller
Если нужно вкд/выкл работу спойлеров на разных размерах экранов, пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах меньше или равно 768px

Если нужно, чтобы в блоке открывался только один спойлер, добавляем атрибут data-one-spoller
*/

//#endregion


//#region  скрипт для вставки галереи сертификатов в попап

const textElement = document.querySelector('.images__slider');

if (textElement) {
	textElement.insertAdjacentHTML(
		'afterbegin',
		`
			<div class="images__item">
				<img src="/img/certificates/cert_05.jpg" alt="Сертификат">
			</div>
			<div class="images__item">
				<img src="/img/certificates/cert_02.jpg" alt="Сертификат">
			</div>
			<div class="images__item">
				<img src="/img/certificates/cert_03.jpg" alt="Сертификат">
			</div>
			<div class="images__item">
				<img src="/img/certificates/cert_04.jpg" alt="Сертификат">
			</div>
			<div class="images__item">
				<img src="/img/certificates/cert_01.jpg" alt="Сертификат">
			</div>
		`
	);
}

//	Определяем индекс картинки, с которой начать показывать сертификаты в попапе
const сertItem = document.querySelectorAll('.sertificate__item');
const galleryItem = document.querySelectorAll('.gallery__item');
let indexCurrent;

if (document.querySelector('.images__slider')) {
	var sliderImgs = tns({
		container: '.images__slider',
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: false,
		mode: 'gallery'
	});
}

if (сertItem.length > 0) {
	//console.log("wwwwwwwww");
	for (const item of сertItem) {
		item.addEventListener('click', () => {
			/*	получаем путь к картинке из тега IMG
			console.log(item.querySelector('img').src);
			console.log("-----------"); 
			*/
			const info = certifSlider.getInfo();
			indexCurrent = info.index;
			sliderImgs.goTo(indexCurrent - 1);
		});
	}
}

if (galleryItem.length > 0) {
	//console.log("qqqqqqqqqqqqqqqq");
	for (const item of galleryItem) {
		item.addEventListener('click', () => {
			console.log(item.querySelector('img').src);
			const info = gallerySlider.getInfo();
			//console.log("========================");
			//console.log(info.slideItems);
			//console.log("========================");
			indexCurrent = info.index;
			console.log("indexCurrent = " + indexCurrent);
			sliderImgs.goTo(indexCurrent - 1);
		});
	}
}

const btnImagesNext = document.querySelector('.images__btn-next');
const btnImagesPrev = document.querySelector('.images__btn-prev');

if (btnImagesPrev && btnImagesNext) {
	btnImagesPrev.addEventListener('click', () => {
		sliderImgs.goTo('prev');
	});

	btnImagesNext.addEventListener('click', () => {
		sliderImgs.goTo('next');
	});
}
;

//#endregion


//  ####################
//  ###     start    ###
//  скрипт для тестов


//  ###     end    ###