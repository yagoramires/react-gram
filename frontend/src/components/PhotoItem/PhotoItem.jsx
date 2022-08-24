import './PhotoItem.css';

import { uploads } from '../../utils/config';
import { Link } from 'react-router-dom';

const PhotoItem = ({ photo }) => {
  return (
    <div className='photo-item-image'>
      {photo.image && (
        <div
          style={{
            backgroundImage: `url('${uploads}/photos/${photo.image}')`,
          }}
          className='photo-item-image'
        ></div>
      )}
      <h2 className='photo-item-title'>{photo.title}</h2>
      <p className='photo-author'>
        <Link to={`/users/${photo.userId}`}> {photo.userName}</Link>
      </p>
    </div>
  );
};

export default PhotoItem;
