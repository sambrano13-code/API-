const http = require('http');
http.createServer((req, res) => res.end('Bot funcionando')).listen(process.env.PORT || 3000);
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    console.log('copia el texto largo que aparece abajo:');
    console.log(qr);
    console.log ('pegar en un generador de qr');
});

client.on('ready', () => {
    console.log('¡Bot de iStorePS listo para usar! 🤖✨');
});

client.on('message', msg => {
    const texto = msg.body.toLowerCase();

    // 1. BIENVENIDA
  if (texto === 'hola' || texto === 'Hola' || texto === 'Hola, requiero asesoramiento tecnico' || texto === 'buenas' || texto === 'buen dia' || texto === 'buenas tardes' || texto === 'buenas noches' || texto === 'Hola, quiero probar la demo' || texto === 'Hola, busco la demo') {
        msg.reply('✨ ¡Hola! Bienvenida a *iSTORE PS*.\n\nEscribí:\n👉 *"iphones"* para ver nuestro catálogo de iPhones.\n👉 *"mensajeria"* para ver el catálogo de automatización para negocios.');
    }
    
// 2. CATÁLOGO DE SERVICIOS Y TARIFAS (En USD)
    else if (texto.includes('mensajeria') || texto.includes('saber mas') || texto.includes('precios') || texto.includes('tarifas')) {
        const mensajeSaberMas = `💻 *DESARROLLO.DEV — Catálogo de Servicios & Tarifas* 💻

Optimizamos la atención de tu negocio y aumentamos tus ventas con software a medida.

----------------------------------
🌐 *1. PÁGINAS WEB & TIENDAS ONLINE*
• *Landing Page Estándar:* $120 – $220 USD
  └ _Mantenimiento: $15 – $25 USD/mes_
• *Web Institucional Completa:* $250 – $400 USD
  └ _Mantenimiento: $25 – $40 USD/mes_
• *E-Commerce / Catálogo Digital:* $450 – $800 USD
  └ _Mantenimiento: $40 – $70 USD/mes_

🤖 *2. BOTS DE WHATSAPP & AUTOMATIZACIÓN*
• *Bot Básico 24/7:* $100 – $180 USD
  └ _Mantenimiento: $20 – $30 USD/mes_
• *Bot Avanzado (Flujos + APIs):* $200 – $350 USD
  └ _Mantenimiento: $30 – $50 USD/mes_

🚀 *3. PACKS PROMO (WEB + BOT)*
• *Pack Despegue (Landing + Bot Básico):* $250 – $350 USD
  └ _Mantenimiento: $45 USD/mes_
• *Pack Pro (Web Completa + Bot Avanzado):* $500 – $700 USD
  └ _Mantenimiento: $60 USD/mes_

----------------------------------
🤔 *¿Querés saber cuál es el ideal para tu negocio?*
Respondé con la palabra *"INFO"* contándome el nombre de tu emprendimiento y qué vendés para asesorarte sin compromiso.`;
        
        msg.reply(mensajeSaberMas);
    }
    // 3. CAPTURA DE EMPRENDIMIENTO
    else if (texto.startsWith('info')) {
        msg.reply('🚀 ¡Excelente! Ya registré tu interés.\n\nEn breve, Romi se va a contactar con vos de forma personal para mostrarte una propuesta adaptada a tu negocio. 💅✨');
        console.log(`📩 ¡NUEVA CONSULTA DE NEGOCIO!: ${msg.body}`);
    }

    // 4. CATÁLOGO DE IPHONES
    else if (texto.includes('iphone') || texto.includes('catalogo')) {
        const catalogoiphone = `✨ *NUESTROS IPHONES* ✨

Los equipos se muestran en punto de encuentro a coordinar, dependiendo de la zona.

¿Te gustaría reservar una cita para ver el equipo? 
_(Respondé *"SI"* para pasarte el link de nuestra web y elegir tu modelo y turno)_`;

        msg.reply(catalogoiphone);
    }

    // 5. ENCARGAR / CITA (Mejorado con .includes para mayor flexibilidad)
    else if (texto.includes('si') || texto.includes('encargar') || texto.includes('cita') || texto.includes('punto de encuentro')) {
        msg.reply('📅 ¡Genial! Para elegir tu iPhone indicado o coordinar el punto de encuentro, entrá a nuestra web oficial:\n\n🔗 https://istoreps.empretienda.com.ar');
    }
});

client.initialize();
