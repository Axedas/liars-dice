import { Server, Socket } from "socket.io";
import { Die } from "./die";

export class Game {
  /**
   * Game's unique id.
   */
  readonly id: string;

  /**
   * Socket instance that the game is listening on, for sending game events.
   */
  protected socket: Socket;

  /**
   * Players in the game. Order matters!
   */
  protected playerIds: string[];

  /**
   * The current player making a bid or call.
   */
  protected activePlayerId: string;

  /**
   * The previous bidder.
   */
  protected previousPlayerId: string;

  /**
   * The current bid in the form `{count, die face number}`, i.g. Player calls four 5's.
   */
  protected currentBid: [number, Die];

  /**
   * Instantiates the game with the host on the supplied socket.
   * @param playerId Host player ID.
   * @param socket Socket instance to send events
   */
  constructor(id: string, hostPlayerId: string, socket: Socket) {
    this.id = id;
    this.playerIds = [hostPlayerId];
  }

  /**
   * Adds a player to the game, fails if the player is already in the game.
   * @param playerId The player's id to add
   */
  addPlayer(playerId: string) {
    if (this.playerIds.includes(playerId))
      throw new Error("Player already in game!");
    this.playerIds.push(playerId);
  }

  /**
   * Removes the specified player from the game. If the player is the active player,
   * the active player is rotated and the player is removed.
   * @param playerId
   */
  removePlayer(playerId: string) {
    if (this.activePlayerId === playerId) {
      // Get next player in array, start at beginning of array if at end.
      this.getNextActivePlayer();
    }
    this.playerIds = this.playerIds.filter((id: string) => id !== playerId);
  }

  startGame() {}

  getNextActivePlayer() {
    this.activePlayerId =
      this.playerIds[
        (this.playerIds.indexOf(this.activePlayerId) + 1) %
          this.playerIds.length
      ];
  }

  makeBid() {}
}
