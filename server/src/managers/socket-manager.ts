import { v4 as UUID } from "uuid";
import { Server, Socket } from "socket.io";
import { Manager } from "./manager";

export class SocketManager implements Manager<Socket> {
  /**
   * Map socketId -> Socket instance
   */
  values: Record<string, Socket>;

  /**
   * Map gameId -> socketId
   */
  gameSocketMap: Record<string, string>;

  /**
   * Base server
   */
  io: Server;

  constructor(io: Server) {
    this.values = {};
    this.io = io;
  }

  create(gameId: string): Socket {}

  createId(): string {
    let id = UUID();
    while (this.values[id]) {
      id = UUID();
    }
    return id;
  }

  getSocketFor(gameId: string) {
    return this.values[gameId];
  }

  getById(socketId: string) {
    return Object.values(this.values).find((s: Socket) => s.id === socketId);
  }

  removeById(id: string) {
    const socket = this.values[id];
    delete this.values[id];
    return socket;
  }
}

export default SocketManager;
