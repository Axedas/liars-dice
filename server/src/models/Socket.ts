export class Socket {
  conn;
  gameId;

  constructor(conn, gameId) {
    this.conn = conn;
    this.gameId = gameId;
  }
}
