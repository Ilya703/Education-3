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