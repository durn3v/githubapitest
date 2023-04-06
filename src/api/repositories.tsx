import { REPOSITORIES_PER_PAGE } from "../constants/repositories";
import { octokitInstance } from "../plugins/octokit";
import { SearchRepositoriesResponse } from "../types/octokit";

export const fetchRepositoriesStarsSorted = async ({ page }: { page: number } = { page: 0 }): Promise<
  SearchRepositoriesResponse
> => {
  const result = await octokitInstance.rest.search.repos({
    sort: "stars",
    order: "desc",
    q: "stars:>=10000",
    per_page: REPOSITORIES_PER_PAGE,
    page,
  });

  return result;
};
