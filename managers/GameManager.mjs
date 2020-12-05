import Game from '.././models/Game.js'

export default class GameManager
{
    gameList;
    numGames=0;

    constructor()
    {
        this.gameList = [];
    };

    createGame(players, socket)
    {
        let id = this.numGames
        this.numGames++;

        let game = new Game(players, id, socket);
        this.gameList.push(game);
        return game;
    }

    createAvailableId()
    {
        //TODO generate uniqueId
    }

    getGameById(id) {
        return this.gameList.find(game => game.gameId === id);
    }
}