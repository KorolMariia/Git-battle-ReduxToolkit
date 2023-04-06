import { useMemo, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleReset } from '../../state/battleSlice';
import InputPlayer from './InputPlayer';
import PreviewPlayer from './PreviewPlayer';

const Battle = () => {
  const dispatch = useDispatch();
  const initialStatePlayers = useSelector(
    ({ battleReducer }) => battleReducer.initialStatePlayers,
  );
  const playersIds = useSelector(
    ({ battleReducer }) => battleReducer.playersIds,
  );

  const renderPlayers = () =>
    playersIds.map((id) => {
      const { username, avatar } = initialStatePlayers[id];
      return (
        <Fragment key={id}>
          {avatar ? (
            <PreviewPlayer avatar={avatar} username={username}>
              <input
                type="button"
                className="reset"
                value="Reset"
                onClick={() => dispatch(handleReset(id))}
              />
            </PreviewPlayer>
          ) : (
            <InputPlayer key={id} id={id} />
          )}
        </Fragment>
      );
    });

  const showBattleButton = useMemo(() => {
    return (
      Object.values(initialStatePlayers).every(({ avatar }) => avatar) && (
        <Link
          to={{
            pathname: '/battle/results',
            search: `?playerOne=${initialStatePlayers[1].username}&playerTwo=${initialStatePlayers[2].username}`,
          }}
          className="button"
        >
          Battle
        </Link>
      )
    );
  }, [initialStatePlayers]);

  return (
    <>
      <section className="row">{renderPlayers()}</section>
      {showBattleButton}
    </>
  );
};

export default Battle;
