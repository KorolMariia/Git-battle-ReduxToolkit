import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../state/popularSlice';

const Languages = memo(() => {
  const dispatch = useDispatch();
  const languages = useSelector(
    ({ popularReducer }) => popularReducer.languages,
  );
  const selectedLanguage = useSelector(
    ({ popularReducer }) => popularReducer.selectedLanguage,
  );

  return (
    <>
      <ul className="languages">
        {languages.map((language) => (
          <li
            key={language}
            className={
              selectedLanguage === language.toLowerCase() ? 'active' : ''
            }
            onClick={() => dispatch(setLanguage(language.toLowerCase()))}
          >
            {language}
          </li>
        ))}
      </ul>
    </>
  );
});

export default Languages;
