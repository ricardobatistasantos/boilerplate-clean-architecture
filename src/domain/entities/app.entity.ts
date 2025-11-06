export class App {

  name: string;
  version: string;

  constructor(param: App) {
    this.name = param.name;
    this.version = param.version;
  }
}
