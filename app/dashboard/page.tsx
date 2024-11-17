import Pagination from "@/app/ui/jobs/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/jobs/table";
import { lusitana } from "@/app/ui/fonts";
import { JobTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { JobService } from "@/app/lib/jobService";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  /* TODO:  User id is currently hardcoded to 1, this should be changed to the user id of the logged in user */
  const paginatedJobs = await JobService.getPaginatedJobsWithFavourites(
    1,
    query,
    currentPage - 1,
  );
  const totalPages = paginatedJobs.pagination.lastPage;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Jobs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search job titles..." />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <Suspense key={query + currentPage} fallback={<JobTableSkeleton />}>
        <Table jobs={paginatedJobs.data} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
