function base(ctx){
    s=ctx.update.message.text.split(' ');
    const dataBase={};

    if( ctx.message.text.startsWith('/name')) {
        s = ctx.update.message.text.split(' ');
        name=s[1];
        if(!dataBase[ctx.chat.id]) dataBase[ctx.chat.id]={};
        dataBase[ctx.chat.id].name=name;
        ctx.reply(`You name is ${name}`);
    }
    if( ctx.message.text.startsWith('/age')) {
        s = ctx.update.message.text.split(' ');
        age=s[1];
        if(!dataBase[ctx.chat.id]) dataBase[ctx.chat.id]={};
        dataBase[ctx.chat.id].age=age;
        ctx.reply(`You age is ${age}`);
    }
    if( ctx.message.text.startsWith('/tel')) {
        s = ctx.update.message.text.split(' ');
        tel=s[1];
        if(!dataBase[ctx.chat.id]) dataBase[ctx.chat.id]={};
        dataBase[ctx.chat.id].tel=tel;
        ctx.reply(`You tel is ${tel}`);
    }
    if (ctx.message.text.startsWith('/all')) {
        s = ctx.update.message.text.split(' ');
        if (!dataBase[ctx.chat.id]) dataBase[ctx.chat.id] = {};
        ctx.reply(`You information is:
        name - ${dataBase[ctx.chat.id].name}
        age - ${dataBase[ctx.chat.id].age}
        telephone - ${dataBase[ctx.chat.id].tel}
        `);
    }
}
module.exports = {base};