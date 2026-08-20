const http = require('http');
http.createServer((req, res) => res.end('Bot funcionando')).listen(process.env.PORT || 3000);
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
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
  if (texto === 'hola' || texto === 'Hola' || texto === 'buenas' || texto === 'buen dia' || texto === 'buenas tardes' || texto === 'buenas noches' || texto === 'Hola, quiero probar la demo' || texto === 'Hola, busco la demo') {
        msg.reply('✨ ¡Hola! Bienvenida a *iSTORE PS*.\n\nEscribí:\n👉 *"iphones"* para ver nuestro catálogo de iPhones.\n👉 *"mensajeria"* para ver el catálogo de automatización para negocios.');
    }
    
    // 2. CATÁLOGO DE MENSAJERÍA (Espacios corregidos para WhatsApp)
    else if (texto.includes('mensajeria') || texto.includes('saber mas')) {
        const mensajeSaberMas = `✨ *Catálogo de Mensajería* ✨

¿Te gustaría que tu negocio responda solo? 🤖

❌ *Problema:* Perder ventas por falta de tiempo.
✅ *Solución:* Respuestas automáticas 24hs y diseño de páginas web.

💰 *Inversión:*
• Instalación: $50.000
• Mantenimiento: $15.000

💰 *Inversión con página web:*
• Instalación: $80.000
• Mantenimiento: $20.000

--------------------------
🤔 *¿Querés saber cómo funcionaría en tu caso?*
Respondé con la palabra *"INFO"* y contame brevemente el nombre de tu emprendimiento y qué vendés.`;
        
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
