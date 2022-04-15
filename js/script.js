import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import modal from "./modules/modal";
import postDataModule from "./modules/forms";
import sliderModule from "./modules/slider";
import calculatorModule from "./modules/calculator";
import {showModal} from "./modules/modal";

window.addEventListener('DOMContentLoaded', () => {

    const timeModal = setTimeout(() => showModal('.modal', timeModal), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-05-01');
    cards();
    modal('[data-modal]', '.modal', timeModal);
    postDataModule('form', timeModal);
    sliderModule({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calculatorModule();
});