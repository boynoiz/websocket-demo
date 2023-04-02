export class Bootstrap  {
  constructor() {
    this.env = process.env.NODE_ENV || "development";
    this.socket_port = process.env.APP_SOCKET_PORT || 6001;
    this.api_port = process.env.APP_API_PORT || 3001;
  }
}
