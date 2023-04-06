import { FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { fetchRepositoriesStarsSorted } from "../api/repositories";
import { SearchRepositoriesResponse } from "../types/octokit";
import { RepositoriesContext } from "./RepositoriesContext";
import { REPOSITORIES_PER_PAGE } from "../constants/repositories";

export const RepositoriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<
    SearchRepositoriesResponse["data"]["items"] | null
  >(null);

  const fetchRepositories = useCallback(async () => {
    if (loading || finished) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const requestPage = currentPage + 1;
      const result = await fetchRepositoriesStarsSorted({ page: requestPage });
    
      setRepositories((oldRepositories) => {
        if (oldRepositories === null) {
          return result.data.items;
        }

        return [
          ...oldRepositories,
          ...result.data.items,
        ];
      });

      setCurrentPage(oldPage => oldPage + 1);

      if (result.data.items.length < REPOSITORIES_PER_PAGE) {
        setFinished(true);
      }

    } catch (error: any) {
      if (error.response && error.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
        setErrorMessage('Вы достигли лимита по заросам, попробуйте чуть позже');
      } else {
        setErrorMessage(error.response?.message);
      }

    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, finished]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <RepositoriesContext.Provider
      value={{
        loading,
        finished,
        errorMessage,
        repositories,
        fetchRepositories,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = () => useContext(RepositoriesContext);
