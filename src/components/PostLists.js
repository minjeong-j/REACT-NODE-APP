// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';  // 링크 추가

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
    <div style={{ width: '80%', margin: '0 auto' }} className="my-5">
       {/* 게시판 제목과 버튼을 가로로 배치 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mt-3">게시판</h1>  
        {/* 글 작성 페이지로 이동 */}
        <Link to="/postform">
           <Button variant="primary">글쓰기</Button>
        </Link>
      </div>

       <Table bordered hover>
        <thead> 
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
            <th>조회</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/post/${post.id}`}>
                  {post.title}
                </Link>
              </td>
              <td>{post.content}</td>
              <td>{new Date(post.created_at).toLocaleDateString()}</td>
              <td>{post.view_cnt}</td>
            </tr>
          )) }
        </tbody>
      </Table>

    </div>
  );
}

export default PostList;