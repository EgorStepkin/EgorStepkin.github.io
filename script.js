document.addEventListener('DOMContentLoaded', function() {
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

    // Автоформатирование телефона
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
});
