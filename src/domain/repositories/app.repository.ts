import { App } from "@domain/entities/app.entity";

export interface IAppRepository {
  info(): Promise<App>;
}
