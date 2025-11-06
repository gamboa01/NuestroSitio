document.addEventListener('DOMContentLoaded', function() {
    const loveExplosion = document.getElementById('loveExplosion');
    const message = document.getElementById('message');
    const bell = document.getElementById('bell');
    const surpriseBtn = document.getElementById('surpriseBtn');
    const photoFrame = document.getElementById('photoFrame');
    
    // Variables para el contador de clics (sorpresa de 4 clics)
    let clickCount = 0;
    let lastClickTime = 0;
    
    // Lista de palabras bonitas y apodos románticos
    const romanticWords = [
        "Amor mío", "Mi Cielo", "Mi vida", "Mi Corazón", "Mi Princesa", 
        "Mi reina", "Mi Tesoro", "Mi sonrisita de luna", "Mi todo", "Mi razón de ser",
        "Mi ojitos bonitos", "Mi paz", "Mi felicidad", "Mi complemento", "Mi inspiración",
        "Mi fortaleza", "Mi sonrisa", "Mi destino", "Mi dulzura", "Mi consuelo",
        "Mi alegría", "Mi amor eterno", "Mi amor verdadero", "Mi amor infinito",
        "Amor de mi vida", "Mi amorcito", "Mi Niña Bonita", "Mi Chiquita", "Mi Bebé"
    ];

    // Lista de 10 frases para la sorpresa de 4 clics
    const secretPhrases = [
        "¡Eres mi persona favorita en todo el mundo! 🌎",
        "Cada día a tu lado es un regalo bien bonito 💝",
        "No existe estrella que brille más que tu sonrisa ✨",
        "Eres el sueño que nunca quise despertar 🌙",
        "Mi corazón late de amor por ti 💓",
        "El amor más bonito es el que construimos juntos 🏡",
        "Eres mi hoy y todos mis mañanas 🌅",
        "No hay un solo día que quiera estar lejos de ti 🚫⏳",
        "Eres mi lugar seguro en todo momento 🛡️",
        "Contigo aprendí que el amor verdadero existe 💞"
    ];

    // Lista de cupones de pareja (con persistencia mensual)
    const coupleCoupons = [
        { id: 1, text: "🍫 Cupón: 1 chocolate favorito", used: false },
        { id: 2, text: "💋 Cupón: 1 beso sorpresa", used: false },
        { id: 3, text: "🤗 Cupón: 1 abrazo prolongado", used: false },
        { id: 4, text: "💆 Cupón: 1 masaje relajante", used: false },
        { id: 5, text: "🍝 Cupón: 1 cena romántica", used: false },
        { id: 6, text: "🎥 Cupón: 1 película de tu elección", used: false },
        { id: 7, text: "☕ Cupón: 1 mañana de café", used: false },
        { id: 8, text: "🎁 Cupón: 1 regalo sorpresa", used: false },
        { id: 9, text: "💑 Cupón: 1 cita romántica", used: false },
        { id: 10, text: "💞 Cupón: 1 día de mimos especiales", used: false }
    ];

    // ===== FUNCIONES PRINCIPALES ===== //

    // Función para crear corazones flotantes
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }
    }
    
    // Función para mostrar palabras románticas flotantes
    function showRomanticWords() {
        for (let i = 0; i < 15; i++) {
            const wordElement = document.createElement('div');
            const randomWord = romanticWords[Math.floor(Math.random() * romanticWords.length)];
            
            wordElement.textContent = randomWord;
            wordElement.style.position = 'fixed';
            wordElement.style.left = Math.random() * 85 + 'vw';
            wordElement.style.top = Math.random() * 85 + 'vh';
            wordElement.style.fontSize = (Math.random() * 20 + 16) + 'px';
            wordElement.style.color = getRandomColor();
            wordElement.style.fontWeight = 'bold';
            wordElement.style.zIndex = '1001';
            wordElement.style.textShadow = '1px 1px 3px rgba(0,0,0,0.3)';
            wordElement.style.animation = `float ${(Math.random() * 3 + 2)}s ease-in-out forwards`;
            wordElement.style.pointerEvents = 'none';
            
            document.body.appendChild(wordElement);
            setTimeout(() => wordElement.remove(), 3000);
        }
    }

    // Función para la explosión de amor (al tocar la campana)
    function showLoveExplosion() {
        loveExplosion.style.opacity = '1';
        loveExplosion.style.pointerEvents = 'auto';
        createHearts();
        
        setTimeout(() => {
            loveExplosion.style.opacity = '0';
            loveExplosion.style.pointerEvents = 'none';
            message.classList.add('visible');
            photoFrame.classList.add('visible');
        }, 3000);
    }

    // Función para el mensaje del día 11
    function checkSpecialDate() {
        const today = new Date();
        if (today.getDate() === 11) {
            const dateMessage = document.createElement('div');
            dateMessage.innerHTML = 'Un nuevo mes junto a ti ❤️';
            dateMessage.style.position = 'fixed';
            dateMessage.style.top = '20px';
            dateMessage.style.left = '0';
            dateMessage.style.width = '100%';
            dateMessage.style.textAlign = 'center';
            dateMessage.style.fontSize = '2rem';
            dateMessage.style.color = '#ff4081';
            dateMessage.style.fontFamily = "'Dancing Script', cursive";
            dateMessage.style.fontWeight = 'bold';
            dateMessage.style.zIndex = '1002';
            dateMessage.style.animation = 'fadeIn 2s ease-in-out';
            document.body.appendChild(dateMessage);
            
            setTimeout(() => {
                dateMessage.style.animation = 'fadeOut 2s ease-in-out';
                setTimeout(() => dateMessage.remove(), 2000);
            }, 5000);
        }
    }

    // Función para la sorpresa de 4 clics
    function handleQuadClick() {
        const now = Date.now();
        if (now - lastClickTime < 500) {
            clickCount++;
            if (clickCount === 3) {
                showSecretMessage();
                clickCount = 0;
            }
        } else {
            clickCount = 0;
        }
        lastClickTime = now;
    }

    // Función para mostrar mensaje secreto (4 clics)
    function showSecretMessage() {
        const randomPhrase = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
        
        const secretOverlay = document.createElement('div');
        secretOverlay.style.position = 'fixed';
        secretOverlay.style.top = '0';
        secretOverlay.style.left = '0';
        secretOverlay.style.width = '100%';
        secretOverlay.style.height = '100%';
        secretOverlay.style.backgroundColor = 'rgba(194, 24, 91, 0.9)';
        secretOverlay.style.zIndex = '2000';
        secretOverlay.style.display = 'flex';
        secretOverlay.style.justifyContent = 'center';
        secretOverlay.style.alignItems = 'center';
        secretOverlay.style.flexDirection = 'column';
        document.body.appendChild(secretOverlay);
        
        const secretMessage = document.createElement('div');
        secretMessage.innerHTML = randomPhrase;
        secretMessage.style.fontSize = '2.5rem';
        secretMessage.style.color = 'white';
        secretMessage.style.fontFamily = "'Pacifico', cursive";
        secretMessage.style.textAlign = 'center';
        secretMessage.style.padding = '20px';
        secretMessage.style.maxWidth = '80%';
        secretOverlay.appendChild(secretMessage);
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '❤️ Cerrar ❤️';
        closeBtn.style.marginTop = '30px';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.borderRadius = '50px';
        closeBtn.style.border = 'none';
        closeBtn.style.backgroundColor = '#ff4081';
        closeBtn.style.color = 'white';
        closeBtn.style.fontFamily = "'Dancing Script', cursive";
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => secretOverlay.remove());
        secretOverlay.appendChild(closeBtn);
        
        // Efecto de confeti
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    }

    // Función para el emoji oculto (cupones de pareja)
    function createHiddenEmoji() {
        const hiddenEmoji = document.createElement('div');
        hiddenEmoji.innerHTML = '🔘';
        hiddenEmoji.style.position = 'fixed';
        hiddenEmoji.style.right = '20px';
        hiddenEmoji.style.bottom = '20px';
        hiddenEmoji.style.fontSize = '5px';
        hiddenEmoji.style.opacity = '0.1';
        hiddenEmoji.style.cursor = 'pointer';
        hiddenEmoji.style.zIndex = '9999';
        hiddenEmoji.style.transition = 'all 0.3s ease';
        hiddenEmoji.title = '¿Qué será esto?';
        
        hiddenEmoji.addEventListener('mouseover', () => {
            hiddenEmoji.style.opacity = '0.3';
            hiddenEmoji.style.fontSize = '8px';
        });
        
        hiddenEmoji.addEventListener('mouseout', () => {
            hiddenEmoji.style.opacity = '0.1';
            hiddenEmoji.style.fontSize = '5px';
        });
        
        hiddenEmoji.addEventListener('click', showCoupon);
        document.body.appendChild(hiddenEmoji);
    }

    // Función para mostrar cupones (válidos solo con captura)
    function showCoupon() {
        const unusedCoupons = getUnusedCoupons();
        if (unusedCoupons.length === 0) {
            alert("¡Todos los cupones de este mes han sido usados! Vuelve el próximo mes.");
            return;
        }

        const randomCoupon = unusedCoupons[Math.floor(Math.random() * unusedCoupons.length)];
        markCouponAsUsed(randomCoupon.id);

        const couponOverlay = document.createElement('div');
        couponOverlay.style.position = 'fixed';
        couponOverlay.style.top = '0';
        couponOverlay.style.left = '0';
        couponOverlay.style.width = '100%';
        couponOverlay.style.height = '100%';
        couponOverlay.style.backgroundColor = 'rgba(255, 192, 203, 0.95)';
        couponOverlay.style.zIndex = '2000';
        couponOverlay.style.display = 'flex';
        couponOverlay.style.justifyContent = 'center';
        couponOverlay.style.alignItems = 'center';
        couponOverlay.style.flexDirection = 'column';
        document.body.appendChild(couponOverlay);

        const couponText = document.createElement('div');
        couponText.innerHTML = randomCoupon.text;
        couponText.style.fontSize = '2.5rem';
        couponText.style.color = '#c2185b';
        couponText.style.fontFamily = "'Dancing Script', cursive";
        couponText.style.textAlign = 'center';
        couponText.style.padding = '20px';
        couponText.style.backgroundColor = 'white';
        couponText.style.borderRadius = '10px';
        couponText.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        couponOverlay.appendChild(couponText);

        const couponNote = document.createElement('div');
        couponNote.innerHTML = '⚠️ Válido solo con captura de pantalla ⚠️';
        couponNote.style.marginTop = '20px';
        couponNote.style.fontSize = '1.2rem';
        couponNote.style.color = '#c2185b';
        couponNote.style.fontFamily = "'Arial', sans-serif";
        couponOverlay.appendChild(couponNote);

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '❤️ Cerrar ❤️';
        closeBtn.style.marginTop = '30px';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.borderRadius = '50px';
        closeBtn.style.border = 'none';
        closeBtn.style.backgroundColor = '#c2185b';
        closeBtn.style.color = 'white';
        closeBtn.style.fontFamily = "'Dancing Script', cursive";
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => couponOverlay.remove());
        couponOverlay.appendChild(closeBtn);
    }

    // ===== FUNCIONES DE APOYO ===== //
    
    function getRandomColor() {
        const colors = ['#ff4081', '#e91e63', '#c2185b', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['❤️', '✨', '🌟', '💖', '🥰'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.zIndex = '2001';
        confetti.style.animation = `confettiFall ${(Math.random() * 3 + 2)}s linear forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }

    function getUnusedCoupons() {
        const usedCoupons = JSON.parse(localStorage.getItem('usedCoupons')) || [];
        return coupleCoupons.filter(coupon => !usedCoupons.includes(coupon.id));
    }

    function markCouponAsUsed(id) {
        const usedCoupons = JSON.parse(localStorage.getItem('usedCoupons')) || [];
        if (!usedCoupons.includes(id)) {
            usedCoupons.push(id);
            localStorage.setItem('usedCoupons', JSON.stringify(usedCoupons));
            
            const now = new Date();
            const lastUsedDate = localStorage.getItem('lastUsedDate');
            if (lastUsedDate) {
                const lastDate = new Date(lastUsedDate);
                if (lastDate.getMonth() !== now.getMonth()) {
                    localStorage.removeItem('usedCoupons');
                    localStorage.setItem('lastUsedDate', now.toISOString());
                }
            } else {
                localStorage.setItem('lastUsedDate', now.toISOString());
            }
        }
    }

    // ===== EVENT LISTENERS ===== //

    bell.addEventListener('click', function() {
        bell.style.animation = 'none';
        setTimeout(() => {
            bell.style.display = 'none';
            showLoveExplosion();
        }, 500);
    });

    surpriseBtn.addEventListener('click', function() {
        createHearts();
        showRomanticWords();
        handleQuadClick();
    });

    // ===== INICIALIZACIÓN ===== //
    createHiddenEmoji();
    checkSpecialDate();
});
