// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Job = {
  id: number;
  job_title: string;
  description: string;
  company: string;
};

export type JobWithFavourite = Job & {
  isFavourite: boolean;
}

export type PaginatedJobsResponse = {
  pagination: {
    currentPage: number;
    firstPage: number;
    lastPage: number;
  };
  data: Job[];
};

export type PaginatedJobsWithFavouritesResponse = {
  pagination: {
    currentPage: number;
    firstPage: number;
    lastPage: number;
  };
  data: JobWithFavourite[];
};

