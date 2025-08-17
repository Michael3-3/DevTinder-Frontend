import io from "socket.io-client";
import { BaseUrl } from "./statics";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BaseUrl);
  }
  else{
    return io("/",{path:"/api/socket.io"});
  }
};
