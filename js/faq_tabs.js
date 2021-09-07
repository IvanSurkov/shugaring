const faqTabs = document.querySelectorAll('.faq-tabs__item');

if (faqTabs.length > 0) {
	faqTabs.forEach((item) => {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			const id = e.target.getAttribute('href').replace('#', '');
			
			faqTabs.forEach((child) => {
				child.classList.remove('faq-tabs__item--active')
			});
			
			document.querySelectorAll('.faq-content__item').forEach((child) => {
				child.classList.remove('faq-content__item--active')
			});

			item.classList.add('faq-tabs__item--active');
			document.getElementById(id).classList.add('faq-content__item--active');
		});
	});
}

document.querySelector('.faq-tabs__item').click();

function faqtList(ittem) {
	console.log(ittem);

	document.querySelectorAll('.faq-content__item').forEach((child) => {
		child.classList.remove('faq-content__item--active')
	});

	document.getElementById(ittem).classList.add('faq-content__item--active');
}