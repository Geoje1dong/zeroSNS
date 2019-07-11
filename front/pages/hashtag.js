import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { loadHashtagPostsRequestAction } from '../reducers/post';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';


const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post);

    // useEffect(() => {
    //     dispatch(loadHashtagPostsRequestAction({
    //         data:tag,
    //     }))
    // },[]);

    useEffect(() => {
        dispatch({
          type: LOAD_HASHTAG_POSTS_REQUEST,
          data: tag,
        });
      }, []);

    return(
        <div>
            {mainPosts.map(c => (
                <PostCard key={+c.id} post={c} />
            ))}
        </div>
    )
}

Hashtag.getInitialProps = async (context) => {
    console.log('hashtag getInitialProps', context.query.tag);
    return { tag: context.query.tag };
  };

export default Hashtag;