import { Job, PaginatedJobsResponse } from "@/app/lib/definitions";
const ITEMS_PR_PAGE = 10;
const baseUrl =
  "https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/jobs";

/* The JobRepository fetches jobs from the job microservice
 * It currently exposes a single method getJobs(jobTitle: string, page: number = 1)
 * This returns a paginated list of jobs given the provided job title
 * or all jobs if no job title is provided
 * */
export class JobRepository {
  static async getJobs(
    jobTitle: string,
    page: number = 1,
  ): Promise<PaginatedJobsResponse> {
    if (!jobTitle || jobTitle.length < 2) {
      return getAllJobs(page);
    } else {
      const pageCount = await getJobRecommendationPageCount(jobTitle);
      console.log("pageCount", pageCount, page);
      const data = await getJobRecommendations(jobTitle, page);
      return {
        pagination: {
          currentPage: page,
          firstPage: 0,
          lastPage: pageCount,
        },
        data,
      };
    }
  }
}

async function getAllJobs(page: number): Promise<PaginatedJobsResponse> {
  const response = await fetch(`${baseUrl}?page=${page}`);

  const responseBody = await response?.json();
  if (!response.ok) {
    console.error(
      "Failed to fetch job recommendations:",
      response.status,
      responseBody.error,
    );
  } else {
    return responseBody;
  }
  return {
    pagination: {
      currentPage: 0,
      firstPage: 0,
      lastPage: 0,
    },
    data: [],
  };
}

async function getJobRecommendations(
  jobTitle: string,
  page: number = 0,
): Promise<Job[]> {
  const jobRecommendationIds = await getJobRecommendationIds(jobTitle);
  const pageIds = getPageIds(jobRecommendationIds, page);
  const pagePromises = pageIds.map((id) => getJob(id));
  return Promise.all(pagePromises);
}

function getPageCount(ids: number[]) {
  return Math.ceil(ids?.length / ITEMS_PR_PAGE);
}

function getPageIds(ids: number[], page: number) {
  const totalPages = getPageCount(ids);
  if (page > totalPages) {
    return [];
  }
  return ids.slice(page * ITEMS_PR_PAGE, (page + 1) * ITEMS_PR_PAGE);
}

async function getJobRecommendationIds(jobTitle: string): Promise<number[]> {
  const response = await fetch(baseUrl + "/recommendations", {
    body: JSON.stringify({
      jobTitle: jobTitle,
    }),
    method: "POST",
  });
  const responseBody = await response?.json();
  if (!response.ok) {
    console.error(
      "Failed to fetch job recommendations:",
      response.status,
      responseBody.error,
    );
  } else {
    return responseBody?.jobIds;
  }
  return [];
}

async function getJob(id: number) {
  const response = await fetch(baseUrl + "/" + id);
  const responseBody = await response?.json();
  if (!response.ok) {
    console.error("Failed to fetch job:", response.status, responseBody.error);
  } else {
    return responseBody;
  }
}

async function getJobRecommendationPageCount(jobTitle: string) {
  const jobRecommendationIds = await getJobRecommendationIds(jobTitle);
  return getPageCount(jobRecommendationIds);
}
