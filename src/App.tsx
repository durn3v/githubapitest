import { useRepositories } from "./providers/RepositoriesProvider";
import { RepositoryComponent } from "./components/Repository";

import 'react-loading-skeleton/dist/skeleton.css'
import "./styles.scss";
import { ReposLoadingBlock } from "./components/ReposLoadingBlock";
import { LoadMoreSection } from "./components/LoadMoreSection";

export default function App() {
  const {
    loading,
    repositories,
  } = useRepositories();

  return (
    <div className="app">
      <div className="wrapper">
        <div className="app__title">
          Репозитории
        </div>

        <div className="app__repos">
          {repositories && repositories.map((repo) => (
            <RepositoryComponent
              key={repo.id}
              repo={repo}
            />
          ))}

          {loading && (
            <ReposLoadingBlock />
          )}

          <LoadMoreSection />
        </div>
      </div>
    </div>
  );
}
