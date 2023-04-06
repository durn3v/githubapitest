import { FC, useCallback, useMemo } from "react";
import { SearchRepositoriesResponse } from "../types/octokit";
import { ReactComponent as IconFork } from '../assets/images/icon-fork.svg';
import { ReactComponent as IconStar } from '../assets/images/icon-star.svg';

interface RepositoryComponentProps {
  repo: SearchRepositoriesResponse["data"]["items"][number];
}

export const RepositoryComponent: FC<RepositoryComponentProps> = ({ repo }) => {
  const formatNumber = useCallback((number: number) => {
    return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(number);
  }, []);

  const starsNumber = useMemo(() => {
    return formatNumber(repo.stargazers_count);
  }, []);

  const forksNumber = useMemo(() => {
    return formatNumber(repo.forks_count);
  }, []);

  return (
    <div className="repo">
      <div className="repo__title">
        {repo.owner && (
          <>
            <a
              target="_blank"
              href={repo.owner.html_url}
              className="repo__title-link"
            >
              {repo.owner?.login}
            </a>
            {' '}/{' '}
          </>
        )}

        <a
          target="_blank"
          href={repo.html_url}
          className="repo__title-link repo__title-link--type-name"
        >
          {repo.name}
        </a>
      </div>

      <div className="repo__stats">
        <div className="repo__stats-item">
          <IconFork />
          Forks {forksNumber}
        </div>

        <div className="repo__stats-item">
          <IconStar />
          Stars {starsNumber}
        </div>
      </div>

      <div className="repo__description">
        {repo.description}
      </div>

      {repo.topics && (
        <div className="repo__topics">
          {repo.topics.map((topic) => (
            <a
              key={topic}
              className="repo__topics-item"
              href={`https://github.com/topics/${topic}`}
              target="_blank"
            >
              {topic}
            </a>
          ))}
        </div>
      )}
    </div>
  )
};