import { ToggleFavouriteAPI } from "@/app/ui/jobs/buttons";
import { JobWithFavourite } from "@/app/lib/definitions";

export default async function JobsTable({
  jobs,
}: {
  jobs: JobWithFavourite[];
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 lg:pt-0">
          {/* Mobile view */}
          <div className="lg:hidden">
            {jobs?.map((job) => (
              <div key={job.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="flex justify-between">
                      <p>
                        {job.job_title}{" "}
                        <span className={"text-sm text-gray-500"}>
                          {job.company}
                        </span>
                      </p>
                      <ToggleFavouriteAPI
                        userId={1}
                        jobId={job.id}
                        isFavourite={job.isFavourite}
                      />
                    </div>
                    <p className="text-sm text-gray-500">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Job title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Company
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {jobs?.map((job) => (
                <tr
                  key={job.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 align-top">
                    {job.job_title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-top">
                    {job.company}
                  </td>
                  {/**/}
                  <td className="px-3 py-3">
                    <p className={" "}>{job.description}</p>
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3 align-top">
                    <div className="flex justify-end gap-3">
                      <ToggleFavouriteAPI
                        userId={1}
                        jobId={job.id}
                        isFavourite={job.isFavourite}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
