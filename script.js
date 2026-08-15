document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navActions.style.display = navActions.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navActions.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#121212';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid #333';
        });
    }

    // Simulación de datos del bot (si no hay backend conectado)
    const updateStats = () => {
        const servers = document.getElementById('stat-servers');
        const users = document.getElementById('stat-users');
        const ping = document.getElementById('stat-ping');

        if (servers) {
            let s = 0;
            const intervalS = setInterval(() => {
                s += 12;
                if (s >= 250) { s = 250; clearInterval(intervalS); }
                servers.querySelector('h3').innerText = s + '+';
            }, 30);
        }

        if (users) {
            let u = 0;
            const intervalU = setInterval(() => {
                u += 500;
                if (u >= 50000) { u = 50000; clearInterval(intervalU); }
                users.querySelector('h3').innerText = u.toLocaleString() + '+';
            }, 20);
        }

        if (ping) {
            const randomPing = Math.floor(Math.random() * 30) + 20;
            ping.innerText = randomPing + 'ms';
        }
    };

    updateStats();

    // Animación de aparición al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .game-card, .var-card, .config-item, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
