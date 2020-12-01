import Game from './models/Game.js'

export default class GameManager
{
    gameList;

    constructor()
    {
        this.gameList = [];
    };

    createGame(players)
    {
        let game = new Game(players);

    }
}