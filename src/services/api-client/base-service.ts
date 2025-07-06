import { ApiClient } from "./api-client";

export abstract class BaseService {
  public constructor(protected apiClient: ApiClient) {}

  protected url(path = ""): string {
    const extendedPath = path.startsWith("/") ? path.substring(1) : path;
    return `${this.apiClient.baseUrl}${extendedPath}`;
  }
}
