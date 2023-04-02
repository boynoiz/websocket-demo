import path from 'path';

const publicPath = path.join(process.cwd(), 'public')

// Mockup simple html file for socket.io-client
export function index(request, response) {

  response.sendFile(`${publicPath}/index.html`);

}
