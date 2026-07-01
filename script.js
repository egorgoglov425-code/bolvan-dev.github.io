// =================================================================
// СЦЕНАРИЙ И АНИМАЦИЯ МАТРИЦЫ ДЛЯ САЙТА ООО БОЛВАОС v1.0
// =================================================================

// 1. КОД АНИМАЦИИ ЦИФРОВОГО ДОЖДЯ МАТРИЦЫ
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Растягиваем холст на весь экран
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Символы Матрицы (Хакерские буквы и цифры)
    const katakana = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZBOREXBXBURMALDA';
    const alphabet = katakana.split('');

    const fontSize = 16;
    let columns = canvas.width / fontSize;

    // Массив для отслеживания падения капель
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    // Функция отрисовки кадров
    function drawMatrix() {
        // Слегка размываем предыдущий кадр для эффекта следа
        ctx.fillStyle = 'rgba(2, 3, 5, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00'; // Наш фирменный зеленый цвет
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    // Запуск анимации (25 кадров в секунду)
    setInterval(drawMatrix, 40);
});

// 2. БАЗА ДАННЫХ ГОТОВЫХ СБОРКОВ BOLVAL OS
const bolvalReleases = {
    "modern-pc": {
        name: "Bolval OS: Standard Edition (x86_64)",
        desc: "Для современных ПК и ThinkPad. Ядро CachyOS BORE, заставка Plymouth (Xbox 360), графика COSMIC на базе KDE Plasma и пакетный менеджер XBX.",
        link: "https://github.com"
    },
    "legacy-pc": {
        name: "Bolval OS: Legacy TTY Edition (i686/x86_32)",
        desc: "Для старых ноутбуков (ThinkPad 1999) и консолей PS4/PS5. Чистый текстовый режим TTY, Gentoo-style XBX, ручная разметка.",
        link: "https://github.com"
    },
    "router": {
        name: "Bolval OS: Embedded Router Edition (MIPS/ARM)",
        desc: "Для домашних роутеров и приемников GS. Микро-образ на базе Buildroot. Встроенный демон Zapret для обхода DPI.",
        link: "https://github.com"
    },
    "lg-tv": {
        name: "Bolval OS: Smart TV Edition (.ipk package)",
        desc: "Специальная сборка для телевизоров LG на базе webOS (ARM64). Включает медиацентр Kodi и встроенный движок Waydroid для запуска Android APK!",
        link: "https://github.com"
    },
    "retail": {
        name: "Bolval OS: Retail & POS Edition (x86/ARM64)",
        desc: "Для супермаркетов (Магнит, Пятёрочка) и пекарен. Встроенная поддержка онлайн-касс АТОЛ, сканеров штрих-кодов и защищенный Kiosk Mode.",
        link: "https://github.com"
    },
    "education": {
        name: "Bolval OS: Education Edition (i686/x86_64)",
        desc: "Для школ и учебных заведений. Оптимизирована для слабых ПК. Включает LibreOffice, Scratch, Python и систему удаленного управления классом Veyon.",
        link: "https://github.com"
    },
    "medical": {
        name: "Bolval OS: Medical Enterprise Edition (x86_64)",
        desc: "Для больниц и поликлиник. Ультра-защищенное ядро, поддержка ГОСТ-криптографии, USB-токенов авторизации врачей и DICOM-снимков.",
        link: "https://github.com"
    }
};

const grubTemplates = {
    novice: `# === BOLVAL OS BOOT MENU (FOR BEGINNERS) ===
set timeout=5
set default=0

menuentry "Bolval OS (Live GUI + Calamares Installer)" --class bolvalos --class kde {
    linux /boot/vmlinuz-cachyos root=/dev/sr0 rw quiet splash systemd.unit=graphical.target
    initrd /boot/initramfs.img
}`,
    terpila: `# === BOLVAL OS BOOT MENU (HARDCORE GENTOO/ARCH MODE) ===
set timeout=1
set default=0

menuentry "Bolval OS (Pure TTY / Manual Source Compilation Mode)" --class bolvalos --class terminal {
    insmod video
    set gfxpayload=text
    linux /boot/vmlinuz-cachyos root=/dev/sda2 rw nomodeset init=/sbin/init 3 xbx.compile=source
    initrd /boot/initramfs.img
}`
};

// Функция интерактивного подбора версии
function findMyVersion() {
    const device = document.getElementById("q-device").value;
    const power = document.getElementById("q-power").value;
    const mode = document.getElementById("q-mode").value;
    const specBox = document.getElementById("spec-box");
    
    let resultKey = "modern-pc";

    if (device === "router") resultKey = "router";
    else if (device === "tv-intercom") resultKey = "lg-tv";
    else if (device === "retail") resultKey = "retail";
    else if (device === "education") resultKey = "education";
    else if (device === "medical") resultKey = "medical";
    else if (device === "pc-console" || device === "kozen-p12" || device === "atm-edition") {
        if (power === "old" || mode === "tty") {
            resultKey = "legacy-pc";
        } else {
            resultKey = "modern-pc";
        }
    }

    // Меняем цвета рамки под медицинскую версию
    if (device === 'medical') {
        specBox.style.borderColor = "#ff0000";
        specBox.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.4)";
    } else {
        specBox.style.borderColor = "#00ff00";
        specBox.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.3)";
    }

    const release = bolvalReleases[resultKey];
    document.getElementById("download-zone").style.display = "block";
    document.getElementById("result-name").innerText = release.name;
    document.getElementById("result-desc").innerText = release.desc;
    document.getElementById("result-link").href = release.link;
}

function changeGrubMode(mode) {
    document.getElementById("grub-display").innerText = grubTemplates[mode];
    const buttons = document.querySelectorAll(".btn-mode");
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}

// 3. ЛОГИКА МЕДИАПЛЕЕРА, ЭКРАНА КИБЕР-БОГА И ПЕРЕЗАГРУЗКИ
let isPlaying = false;
let progressInterval = null;

function playVideo() {
    if (isPlaying) return;
    isPlaying = true;

    const img = document.getElementById("video-canvas");
    const fill = document.querySelector(".progress-fill");
    
    img.style.opacity = "0.2";
    setTimeout(() => img.style.opacity = "1", 100);
    setTimeout(() => img.style.opacity = "0.4", 200);
    setTimeout(() => img.style.opacity = "1", 300);

    let width = 0;
    fill.style.width = "0%";
    
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            
            // Создаем экран Бурмалда-Поздравления
            const successText = document.createElement("pre");
            successText.id = "success-screen";
            successText.innerHTML = `
==================================================
  ____        _                 _    ___  ____  

 | __ )  ___ | |_   ____ _  ___| |  / _ \\/ ___| 
 |  _ \\ / _ \\| \\ \\ / / _\` |/ _ \\ | | | | \\___ \\ 
 | |_) | (_) | |\\ V / (_| |  __/ | | |_| |___) |
 |____/ \___/|_| \_/ \__,_|\\___|_|  \\___/|____/ 
==================================================
 ПОЗДРАВЛЯЮ! ТЫ УСПЕШНО УСТАНОВИЛ BOLVAL OS!
 
 ЧУВСТВУЙ СЕБЯ КИБЕР-БОГОМ И КОРОЛЕМ ЛИНУКСА!
 System Status: Ready | Version: 1.0 Stable
 Filesystem: BurmaldaFS Active | Package: XBX Loaded
==================================================
 [!] Инициализация автоматической перезагрузки...`;
            
            img.style.display = "none";
            img.parentNode.insertBefore(successText, img);
            
            // Имитация авто-перезагрузки через 4 секунды
            setTimeout(() => {
                successText.innerHTML += "\n [!] Rebooting system now...";
                successText.style.opacity = "0";
                
                setTimeout(() => {
                    successText.remove();
                    img.style.display = "block";
                    img.style.opacity = "1";
                    fill.style.width = "0%";
                    isPlaying = false;
                }, 800);
                
            }, 4000);

        } else {
            width++;
            fill.style.width = width + "%";
        }
    }, 40);
}

function pauseVideo() {
    clearInterval(progressInterval);
    isPlaying = false;
    document.getElementById("video-canvas").style.opacity = "0.5";
}

function openModal() { document.getElementById("dualboot-modal").style.display = "flex"; }
function closeModal() { document.getElementById("dualboot-modal").style.display = "none"; }

window.onclick = function(event) {
    const modal = document.getElementById("dualboot-modal");
    if (event.target == modal) modal.style.display = "none";
}

// 4. МУЛЬТИЯЗЫЧНОСТЬ
function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    localStorage.setItem('bolval_lang', lang);
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) element.innerText = translations[lang][key];
    });
}

window.addEventListener('DOMContentLoaded', () => {

