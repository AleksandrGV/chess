// Константы, переменные

const tickeds = document.querySelectorAll('.marquee');

// Константы и переменные для слайдера 1 goals
const sliderContainer = document.querySelector('.slider-container');
const sliderGoals = document.querySelector('.slider-goals-mobile');
const sliderGoalsItem = sliderGoals.querySelectorAll('.slider-goals-mobile__item');
const btnControlGoals = document.querySelectorAll('.control-goals');
const btnControlGoalsLeft = document.querySelector('.control-goals-left');
const btnControlGoalsRight = document.querySelector('.control-goals-right');
const sliderDots = document.querySelector('.slider-dots');
const sliderDotsButton = sliderDots.querySelectorAll('.slider-dots__button');
const sliderDotsChildrens = [...sliderDots.children];

// Константы и переменные для слайдера 2
const wrapper = document.querySelector('.tournament-participants__wrap');
const slider = document.querySelector('.slider');
const sliderItem = slider.querySelector('.slider__item').offsetWidth;
const btnControl = document.querySelectorAll('.control');
const btnControlLeft = document.querySelector('.control-left');
const btnControlRight = document.querySelector('.control-right');
const counter = document.querySelector('.slider-counter');
const sliderCounterCurrent = counter.querySelector('.slider-counter__current');
const sliderCounterTotal = counter.querySelector('.slider-counter__total');
const sliderChildrens = [...slider.children];
const mediaQuery = {
    desktop: window.matchMedia('(min-width: 901px)'),
    tablet: window.matchMedia('(min-width: 601px) and (max-width: 900px'),
    mobile: window.matchMedia('(max-width: 600px)'),
};

let count = 0;
let slideIndex = 0;
let isAutoPlay = true;

// Повторяющаяся бегущая строка

[...tickeds].forEach((ticket) => {
  ticket.classList.toggle("enable-animation");
});


//Блокируем кнопку при первичном открытии страницы
    btnControlGoalsLeft.setAttribute('disabled', '');

// Перебираем слайды
sliderGoalsItem.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Функция для перелистывания слайдов назад
const goLeft = () => {
  count--;
  slideImage();
  // Блокировка левой кнопки
    if(count === sliderGoals.scrollLeft) {
      btnControlGoalsLeft.disabled = true;
    }
};

// Функция перелистывания слайдов  вперед
const goRight = () => {
  count++;
  slideImage();
};


const slideImage = () => {

  sliderGoalsItem.forEach((slide) => {
    count < sliderGoalsItem.length ?
    slide.style.transform = `translateX(-${count * 100}%)`
    : count = sliderGoalsItem.length - 1;

  });
  sliderDotsButton.forEach((dot) => {
      dot.className = dot.className.replace(' active', '');
  });
  // Блокировка правой кнопки
  if (count === sliderGoalsItem.length - 1) {
    btnControlGoalsRight.disabled = true;
  } else {
    // Разблокировка левой и правой кнопки
    btnControlGoalsLeft.disabled = false;
    btnControlGoalsRight.disabled = false;

  }
  sliderDotsButton[count].className += " active";
};

// Функция для перелистывания слайдов кнопками (dots)
const currentSlide = (slideNumber) => {
  slideImage(count = slideNumber)
  count = slideNumber;
  sliderGoalsItem.forEach((slide) => {
    if(count < sliderGoalsItem.length) {
      slide.style.transform = `translateX(-${count * 100}%)`
    } else {
      count = sliderGoalsItem.length -1;
    }
    // Блокировка левой кнопки когда нажат первый dots
    if (count === sliderDots.scrollLeft) {
      btnControlGoalsLeft.disabled = true;
    }
  });
};


// Функция обновления данных счетчика
const dataCounter = () => {
    sliderCounterCurrent.textContent = slideIndex;
    sliderCounterTotal.textContent = sliderChildrens.length;
//   counter.textContent = slideIndex + '/' + sliderChildrens.length;

    // counter.textContent = current + '/' + total;
}

// Инициализация функции счетчика
dataCounter();

const resizeWindow = () => {
if (mediaQuery.desktop.matches) {
    slideIndex = 3;
}
 if (mediaQuery.tablet.matches) {
    slideIndex = 2;
 }
 if (mediaQuery.mobile.matches) {
    slideIndex = 1;
 }
 dataCounter();
};

resizeWindow(mediaQuery);

for (let i in mediaQuery) {
    mediaQuery[i].addEventListener('change', resizeWindow);
    resizeWindow(mediaQuery[i]);
}



// Получим количество карточек, которые могут поместиться в карусели одновременно.
let cardPerView = Math.round(slider.offsetWidth / sliderItem);

// Функция переключения счетчика
const sliderCounter = (direction) => {
    let slideMovement
if(mediaQuery.desktop.matches) {
    if(direction === 'right') {
        if (slideIndex <= 3) {
            slideIndex = slideIndex - 4;
        } else {
            slideIndex = slideIndex - 3;
        }
    } else {
        slideIndex = slideIndex + 3;
        // Для автоматического движения слайдов
        slideMovement = slider.scrollLeft += sliderItem * 3;
    }

    if(slideIndex < 3) {
        slideIndex = sliderChildrens.length;
    }
}
if(mediaQuery.tablet.matches) {
    if(direction === 'right') {
        if(slideIndex <= 2) {
            slideIndex = slideIndex - 3;
        } else {
            slideIndex = slideIndex - 2;
        }
    } else {
        slideIndex = slideIndex + 2;
        slideMovement = slider.scrollLeft += sliderItem * 2;
    }

    if (slideIndex < 2) {
        slideIndex = sliderChildrens.length;
    }
}
if(mediaQuery.mobile.matches) {
    if(direction === 'right') {
        if(slideIndex <= 1) {
            slideIndex = slideIndex - 2;
        } else {
            slideIndex = slideIndex - 1;
        }
    } else {
        slideIndex = slideIndex + 1;
        slideMovement = slider.scrollLeft += sliderItem * 1;
    }

    if (slideIndex < 1) {
        slideIndex = sliderChildrens.length;
    }
}

    if (slideIndex > sliderChildrens.length) {
        slideIndex = slideIndex % sliderChildrens.length;
    }

    dataCounter();
};

// Функция автоматического вопроизведения слайдов
const autoPlay = () => {
    isAutoPlay = setInterval(sliderCounter.bind(this), 4000);
};

autoPlay();

// Функция сброса авто воспроизведения
const stopInterval = () => {
    clearInterval(isAutoPlay);
    isAutoPlay = true;
};

// Вставляем копии последних нескольких карточек в начало карусели для бесконечной прокрутки.
sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
    slider.insertAdjacentHTML('afterbegin', card.outerHTML);
});

// Вставляем копии первых нескольких карточек в конец карусели для бесконечной прокрутки.
sliderChildrens.slice(0, cardPerView).forEach(card => {
    slider.insertAdjacentHTML('beforeend', card.outerHTML);
});

// Прокрутим карусель в нужном месте, чтобы скрыть первые несколько дубликатов карточек в Firefox.
slider.classList.add('no-transition');
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove('no-transition');

// Функция прослушивателя событий для кнопок со стрелками для прокрутки карусели влево и вправо.
const slideSwitch = () => {
    btnControl.forEach(btn => {
        btn.addEventListener('click', () => {
            if(mediaQuery.desktop.matches) {
                slider.scrollLeft += btn.id == 'left' ? - sliderItem * 3 : sliderItem * 3;
            }
            if(mediaQuery.tablet.matches) {
                slider.scrollLeft += btn.id == 'left' ? - sliderItem * 2 : sliderItem * 2;
            }
            if(mediaQuery.mobile.matches) {
                slider.scrollLeft += btn.id == 'left' ? - sliderItem * 1 : sliderItem * 1;
            }
        });
    });
};

// Функция зацикливания слайдера
const infinityScroll = () => {
    // Если слайдер находится в начале, прокручиваем до конца
    if(slider.scrollLeft === 0) {
        slider.classList.add('no-transition');
        slider.scrollLeft = slider.scrollWidth - (2 * slider.offsetWidth);
        slider.classList.remove('no-transition');
    }
    // Если слайдер находится в конце, прокручиваем в начало
    else if (Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
        slider.classList.add('no-transition');
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove('no-transition');
    }

    // Очищаем существующий тайм-аут и запустить автовоспроизведение
    stopInterval();
    if(!wrapper.matches(':hover')) autoPlay();
};

slideSwitch();

btnControlGoalsLeft.addEventListener('click', goLeft);
btnControlGoalsRight.addEventListener('click', goRight);

//Включаем бесконечную прокрутку слайдов
slider.addEventListener('scroll', infinityScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(isAutoPlay));
wrapper.addEventListener('mouseleave', autoPlay);

btnControlLeft.addEventListener('click', () => {
    btnControlLeft.setAttribute('disabled', 'disabled');
    setTimeout(() => {
        btnControlLeft.removeAttribute('disabled');
    }, 700);
    sliderCounter('right');
});
btnControlRight.addEventListener('click', () => {
    btnControlRight.setAttribute('disabled', 'disabled');
    setTimeout(() => {
        btnControlRight.removeAttribute('disabled');
    }, 700);
    sliderCounter('left');
});
