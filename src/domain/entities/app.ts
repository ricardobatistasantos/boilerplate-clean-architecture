type AppInfo = {
  name: string;
  version: string;
};

export class App {
  constructor(readonly param: AppInfo) {}
}
