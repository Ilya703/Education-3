window.addEventListener('DOMContentLoaded', () => {
    const tabs = require("./modules/tabs"),
        timer = require("./modules/timer"),
        cards = require("./modules/cards"),
        modal = require("./modules/modal"),
        forms = require("./modules/forms"),
        slider = require("./modules/slider"),
        calculator = require("./modules/calculator");

    tabs();
    timer();
    cards();
    modal();
    forms();
    slider();
    calculator();
});





