"use server";

import { expirePath } from "next/cache";
import { redirect } from "next/navigation";
import { JobService } from "@/app/lib/jobService";

/* Unused server action to update favourite status of a job - interesting but this use case needs to be more responsive */
export async function updateJobFavouriteAction(formData: FormData) {
  const userId = formData.get("userId");
  const jobId = formData.get("jobId");
  const isFavourite = formData.get("isFavourite");
  if (!userId || !jobId || !isFavourite) {
    console.log("Missing userId, jobId or isFavourite");
    return;
  }
  if (isNaN(Number(userId)) || isNaN(Number(jobId))) {
    console.log("Invalid userId or jobId");
    return;
  }

  await JobService.updateJobFavourite(
    Number(userId),
    Number(jobId),
    isFavourite === "true",
  );

  expirePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
