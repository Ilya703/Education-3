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