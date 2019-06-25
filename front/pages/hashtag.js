import React,{useEffect, useSelector} from 'react';
import {useDispatch} from 'react-redux';
import { loadHashtagPostsRequestAction } from '../reducers/post';
import PostCard from '../components/PostCard';


const Hashtag = ({tag}) => {
    const dispatch = useDispatch();
    const {mainPosts} = useSelector(state => state.post);

    useEffect(() => {
        dispatch(loadHashtagPostsRequestAction({
            data:tag,
        }))
    },[]);

    return(
        <div>
            {/* {mainPosts.map(c => (
                <PostCard key={+c.createdAt} post={c} />
            ))} */}
            123123
        </div>
    )
}

Hashtag.getInitialProps = async(context) => {
    return {tag: context.query.tag}
};

export default Hashtag;