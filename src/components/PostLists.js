// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function PostList() {
   const [posts, setPosts] = useState([]);

  // function Navigate() {
  //    const navigate = useNavigate();
  //    const onClick = () => {
  //       navigate('/PostForm')
  //   } 
  //    return <button onClick={onClick}>Location</button>
  // }

  useEffect(() => {
    axios.get('/api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>게시판</h1>
      <ul>
        <div>
          {/* <button className='PostForm' onClick={() => handleClick('Success clicked')} type="success">글 작성</button> */}
          {/* <button className='PostForm' onClick={handleClick}>글 작성</button> */}
        </div>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;