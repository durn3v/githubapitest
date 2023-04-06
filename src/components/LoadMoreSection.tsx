import { FC } from "react";
import { useRepositories } from "../providers/RepositoriesProvider";

export const LoadMoreSection: FC = () => {
  const {
    loading,
    finished,
    errorMessage,
    fetchRepositories,
  } = useRepositories();

  const showLoadMore = !loading && !finished;

  return (
    <div className="load-more">
      <div className="load-more__wrapper">
        {errorMessage && (
          <div className="load-more__error">
            {errorMessage}
          </div>
        )}

        {showLoadMore && (
          <button
            className="load-more__button"
            type="button"
            onClick={fetchRepositories}
          >
            Загрузить ещё
          </button>
        )}
      </div>
    </div>
  )
};