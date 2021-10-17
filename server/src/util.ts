import { Socket } from "socket.io";

export const wrap =
  (middleware: (...args: unknown[]) => void) => (socket: Socket, next: any) =>
    middleware(socket.request, {}, next);
