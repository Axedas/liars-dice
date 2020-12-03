import Player from './models/Player.js'

export default class GameManager
{
    playerList;

    constructor()
    {
        this.playerList = [];
    };

    /**
     * Creates a player with a unique id
     * @returns {Player object representing the new player}
     */
    createPlayer()
    {
        let id;
        //TODO
        // create a unique integer id for the player

        let player = new Player(id)
        this.playerList.push(player);

        return player;
    }

    getById(id)
    {
        //TODO
        // search for player by id EFFICIENTLY
        // return that player from the list
    }
}