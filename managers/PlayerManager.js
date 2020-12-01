import Player from './models/Player.js'

export default class GameManager
{
    playerList;

    constructor()
    {
        this.playerList = [];
    };

    createPlayer()
    {
        let id;
        //TODO
        // create a unique integer id for the player
        this.playerList.push(new Player(id))
    }

    getById(id)
    {
        //TODO
        // search for player by id EFFICIENTLY
        // return that player from the list
    }
}