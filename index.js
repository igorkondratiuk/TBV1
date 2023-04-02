const { Telegraf } = require('telegraf');
const {algebra} = require('./handers.js');

require('dotenv').config()

const { Sequelize,Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    dialect: process.env.DB_DIALECT
});



class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    adress: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// (async () => {
//     await sequelize.sync();
//
//     const users = await User.findAll();
//     //console.log(users.every(user => user instanceof User)); // true
//     //console.log("All users:", JSON.stringify(users, null, 2));
//     const Jon = await User.create({
//         username: 'Jon',
//         birthday: new Date(1980, 6, 20),
//         adress: '3080 Washington Pike, Knoxville, TN, USA',
//         email: ' jonkondratiuk@gmail.com',
//         tel: '1234567890'
//
//     });
//
// })();

    sequelize.authenticate().then(()=>{
        console.log('Connection has been established successfully.');
    }).catch(err=>{
        console.error('Unable to connect to the database:', err);
    });


const bot = new Telegraf(process.env.BOT_TOKEN);

const dataBase={};

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.on('text',  (ctx) => {
//console.log(ctx);
    if (algebra(ctx)) ctx.reply(algebra(ctx));
    const s = ctx.update.message.text.split(' ');

    if (ctx.message.text.startsWith('/name')) {
        const name = s[1];
        if (!dataBase[ctx.chat.id]) dataBase[ctx.chat.id] = {};
        dataBase[ctx.chat.id].name = name;
        ctx.reply(`You name is ${name}`);
    }
    if (ctx.message.text.startsWith('/age')) {
        const age = s[1];
        if (!dataBase[ctx.chat.id]) dataBase[ctx.chat.id] = {};
        dataBase[ctx.chat.id].age = age;
        ctx.reply(`You age is ${age}`);
    }
    if (ctx.message.text.startsWith('/tel')) {
        const tel = s[1];
        if (!dataBase[ctx.chat.id]) dataBase[ctx.chat.id] = {};
        dataBase[ctx.chat.id].tel = tel;
        ctx.reply(`You telephone is ${tel}`);
    }
    if (ctx.message.text.startsWith('/all')) {
        // if (!dataBase[ctx.chat.id]) dataBase[ctx.chat.id] = {};
        // ctx.reply(`You information is:
        // name - ${dataBase[ctx.chat.id].name}
        // age - ${dataBase[ctx.chat.id].age}
        // telephone - ${dataBase[ctx.chat.id].tel}`);
        (async () => {
            await sequelize.sync();

            const users = await User.findAll();
            let all='';
            for(let i=0;i<users.length;i++){
                let age=Date.parse(users[i].birthday);
                let now=Date.now()// - users[i].birthday;
                let year= Math.floor((now-age) / 31536000000);
                //console.log(age,now,now-age,year);
                all+=` ${users[i].id}.${users[i].username}(age-${year}) - ${users[i].email} - ${users[i].adress} \n`;

            }
           // console.log(all);
           // let str=JSON.stringify(users, null, 2)
            ctx.reply(all);
        })();
    }
    if (ctx.message.text.startsWith('/table')) {
        ctx.reply(
        //     `You information is:
        // name - ${dataBase[ctx.chat.id].name}
        // age - ${dataBase[ctx.chat.id].age}
        // telephone - ${dataBase[ctx.chat.id].tel}`
            '|-----name-----|---------|\n|----age------|----------|\n|----------|-----------|\n'
        );
    }

});



bot.launch().then(()=> console.log('bot started'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));