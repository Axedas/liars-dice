export class Game
{
    players;
    currentBid;
    activePlayer;
    id;

    constructor(players, id)
    {
        this.players=players;
        this.id = id;
    }
}