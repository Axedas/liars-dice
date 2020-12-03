import Game from './models/Game.js'

export default class GameManager
{
    gameList;

    constructor()
    {
        this.gameList = [];
    };

    createGame(players, socket, id)
    {
        let game = new Game(players, id, socket);
        this.gameList.push(game)
    }

    createAvailableId()
    {
        //TODO generate uniqueId
    }
}