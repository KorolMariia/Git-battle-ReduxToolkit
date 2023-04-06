import { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { setSearchName } from '../../state/popularSlice';
import { BiSearchAlt } from 'react-icons/bi';

const SearchRepos = memo(() => {
  const dispatch = useDispatch();
  const searchName = useSelector(
    ({ popularReducer }) => popularReducer.searchName,
  );
  const [searchValue, setSearchValue] = useState(searchName);
  const [errorSearchValue, setErrorSearchValue] = useState(null);

  const delayedSearch = useCallback(
    debounce((searchValue) => {
      dispatch(setSearchName(searchValue));
    }, 600),
    [dispatch],
  );

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (!value) {
      setErrorSearchValue('This field is required');
      delayedSearch(value);
    } else if (!/^[a-zA-Z]+$/gi.test(value)) {
      setErrorSearchValue('This field must contain only English letters');
    } else {
      delayedSearch(value);
      setErrorSearchValue(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setErrorSearchValue(null);
      setSearchValue('');
    }
    if (event.key === 'Enter') {
      onChangeHandler(event);
      setSearchValue('');
    }
  };

  return (
    <>
      <div className="search-wrap">
        <input
          type="text"
          onChange={onChangeHandler}
          value={searchValue}
          className="searchTerm"
          placeholder="Enter name ..."
          onKeyDown={handleKeyDown}
          aria-describedby="search-error"
        />
        {errorSearchValue && <span id="search-error">{errorSearchValue}</span>}
        <button className="searchButton">
          <BiSearchAlt />
        </button>
      </div>
    </>
  );
});

export default SearchRepos;
