import { v4 as UUID } from "uuid";
import { Player } from "../models/player";
import { Manager } from "./manager";

export class PlayerManager implements Manager<Player> {
  readonly values: Record<string, Player>;

  constructor() {
    this.values = {};
  }

  /**
   * Creates a player with a unique id
   * @returns {Player} the newly created Player object.
   */
  create() {
    // Assign a new UUID. If the Player UUID already exists, retry until a unique is found.
    const playerId = this.createId();
    this.values[playerId] = new Player(playerId);
    return this.values[playerId];
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
    const player = this.values[id];
    delete this.values[id];
    return player;
  }
}

export const PLAYER_MANAGER = new PlayerManager();
