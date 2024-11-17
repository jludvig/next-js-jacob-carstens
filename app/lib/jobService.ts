import {
  getUserFavouriteJobIds,
  updateJobFavouriteDb,
} from "@/app/lib/jobFavouriteRepository";
import { PaginatedJobsWithFavouritesResponse } from "@/app/lib/definitions";
import { JobRepository } from "@/app/lib/jobRepository";

export class JobService {
  static async updateJobFavourite(
    userId: number,
    jobId: number,
    isFavourite: boolean,
  ) {
    updateJobFavouriteDb(userId, jobId, isFavourite);
  }

  static async getPaginatedJobsWithFavourites(
    userId: number,
    jobTitle: string,
    page: number = 1,
  ): Promise<PaginatedJobsWithFavouritesResponse> {
    const paginatedJobsResponse = await JobRepository.getJobs(jobTitle, page);
    const jobFavouriteIds = await getUserFavouriteJobIds(userId);
    const jobDataWithFavourites = paginatedJobsResponse.data.map((job) => {
      const isFavourite = jobFavouriteIds.includes(job.id);
      return { ...job, isFavourite: isFavourite };
    });

    return {
      ...paginatedJobsResponse,
      data: jobDataWithFavourites,
    };
  }
}
