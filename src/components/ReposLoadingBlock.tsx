import { FC } from "react";
import { RepoSkeleton } from "./RepoSkeleton";

export const ReposLoadingBlock: FC = () => {
  return (
    <div className="repos-loading">
      <RepoSkeleton />
      <RepoSkeleton />
      <RepoSkeleton />
    </div>
  )
};