function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showModal (modalSelector, timeModal) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');    
    document.body.style.overflow = 'hidden';

    if (timeModal) {
        clearTimeout(timeModal);
    }
}

function modal(triggerSelector, modalSelector, timeModal) {
    //Modal

    const modalTriggers = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTriggers.forEach(item => {
        item.addEventListener('click', () => showModal(modalSelector, timeModal));
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal(modalSelector, timeModal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {showModal};