const XEPHORA_INVITE_URL = "https://discord.com/oauth2/authorize?client_id=1535354904770519050&permissions=8&scope=bot%20applications.commands";
const XEPHORA_DEFAULT_PREFIX = "!";

const XEPHORA_CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting Started",
    desc: "Cómo agregar Xephora a tu servidor y configurarlo por primera vez.",
    commands: [
      { name: "Invitar a Xephora", type: "link", access: "user", desc: "Agrega Xephora a tu servidor de Discord con los permisos necesarios." },
      { name: "/xephora setup language", type: "slash", access: "admin", desc: "Configura el idioma inicial del bot en el servidor (inglés o español)." },
      { name: "!prefix set [nuevo prefix]", type: "prefix", access: "admin", desc: "Cambia el prefix de comandos del servidor. Máximo 5 caracteres, sin espacios. Por defecto es \"!\"." }
    ]
  },
  {
    id: "general",
    label: "General",
    desc: "Comandos generales disponibles para cualquier miembro del servidor.",
    commands: [
      { name: "!help", type: "prefix", access: "user", desc: "Muestra la lista de comandos disponibles y cómo usarlos." },
      { name: "!profile", type: "prefix", access: "user", desc: "Muestra tu perfil dentro del servidor." },
      { name: "/xephora ping", type: "slash", access: "user", desc: "Muestra la latencia actual del bot." }
    ]
  },
  {
    id: "administration",
    label: "Administration",
    desc: "Configuración general del bot. Todos estos comandos requieren permisos de administrador.",
    commands: [
      { name: "/xephora", type: "slash", access: "admin", desc: "Comando principal de configuración de Xephora en el servidor." },
      { name: "/xephora add", type: "slash", access: "admin", desc: "Agrega un elemento o configuración al servidor." },
      { name: "/xephora remove", type: "slash", access: "admin", desc: "Elimina un elemento o configuración del servidor." },
      { name: "/xephora configrol", type: "slash", access: "admin", desc: "Configura los roles asociados al funcionamiento de Xephora." },
      { name: "/xephora language", type: "slash", access: "admin", desc: "Cambia el idioma del bot para el servidor." },
      { name: "/xephora prefix", type: "slash", access: "admin", desc: "Cambia el prefix de comandos del servidor." }
    ]
  },
  {
    id: "moderation",
    label: "Moderation",
    desc: "Herramientas de moderación para mantener el orden del servidor.",
    commands: [
      { name: "/kick", type: "slash", access: "admin", desc: "Expulsa a un miembro del servidor." },
      { name: "/ban", type: "slash", access: "admin", desc: "Banea a un miembro del servidor." },
      { name: "/timeout", type: "slash", access: "admin", desc: "Aplica un silencio temporal a un miembro." },
      { name: "/warn", type: "slash", access: "admin", desc: "Aplica una advertencia a un miembro." },
      { name: "/warnings", type: "slash", access: "admin", desc: "Muestra el historial de advertencias de un miembro." },
      { name: "/bypass", type: "slash", access: "admin", desc: "Configura excepciones a las restricciones de moderación." }
    ]
  },
  {
    id: "economy",
    label: "Economy",
    desc: "Sistema de economía Cap-Caps. El nombre, plural y emoji de la moneda son configurables por servidor.",
    commands: [
      { name: "/economy", type: "slash", access: "admin", desc: "Configura la economía del servidor: nombre singular, plural y emoji de la moneda." },
      { name: "!caps", type: "prefix", access: "user", desc: "Muestra tu cantidad de Caps." },
      { name: "!balance", type: "prefix", access: "user", desc: "Muestra tu saldo total (wallet y banco)." },
      { name: "!bank balance", type: "prefix", access: "user", desc: "Muestra tu saldo guardado en el banco." },
      { name: "!bank deposit [cantidad]", type: "prefix", access: "user", desc: "Deposita Caps de tu wallet a tu banco." },
      { name: "!bank withdraw [cantidad]", type: "prefix", access: "user", desc: "Retira Caps de tu banco a tu wallet." },
      { name: "!pay [usuario] [cantidad]", type: "prefix", access: "user", desc: "Transfiere Caps a otro miembro del servidor." },
      { name: "!daily", type: "prefix", access: "user", desc: "Reclama tu recompensa diaria de Caps." },
      { name: "!work", type: "prefix", access: "user", desc: "Trabaja para ganar Caps." },
      { name: "!shop", type: "prefix", access: "user", desc: "Muestra la tienda del servidor." }
    ]
  },
  {
    id: "levels",
    label: "Levels",
    desc: "Sistema de experiencia y niveles, independiente por servidor.",
    commands: [
      { name: "/levels", type: "slash", access: "admin", desc: "Configura el sistema de niveles del servidor." },
      { name: "!level", type: "prefix", access: "user", desc: "Muestra tu nivel actual y tu progreso de XP." },
      { name: "!rank", type: "prefix", access: "user", desc: "Muestra tu posición en la tabla de niveles del servidor." }
    ]
  },
  {
    id: "games",
    label: "Games",
    desc: "Minijuegos que usan la economía del servidor.",
    commands: [
      { name: "/games", type: "slash", access: "admin", desc: "Configura qué juegos están habilitados en el servidor." },
      { name: "!bj [apuesta]", type: "prefix", access: "user", desc: "Juega una partida de Blackjack. Apuesta mínima: 10 Caps." },
      { name: "!blackjack [apuesta]", type: "prefix", access: "user", desc: "Alias de !bj." }
    ]
  },
  {
    id: "welcome",
    label: "Welcome",
    desc: "Mensajes de bienvenida personalizables por servidor.",
    commands: [
      { name: "/welcome", type: "slash", access: "admin", desc: "Configura mensajes de bienvenida, canal, embeds y variables." }
    ]
  },
  {
    id: "automessage",
    label: "AutoMessage",
    desc: "Mensajes automáticos programados por intervalos.",
    commands: [
      { name: "/automessage", type: "slash", access: "admin", desc: "Configura mensajes automáticos, intervalos, múltiples mensajes y embeds." }
    ]
  },
  {
    id: "autorespond",
    label: "AutoRespond",
    desc: "Respuestas automáticas basadas en triggers de texto.",
    commands: [
      { name: "/autorespond", type: "slash", access: "admin", desc: "Configura triggers y respuestas automáticas, con coincidencia exacta o parcial." }
    ]
  },
  {
    id: "afk",
    label: "AFK",
    desc: "Sistema de ausencia global.",
    commands: [
      { name: "!afk [motivo]", type: "prefix", access: "user", desc: "Marca tu estado como AFK con un motivo opcional." }
    ]
  },
  {
    id: "invites",
    label: "Invites",
    desc: "Seguimiento de invitaciones del servidor.",
    commands: [
      { name: "!invites", type: "prefix", access: "user", desc: "Muestra tus invitaciones reales, falsas, salidas y bonus." }
    ]
  },
  {
    id: "roblox",
    label: "Roblox",
    desc: "Sistema de vinculación de cuenta de Roblox, disponible mediante comandos con prefix.",
    commands: [
      { name: "!roblox", type: "prefix", access: "user", desc: "Muestra o vincula tu cuenta de Roblox." }
    ]
  },
  {
    id: "logs",
    label: "Logs",
    desc: "Registro configurable de eventos del servidor.",
    commands: [
      { name: "/logs", type: "slash", access: "admin", desc: "Configura los canales y tipos de eventos a registrar: miembros, mensajes, canales, roles, voz, moderación, economía, niveles, invitaciones y configuración." }
    ]
  },
  {
    id: "owner",
    label: "Owner",
    desc: "Comandos exclusivos para el propietario del bot, con prefix fijo \".\".",
    commands: [
      { name: ".restart", type: "owner", access: "owner", desc: "Reinicia el bot." },
      { name: ".stop", type: "owner", access: "owner", desc: "Detiene el bot." },
      { name: ".status", type: "owner", access: "owner", desc: "Muestra el estado actual del bot." },
      { name: ".developer", type: "owner", access: "owner", desc: "Información y utilidades exclusivas de desarrollo." }
    ]
  }
];

const LOG_TYPES = ["Members","Messages","Channels","Roles","Voice","Moderation","Economy","Levels","Invites","Configuration"];
