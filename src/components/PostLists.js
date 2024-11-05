// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';  // 링크 추가
import { useNavigate } from 'react-router-dom'; // 추가: navigate 사용

function PostList() {
  // 게시물 데이터를 저장할 상태 변수
   const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 게시글 목록 가져오기
    axios.get('http://localhost:5001/api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);  // 처음 한 번만 실행

  return (
    <div>
      <h1>게시판</h1>
      <div>
        {/* 글 작성 페이지로 이동 */}
        <Link to="/postform">
          <button>글 작성</button>
        </Link>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* 추가 */}
            <Link to={`/post/${post.id}`}>상세보기</Link>
          </li>
        )) }
      </ul>
    </div>
  );
}

export default PostList;