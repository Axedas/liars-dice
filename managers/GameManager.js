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
        let id;
        //TODO
        // create a unique id for the game
        let game = new Game(players, id);
        this.gameList.push(game)
    }
}