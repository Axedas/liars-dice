import { Socket } from "socket.io";
import { v4 as UUID } from "uuid";
import { Game } from "../models";
import { Manager } from "./manager";

export class GameManager implements Manager<Game> {
  readonly values: Record<string, Game>;

  constructor() {
    this.values = {};
  }

  create(hostPlayerId: string, socket: Socket) {
    // Assign a new UUID. If the Game UUID already exists, retry until a unique is found.
    const gameId = this.createId();
    const game = new Game(gameId, hostPlayerId, socket);
    this.values[game.id] = game;
    return game;
  }

  createId() {
    let id = UUID();
    while (this.values[id]) {
      id = UUID();
    }
    return id;
  }

  getById(id: string) {
    return this.values[id];
  }

  removeById(id: string) {
    const game = this.values[id];
    delete this.values[id];
    return game;
  }
}
