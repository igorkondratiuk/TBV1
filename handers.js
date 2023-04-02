function algebra(ctx){
    s=ctx.update.message.text.split(' ');
    ansver='';
    if( ctx.message.text.startsWith('sum'))
        ansver=`You sum is ${Number(s[1]) + Number(s[2])}`;

    if( ctx.message.text.startsWith('sub'))
        ansver=`You sub is ${Number(s[1]) - Number(s[2])}`;

    if( ctx.message.text.startsWith('div'))
        ansver=`You div is ${Number(s[1]) / Number(s[2])}`;

    if( ctx.message.text.startsWith('mul'))
        ansver=`You mul is ${Number(s[1]) * Number(s[2])}`;

    if( ctx.message.text.startsWith('even')){
        if(Number(s[1])%2===0)ansver='Even';
        else ansver='Not Even';
    }
    return ansver;
}



module.exports = {algebra};