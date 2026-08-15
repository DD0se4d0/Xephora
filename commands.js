const commandsList = [
    { name: '!help', desc: 'Muestra el menú de ayuda interactivo.', cat: 'user' },
    { name: '!balance', desc: 'Muestra tu balance de Caps.', cat: 'user' },
    { name: '!daily', desc: 'Reclama tu recompensa diaria.', cat: 'user' },
    { name: '!work', desc: 'Trabaja para ganar Caps.', cat: 'user' },
    { name: '!pay', desc: 'Transfiere Caps a otro usuario.', cat: 'user' },
    { name: '!shop', desc: 'Muestra la tienda del servidor.', cat: 'user' },
    { name: '!buy', desc: 'Compra un item de la tienda.', cat: 'user' },
    { name: '!inventory', desc: 'Muestra tu inventario.', cat: 'user' },
    { name: '!leaderboard', desc: 'Ranking de economía y niveles.', cat: 'user' },
    { name: '!level', desc: 'Muestra tu nivel actual.', cat: 'user' },
    { name: '!rank', desc: 'Muestra tu rango en el servidor.', cat: 'user' },
    { name: '!invites', desc: 'Muestra tus invitaciones reales y falsas.', cat: 'user' },
    { name: '!afk', desc: 'Establece tu estado AFK.', cat: 'user' },
    { name: '!roblox', desc: 'Busca un usuario de Roblox.', cat: 'user' },
    { name: '!avatar', desc: 'Muestra el avatar de un usuario de Roblox.', cat: 'user' },
    { name: '!linkroblox', desc: 'Vincula tu cuenta de Roblox.', cat: 'user' },
    { name: '!blackjack', desc: 'Juega al Blackjack apostando Caps.', cat: 'user' },
    { name: '!poker', desc: 'Juega al Poker contra la casa.', cat: 'user' },
    { name: '!coinflip', desc: 'Apuesta a cara o cruz.', cat: 'user' },
    { name: '!slots', desc: 'Gira la tragamonedas.', cat: 'user' },
    { name: '!horse', desc: 'Apuesta en la carrera de caballos.', cat: 'user' },
    { name: '!serverinfo', desc: 'Información del servidor.', cat: 'user' },
    { name: '!userinfo', desc: 'Información de un usuario.', cat: 'user' },
    
    { name: '/xephora prefix', desc: 'Cambia el prefijo del bot.', cat: 'admin' },
    { name: '/xephora language', desc: 'Cambia el idioma (ES/EN).', cat: 'admin' },
    { name: '/xephora add', desc: 'Añade un admin del bot.', cat: 'admin' },
    { name: '/economy config', desc: 'Configura la moneda del server.', cat: 'admin' },
    { name: '/economy give', desc: 'Da Caps a un usuario.', cat: 'admin' },
    { name: '/levels on', desc: 'Activa el sistema de niveles.', cat: 'admin' },
    { name: '/welcome setup', desc: 'Configura el canal de bienvenida.', cat: 'admin' },
    { name: '/automessage setup', desc: 'Configura mensajes automáticos.', cat: 'admin' },
    { name: '/autorespond add', desc: 'Añade una respuesta automática.', cat: 'admin' },
    { name: '/games off', desc: 'Desactiva los juegos.', cat: 'admin' },
    { name: '/logs setup', desc: 'Configura el canal de logs.', cat: 'admin' },
    { name: '/kick', desc: 'Expulsa a un usuario.', cat: 'admin' },
    { name: '/ban', desc: 'Banea a un usuario.', cat: 'admin' },
    { name: '/timeout', desc: 'Aísla a un usuario temporalmente.', cat: 'admin' },
    { name: '/warn', desc: 'Advierte a un usuario.', cat: 'admin' },
    { name: '/warnings', desc: 'Revisa las advertencias.', cat: 'admin' }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('commandsGrid');
    const search = document.getElementById('searchInput');
    const filters = document.querySelectorAll('.filter-btn');

    const renderCommands = (filter = 'all', searchQuery = '') => {
        grid.innerHTML = '';
        const filtered = commandsList.filter(cmd => {
            const matchesFilter = filter === 'all' || cmd.cat === filter;
            const matchesSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) || cmd.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="color: #aaa; text-align: center; grid-column: 1/-1;">No se encontraron comandos.</p>';
            return;
        }

        filtered.forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'command-card';
            card.innerHTML = `
                <span class="cmd-name">${cmd.name}</span>
                <p class="cmd-desc">${cmd.desc}</p>
                <span class="cmd-tag tag-${cmd.cat}">${cmd.cat === 'user' ? 'User' : 'Admin'}</span>
            `;
            grid.appendChild(card);
        });
    };

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCommands(btn.dataset.filter, search.value);
        });
    });

    search.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderCommands(activeFilter, search.value);
    });

    renderCommands();
});
