import React from 'react';
// 1. react-router-dom을 사용하기 위해서 BrowserRouter, Route, Routes를 import한다
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from '../components/PostLists';
import PostForm from '../components/PostForm';

// 2. Router라는 함수를 만들고 아래와 같이 작성
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들기 위해서!
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="postform" element={<PostForm />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;