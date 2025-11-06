import { App } from "@domain/entities/app";

export interface IAppRepository {
  info(): Promise<App>;
}
