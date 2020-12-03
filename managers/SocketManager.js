import Socket from './models/Socket.js'

export default class SocketManager
{
    io;
    socketList;

    constructor(io)
    {
        this.io = io;
        this.socketList = [];
    };

    createSocketForGame(id)
    {

    }

    getSocketById(id)
    {
        //TODO implement efficient searching for socket by id
    }
}