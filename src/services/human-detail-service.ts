import { HumanInfo } from "../data/humans-data";
import { Supercentenarian } from "../data/map-info";
import { ApiClient } from "./api-client/api-client";
import { BaseService } from "./api-client/base-service";

export class HumanDetailService extends BaseService {
    public constructor(apiClient: ApiClient) {
        super(apiClient);
    }

    public async getHumanBySlug(slug: string): Promise<Supercentenarian> {
        const data = await this.apiClient.get<HumanInfo>(`/v1/humans/slug/${slug}`);
        return data.content;
    }


}
export const humanDetailService = new HumanDetailService(new ApiClient());
