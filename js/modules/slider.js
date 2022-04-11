function sliderModule({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider

    const slides = document.querySelectorAll(slide),
        previous = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper), // окошко
        slidesField = document.querySelector(field), // лента со слайдами
        width = window.getComputedStyle(slidesWrapper).width, // ширина окошка
        slider = document.querySelector(container);
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

export default sliderModule;