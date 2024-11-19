import React, { useState, useEffect } from 'react';
// 1. react-router-dom을 사용하기 위해서 BrowserRouter, Route, Routes를 import한다
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from '../components/PostLists';
import PostForm from '../components/PostForm';
import PostContent from '../components/PostContent';
import Posts from '../components/Posts';  //api/posts
import PostEdit from '../components/PostEdit';
import axios from 'axios';

// 2. Router라는 함수를 만들고 아래와 같이 작성
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들기 위해서!
const Router = () => {
    const [posts, setPosts] = useState([]);

    // 게시글 목록을 초기화하는 useEffect
    useEffect(() => {
    axios.get('http://localhost:5001/api/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
    }, []); // 한 번만 실행

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/" element={<PostList posts={posts} setPosts={setPosts} />} />  {/* posts와 setPosts를 전달 */}
                {/* <Route path="postform" element={<PostForm />} /> */}
                <Route path="/postform" element={<PostForm setPosts={setPosts} />} />  {/* setPosts 전달 */}                
                <Route path="post/:id" element={<PostContent />} />
                {/* 게시글 수정 */}
                <Route path="/edit/:id" element={<PostEdit />} />
                <Route path="api/posts" element={<Posts />} /> {/* API 결과를 보여주는 페이지 */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;