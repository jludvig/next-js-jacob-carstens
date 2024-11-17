import { JobService } from "@/app/lib/jobService";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = Number((await params).id);
  const requestBody = await request.json();
  const jobId = requestBody.jobId;
  const isFavourite = requestBody.isFavourite;
  await JobService.updateJobFavourite(userId, jobId, isFavourite);
  return Response.json({}, { status: 200 });
}
