import { useEffect, memo } from 'react';import { useSelector, useDispatch } from 'react-redux';
import { getPopularRepos } from '../../state/popularSlice';
import Loader from '../../Components/Loader';

const Repos = memo(() => {
  const dispatch = useDispatch();
  const loading = useSelector(({ popularReducer }) => popularReducer.loading);
  const error = useSelector(({ popularReducer }) => popularReducer.error);
  const repos = useSelector(({ popularReducer }) => popularReducer.repos);
  const selectedLanguage = useSelector(
    ({ popularReducer }) => popularReducer.selectedLanguage,
  );
  const searchName = useSelector(
    ({ popularReducer }) => popularReducer.searchName,
  );

  useEffect(() => {
    const params = { selectedLanguage, searchName };
    dispatch(getPopularRepos(params));
  }, [dispatch, selectedLanguage, searchName]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <ul className="popular-list">
        {repos.length ? (
          repos.map((repo, index) => (
            <li key={repo.id} className="popular-item">
              <div className="popular-rank">#{index + 1}</div>
              <ul className="space-list-items">
                <li>
                  <img
                    className="avatar"
                    src={repo.owner.avatar_url}
                    alt="Avatar"
                  />
                </li>
                <li>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count}</li>
              </ul>
            </li>
          ))
        ) : (
          <p className="error">No repos</p>
        )}
      </ul>
    </>
  );
});

export default Repos;
