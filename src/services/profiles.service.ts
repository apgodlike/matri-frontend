import { apiRequest } from "@/lib/axios";
import { ProfileWithPicture } from "@/types/profile";

interface ProfilesResponse {
  profiles: ProfileWithPicture[];
  totalPages: number;
}

export const profilesService = {
  async getAllProfiles(page: number): Promise<ProfilesResponse> {
    const response = await apiRequest.get<ProfilesResponse>(
      `/api/profile/all-profiles`,
      {
        params: { page },
      }
    );
    return response.data;
  },
};
