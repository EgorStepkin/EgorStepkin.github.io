document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const methodSelector = document.querySelectorAll('input[name="contact_method"]');
    const telegramField = document.getElementById('telegram-field');
    const phoneField = document.getElementById('phone-field');
    const telegramInput = document.querySelector('input[name="telegram"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    
    // Переключение между полями Telegram и телефона
    methodSelector.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'telegram') {
                telegramField.style.display = 'block';
                phoneField.style.display = 'none';
                telegramInput.setAttribute('required', 'required');
                phoneInput.removeAttribute('required');
            } else {
                telegramField.style.display = 'none';
                phoneField.style.display = 'block';
                phoneInput.setAttribute('required', 'required');
                telegramInput.removeAttribute('required');
            }
        });
    });
    
    // Форматирование телефона при вводе
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
            
            // Форматирование номера: +7 (916) 123-45-67
            if (value.length > 2) {
                value = value.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
            }
            
            e.target.value = value;
        });
    }
    
    // Валидация формы
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Валидация телефона, если выбран этот способ
            if (phoneField.style.display !== 'none') {
                const phoneValue = phoneInput.value.replace(/\D/g, '');
                if (!/^(\+7|7|8)\d{10}$/.test(phoneValue)) {
                    alert('Пожалуйста, введите корректный номер телефона в формате +79161234567');
                    phoneInput.focus();
                    isValid = false;
                }
            }
            
            // Валидация Telegram, если выбран этот способ
            if (telegramField.style.display !== 'none') {
                const telegramValue = telegramInput.value.trim();
                if (!/^[A-Za-z0-9_]{5,32}$/.test(telegramValue)) {
                    alert('Пожалуйста, введите корректный Telegram username (5-32 символа, только буквы, цифры и подчеркивания)');
                    telegramInput.focus();
                    isValid = false;
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                return;
            }
            
            // Показываем состояние загрузки
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                // Восстанавливаем кнопку через 5 секунд на случай ошибки
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
