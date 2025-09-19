document.addEventListener('DOMContentLoaded', function() {
    // Создаем элемент для уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(notification);

    // Обработчик отправки формы
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Показываем уведомление
            notification.textContent = 'Заявка отправляется...';
            notification.style.display = 'block';
            
            // Автоматически скрываем через 3 секунды
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        });
    }

    // Форматирование телефона при вводе
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('7') && value.length === 11) {
                value = '+7' + value.substring(1);
            } else if (value.startsWith('8') && value.length === 11) {
                value = '+7' + value.substring(1);
            } else if (value.startsWith('9') && value.length === 10) {
                value = '+7' + value;
            }
            
            // Форматирование номера: +7 999 123-45-67
            if (value.length > 2) {
                value = value.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3-$4-$5');
            }
            
            e.target.value = value;
        });
    }

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Дополнительно: закрытие уведомления по клику
    notification.addEventListener('click', function() {
        this.style.display = 'none';
    });
});
