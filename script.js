// 1. АККОРДЕОНЫ
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        header.parentElement.classList.toggle('active');
    });
});

// 2. КАЛЬКУЛЯТОР СТОИМОСТИ
function updateTotal() {
    let total = 0;
    const checkboxes = document.querySelectorAll('.service');
    
    checkboxes.forEach(box => {
        if (box.checked) {
            total += parseInt(box.getAttribute('data-price'));
        }
    });

    const totalValElement = document.getElementById('total-val');
    if (totalValElement) {
        totalValElement.innerText = total.toLocaleString('ru-RU');
    }

    const btn = document.getElementById('contact-btn');
    if (btn) {
        if (total > 0) {
            btn.innerText = `ЗАКАЗАТЬ ЗА ${total.toLocaleString('ru-RU')} ₸`;
            btn.style.background = 'var(--purple)';
            btn.style.color = '#fff';
            btn.href = `https://wa.me/77055755098?text=Здравствуйте!%20Хочу%20заказать%20рекламу.%20Примерная%20сумма:%20${total}%20тенге`;
        } else {
            btn.innerText = 'ОБСУДИТЬ СОТРУДНИЧЕСТВО';
            btn.style.background = '#fff';
            btn.style.color = '#000';
            btn.href = `https://wa.me/77055755098`;
        }
    }
}

// 3. АНИМАЦИЯ ЦИФР И ПОЛОСОК
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('fill')) {
                entry.target.style.width = entry.target.getAttribute('data-width');
            }
            if (entry.target.classList.contains('fill-v')) {
                entry.target.style.height = entry.target.getAttribute('data-h');
            }

            if (entry.target.classList.contains('num')) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const inc = target / 50;

                const updateCount = () => {
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = count.toFixed(1);
                        setTimeout(updateCount, 30);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.num, .fill, .fill-v').forEach(el => observer.observe(el));

// Улучшенное плавное появление секций
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Следим только за основными секциями, не трогая контент внутри
document.querySelectorAll('.section, .stat-card').forEach(s => {
    s.classList.add('reveal'); // Добавляем класс для начального состояния
    sectionObserver.observe(s);
});

function openTab(evt, tabName) {
    // 1. Прячем все вкладки
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // 2. Делаем все кнопки неактивными
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // 3. Показываем нужную вкладку и подсвечиваем кнопку
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}