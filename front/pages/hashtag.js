import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';


const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post);

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