import './LikeContainer.css';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

const LikeContainer = ({ photo, user, handleLike, handleDislike }) => {
  return (
    <div className='like'>
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill onClick={() => handleDislike(photo)} />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
