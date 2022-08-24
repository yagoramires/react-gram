import './Photo.css';

import { uploads } from '../../utils/config';

import Message from '../../components/Message/Message';
import { Link, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

import { getPhoto, like, comment } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import LikeContainer from '../../components/LikeContainer/LikeContainer';

const Photo = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const [commentText, setCommentText] = useState('');

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText('');
    resetMessage();
  };

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    <p>Carregando ...</p>;
  }

  return (
    <div className='photo-container'>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className='message-container'>
        {error && <Message type='error' msg={error} />}
        {message && <Message type='success' msg={message} />}
      </div>
      <div className='comments'>
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type='text'
                value={commentText || ''}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder='Insira seu comentário...'
              />
              <input type='submit' value='Enviar' />
            </form>
            {photo.comments.length === 0 && <p> Não há comentários</p>}
            {photo.comments.length > 0 &&
              photo.comments.map((comment) => (
                <div className='comment' key={comment.comment}>
                  <div className='author'>
                    {comment.userImage && (
                      <img
                        src={`${uploads}/users/${comment.userImage}`}
                        alt={comment.userName}
                      />
                    )}
                    <Link to={`/users/${comment.userId}`}>
                      <p>{comment.userName}</p>
                    </Link>
                  </div>
                  <p className='comment-text'>{comment.comment}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
