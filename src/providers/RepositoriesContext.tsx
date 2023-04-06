import { createContext } from "react";
import { SearchRepositoriesResponse } from "../types/octokit";

interface RepositoriesContextType {
  loading: boolean;
  finished: boolean;
  errorMessage: string | null;
  repositories: SearchRepositoriesResponse["data"]["items"] | null;
  fetchRepositories: () => void;
}

const DEFAULT_REPOSITORIES_CONTEXT: RepositoriesContextType = {
  loading: false,
  finished: false,
  errorMessage: null,
  repositories: [],
  fetchRepositories: () => undefined,
};

export const RepositoriesContext = createContext<RepositoriesContextType>(
  DEFAULT_REPOSITORIES_CONTEXT
);
