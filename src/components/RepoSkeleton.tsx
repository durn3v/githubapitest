import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const RepoSkeleton: FC = () => {
  return (
    <div className="repo repo--skeleton">
      <div className="repo__skeleton-row">
        <Skeleton width="40%" />
      </div>

      <div className="repo__skeleton-row">
        <Skeleton width="20%" />
      </div>

      <div className="repo__skeleton-row">
        <Skeleton count={3} />
      </div>
    </div>
  )
};