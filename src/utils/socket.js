import io from 'socket.io-client';
import { BaseUrl } from './statics';

export const createSocketConnection = () => {
  return io(BaseUrl, {
    transports: ['polling'],  // force polling for testing
  });
};
