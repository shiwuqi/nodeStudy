console.log(
    'Worker started with pid:',
    process.pid,
    'and id:',
    process.env.workerId
);
process.on('message', msg => {
    console.log('Message from master:', msg);
    process.send({
        msgType: 'message',
        msg: 'Hello from worker'
    });
});