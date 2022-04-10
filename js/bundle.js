/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculatorModule() {
    // Calclulator 

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings (parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);

        elements.forEach(item => {
            item.classList.remove(activeClass);

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }

            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "_____";
            return;
        }

        if (sex == "female") {
            result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
        } else {
            result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation (parent, activeClass) {
        const elements = document.querySelectorAll(`${parent} div`);

        elements.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation (inputSelector) {
        const input = document.querySelector(inputSelector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calculatorModule;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    //Class

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.classes = classes;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const elem = document.createElement('div');
            if (this.classes.length == 0) {
                this.classes.push('menu__item');
            }
            this.classes.forEach(item => {
                elem.classList.add(item);
            });
            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    }

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then((data) => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(
    //                 img,
    //                 altimg,
    //                 title,
    //                 descr,
    //                 price,
    //                 ".menu .container"
    //             ).render();
    //         });
    //     });

    // axios
    
    axios.get('http://localhost:3000/menu')
        .then((data) => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    ".menu .container"
                ).render();
            });
        });
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container"
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     20,
    //     ".menu .container",
    //     "menu__item",
    //     "big"
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     16,
    //     ".menu .container",
    //     "menu__item"
    // ).render();
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function postDataModule() {
    //POST

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы скоро свяжемся с вами',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, json) => {
        const result = await fetch(url, {
            method: 'POST',
            body: json,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await result.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            //statusMessage.setAttricute('src', message.loading);
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const obj = {};

            formData.forEach((value, key) => {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            // request.send(formData);
            // request.send(json);

            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //         statusMessage.remove();
            //     }
            // });

            //Fetch

            postData('http://localhost:3000/requests',json)
            .then(() => {
                showThanksModal(message.success);
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
                statusMessage.remove();
            });
        });
    }

    function showThanksModal (message) {
        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}

module.exports = postDataModule;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    //Modal

    const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');    
        document.body.style.overflow = 'hidden';
        clearTimeout(timeModal);
    }

    modalTriggers.forEach(item => {
        item.addEventListener('click', showModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const timeModal = setTimeout(showModal, 50000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function sliderModule() {
    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
        previous = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // окошко
        slidesField = document.querySelector('.offer__slider-inner'), // лента со слайдами
        width = window.getComputedStyle(slidesWrapper).width, // ширина окошка
        slider = document.querySelector('.offer__slider');
    let index = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${index}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `${index}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
        dotsArr = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (index == slides.length) {
            index = 1;
        } else {
            index++;
        }

        if (slides.length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = `${index}`;
        }

        dotsArr.forEach(item => {
            item.style.opacity = '.5';
        });
        dotsArr[index - 1].style.opacity = 1;
    });

    previous.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (index == 1) {
            index = slides.length;
        } else {
            index--;
        }

        if (slides.length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = `${index}`;
        }

        dotsArr.forEach(item => {
            item.style.opacity = '.5';
        });
        dotsArr[index - 1].style.opacity = 1;
    });

    // showSlides(1);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         index = 1;
    //     }

    //     if (n < 1) {
    //         index = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     slides[index - 1].style.display = 'block';

    //     if (index < 10) {
    //         current.textContent = `0${index}`;
    //     } else {
    //         current.textContent = slides.length;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(index += n);
    // }

    // previous.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    dotsArr.forEach(item => item.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        index = slideTo;
        // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = `${index}`;
        }

        dotsArr.forEach(item => {
            item.style.opacity = '.5';
        });
        dotsArr[index - 1].style.opacity = 1;
    }));
}

module.exports = sliderModule;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabcontent () {
        tabContent.forEach(item => {
            // item.style.display = "none";
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabcontent (i = 0) {
        // tabContent[i].style.display = 'block';
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabcontent();
    showTabcontent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabcontent();
                    showTabcontent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    //Timer

    const deadline = '2022-05-01';

    function getTimeRemaining (endtime) {
        const temp = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(temp / (60 * 1000 * 60 * 24)),
            hours= Math.floor((temp / (60 * 1000 * 60)) % 24),
            minutes= Math.floor((temp / (60 * 1000)) % 60),
            seconds= Math.floor((temp / 1000) % 60);
        
        return {
            'total': temp,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock () {
            const temp = getTimeRemaining(endtime);

            days.innerHTML = getZero(temp.days);
            hours.innerHTML = getZero(temp.hours);
            minutes.innerHTML = getZero(temp.minutes);
            seconds.innerHTML = getZero(temp.seconds);

            if (temp.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

    tabs();
    timer();
    cards();
    modal();
    forms();
    slider();
    calculator();
});






})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map