'use strict';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    console.log('Master process is running with pid:', process.pid);
    const clusterMap = {};
    let count = 0;
    for (let i = 0; i < numCPUs; ++i) {
        const customId = i + 100;
        console.log(customId);
        const worker = cluster.fork({ workerId: customId });
        clusterMap[worker.id] = customId;
        worker.send({ msg: 'Hello from Master' });
        worker.on('message', msg => {
            console.log('Message from worker:', clusterMap[worker.id], msg);
            if (clusterMap[worker.id] === 101 && !count++) {
                const taskArg = { params: { name: '十七' }, task: 'message' };
                worker.send(taskArg);
            } else {
                switch (msg.msgType) {
                    case 'message':
                        console.log('Message are received');
                        break;
                    default:
                        break;
                }
            }
        });
    }
} else {
    require('./worker.js');
}