import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error("Jwt secret not defined.");

const wss = new WebSocketServer({ port: 8080 }, () =>
  console.log("Websocket server running on port : 8080")
);

interface Message {
  type: "join" | "leave" | "message";
  roomId?: string;
  token?: string;
  content?: string;
}

const rooms = new Map<string, Set<WebSocket>>();

const users = new Map<WebSocket, { userId: string; roomId: string }>();

function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
  } catch {
    return null;
  }
}

function broadcast(roomId: string, message: object, ws?: WebSocket) {
  const room = rooms.get(roomId);
  if (!room) return;

  const data = JSON.stringify(message);
  room.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on("connection", function connection(ws) {
  console.log("Client connected.");
  // join room function
  function JoinRoom(message: Message) {
    const { roomId, token } = message;

    if (!roomId || !token) {
      ws.send(
        JSON.stringify({ type: "error", message: "roomId and token required" })
      );
      return;
    }

    // verify jwt
    const payload = verifyToken(token);
    if (!payload) {
      ws.send(JSON.stringify({ type: "error", message: "Invalid token" }));
      return;
    }

    const userId = payload.userId;

    // create room if not exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    // add user to that room
    rooms.get(roomId)?.add(ws);
    // store the clients userId and roomId
    users.set(ws, { userId, roomId });

    // notify client
    ws.send(JSON.stringify({ type: "joined", roomId, userId }));

    // notify others in room
    broadcast(roomId, { type: "user-joined", userId }, ws);
  }

  // message in room function
  function MessageRoom(message: Message) {
    const userInfo = users.get(ws);
    if (!userInfo) {
      ws.send(JSON.stringify({ type: "error", message: "Not in a room" }));
      return;
    }

    // broadcast message to room
    broadcast(userInfo.roomId, {
      type: "message",
      userId: userInfo.userId,
      content: message.content,
    });
  }

  function LeaveRoom() {
    const userInfo = users.get(ws);
    if (userInfo) {
      rooms.get(userInfo.roomId)?.delete(ws);
      broadcast(userInfo.roomId, {
        type: "user-left",
        userId: userInfo.userId,
      });
      users.delete(ws);
      console.log("users :", users);
    }
  }

  ws.on("message", (rawData) => {
    try {
      const message: Message = JSON.parse(rawData.toString());

      switch (message.type) {
        case "join": {
          JoinRoom(message);
          break;
        }
        case "message": {
          MessageRoom(message);
          break;
        }
        case "leave": {
          LeaveRoom();
          break;
        }
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", message: "Invalid message" }));
    }
  });

  ws.on("close", () => {
    // cleanup on disconnection
    const userInfo = users.get(ws);
    if (userInfo) {
      rooms.get(userInfo.roomId)?.delete(ws);
      broadcast(userInfo.roomId, {
        type: "user-left",
        userId: userInfo.userId,
      });
      users.delete(ws);
    }
    console.log("Client disconnected.");
  });
});
