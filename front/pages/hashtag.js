import React,{useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';


const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const {mainPosts, hasMorePost} = useSelector(state => state.post);
    
    const onScroll = useCallback(() => {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
        if(hasMorePost){
          const lastId = mainPosts[mainPosts.length - 1]
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
            lastId
          })
        }
      }
    }, [hasMorePost, mainPosts.length])

    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => {
          window.removeEventListener('scroll', onScroll);
      }
    },[mainPosts.length]);

    // useEffect(() => {
    //     dispatch({
    //       type: LOAD_HASHTAG_POSTS_REQUEST,
    //       data: tag,
    //     });
    //   }, []);

    return(
        <div>
            {mainPosts.map(c => (
                <PostCard key={+c.id} post={c} />
            ))}
        </div>
    )
}

Hashtag.getInitialProps = async (context) => {
  const tag = context.query.tag;
  console.log('hashtag getInitialProps', tag);
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: tag,
  });
  return { tag };
};

export default Hashtag;