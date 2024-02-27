// FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('active');

            // Сначала закрываем все ответы
            document.querySelectorAll('.faq-answer').forEach(el => {
                el.style.height = '0px'; // Сбрасываем высоту, чтобы анимировать закрытие
                el.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(el => {
                el.classList.remove('active');
            });

            // Если выбранный ответ был закрыт, открываем его
            if (!isOpen) {
                answer.classList.add('active');
                this.classList.add('active');

                // Расчет и установка высоты для анимации
                const answerHeight = answer.scrollHeight + "px";
                answer.style.height = answerHeight;
            } else {
                // Необязательно, если вы хотите закрыть ответ при повторном клике
                answer.style.height = "0px";
            }
        });
    });
});


// Преподаватели
document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('questionModal');
    var closeBtn = document.querySelector('.close-button');
    var questionForm = document.getElementById('questionForm');
    var askQuestionBtn = document.getElementById('askQuestionBtn');
    var responseMessage = document.createElement('div'); // Создаём элемент для сообщения об отправке
    responseMessage.style.display = 'none';
    document.body.appendChild(responseMessage); // Добавляем его на страницу

    // Функция для открытия модального окна
    askQuestionBtn.onclick = function() {
        modal.style.display = 'block';
        document.body.classList.add('body-no-scroll'); // Отключаем прокрутку
    };

    // Закрытие модального окна при нажатии на кнопку закрытия
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.classList.remove('body-no-scroll'); // Включаем прокрутку обратно
    };

    // Закрытие модального окна при нажатии вне его области
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('body-no-scroll'); // Включаем прокрутку обратно
        }
    };

    // Обработка отправки формы
    questionForm.onsubmit = function(event) {
        event.preventDefault(); // Предотвратить стандартную отправку формы
        // Здесь код для отправки данных формы, например, через Fetch API
        console.log("Форма отправлена. Преподаватель: ", questionForm.teacherName.value, ", Email: ", questionForm.userEmail.value, ", Вопрос: ", questionForm.userQuestion.value);

        // Показать сообщение об успешной отправке
        responseMessage.textContent = 'Ваш вопрос успешно отправлен!';
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'green';
        responseMessage.style.position = 'fixed';
        responseMessage.style.bottom = '20px';
        responseMessage.style.right = '20px';
        responseMessage.style.padding = '20px';
        responseMessage.style.backgroundColor = '#ddffdd';
        responseMessage.style.border = '1px solid #00aa00';
        responseMessage.style.borderRadius = '5px';

        // Очищаем форму
        questionForm.reset();

        // Закрываем модальное окно через 3 секунды
        setTimeout(function() {
            modal.style.display = 'none';
            responseMessage.style.display = 'none'; // Скрываем сообщение об отправке
            document.body.classList.remove('body-no-scroll');
        }, 3000);
    };
});


function toggleTeachers() {
    var teachersList = document.getElementById('teachersList');
    var button = document.getElementById('showTeachersBtn');

    if (teachersList.style.display === 'none' || teachersList.style.display === '') {
        teachersList.style.display = 'block';
        button.textContent = 'Скрыть преподавателей ↑'; // Изменяем текст кнопки на "Скрыть преподавателей"
    } else {
        teachersList.style.display = 'none';
        button.textContent = 'Показать преподавателей ↓'; // Изменяем текст обратно на "Показать преподавателей"
    }
}

// Маркер наверх
document.addEventListener('DOMContentLoaded', function() {
    var toTopButton = document.getElementById('toTop');
    window.onscroll = function() {
        if (window.scrollY > 100) {
            toTopButton.style.display = 'block';
        } else {
            toTopButton.style.display = 'none';
        }
    };

    toTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

// Карусель новостей
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const totalItems = items.length;
    let interval = null; // Инициализируем переменную интервала как null

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            indicators[index] && indicators[index].classList.remove('active');
        });
        items[currentIndex].classList.add('active');
        indicators[currentIndex] && indicators[currentIndex].classList.add('active');
    }

    function startInterval() {
        clearInterval(interval); // Очищаем существующий интервал перед созданием нового
        interval = setInterval(nextSlide, 5000); // Устанавливаем новый интервал
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Назначаем обработчики событий для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            startInterval(); // Перезапускаем интервал после ручного переключения
        });
    });

    // Опционально: Пауза и возобновление интервала при уходе/возвращении пользователя на вкладку
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            startInterval(); // Возобновляем интервал
        } else {
            clearInterval(interval); // Останавливаем интервал
        }
    });

    startInterval(); // Начинаем автоматическое переключение при загрузке страницы
});


$(document).ready(function() {
    var maxHeight = 0;

    // Находим максимальную высоту карточек
    $('.teacher-item').each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });

    // Устанавливаем всем карточкам одинаковую максимальную высоту
    $('.teacher-item').height(maxHeight);
});
