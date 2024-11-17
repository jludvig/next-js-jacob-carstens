import {getDBConnection} from "@/app/lib/connection";

export async function updateJobFavouriteDb(userId: number, jobId: number, isFavourite: boolean) {
    try {
        const connection = await getDBConnection();
        const userFavouriteJob = await connection.get("SELECT * FROM USER_FAVOURITE_JOB WHERE USER_ID = ? AND JOB_ID = ?", userId, jobId);
        if (userFavouriteJob && !isFavourite) {
            await connection.run("DELETE FROM USER_FAVOURITE_JOB WHERE USER_ID = ? AND JOB_ID = ?", userId, jobId);
        } else if (!userFavouriteJob && isFavourite) {
            await connection.run("INSERT INTO USER_FAVOURITE_JOB VALUES (?,?)",  userId, jobId);
        }
    } catch (error) {
        throw new Error('Failed to update job favourite.' + error);
    }
}

export async function getUserFavouriteJobIds(userId: number) : Promise<number[]> {
    try {
        const connection = await getDBConnection();
        const userFavouriteJob: {job_id: number}[] | undefined = await connection.all("SELECT job_id FROM USER_FAVOURITE_JOB WHERE USER_ID = ?", userId);
        if (userFavouriteJob) {
            return userFavouriteJob.map(job => job.job_id);
        } else {
            return [];
        }
    } catch (error) {
        throw new Error('Failed to update job favourite.' + error);
    }
}