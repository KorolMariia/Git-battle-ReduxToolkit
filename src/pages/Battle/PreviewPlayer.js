import { memo } from 'react';
const PreviewPlayer = memo(({ children, avatar, username }) => {
  return (
    <div className="column border">
      <img className="avatar" src={avatar} alt="Avatar" />
      <h2 className="username">{username}</h2>
      {children}
    </div>
  );
});

export default PreviewPlayer;
