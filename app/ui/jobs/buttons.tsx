"use client";
import { StarIcon } from "@heroicons/react/24/outline";
import { updateJobFavouriteAction } from "@/app/lib/jobActions";
import { useState } from "react";

/* Unused - Server side actions are too slow for this use case*/
export function ToggleFavouriteAction({
  userId,
  jobId,
  isFavourite,
}: {
  userId: number;
  jobId: number;
  isFavourite: boolean;
}) {
  return (
    <form action={updateJobFavouriteAction}>
      <input
        type="hidden"
        name="isFavourite"
        value={isFavourite ? "false" : "true"}
      />
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="jobId" value={jobId} />
      <button className="rounded-md border p-2 hover:bg-gray-100">
        {isFavourite ? (
          <StarIcon className="w-5 fill-current" />
        ) : (
          <StarIcon className="w-5" />
        )}
      </button>
    </form>
  );
}

export function ToggleFavouriteAPI({
  userId,
  jobId,
  isFavourite,
}: {
  userId: number;
  jobId: number;
  isFavourite: boolean;
}) {
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

  function updateFavourite() {
    const newState = !isFavouriteState;
    setIsFavouriteState(newState);
    fetch(`http://localhost:3000/api/user/${userId}/jobFavourites`, {
      body: JSON.stringify({
        jobId: jobId,
        isFavourite: newState,
      }),
      method: "POST",
    });
  }
  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={updateFavourite}
    >
      {isFavouriteState ? (
        <StarIcon className="w-5 fill-current" />
      ) : (
        <StarIcon className="w-5" />
      )}
    </button>
  );
}
