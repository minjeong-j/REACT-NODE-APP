//PostContent.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost } from '../share/api'; // api.js에서 함수 불러오기
import axios from 'axios';
import { Link } from 'react-router-dom';  // 링크 추가

const PostContent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 변수 선언
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('게시글 불러오기 오류:', error));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  // 수정 함수
  const handleEdit = () => {
    // 수정 페이지로 이동하는 함수
    navigate(`/edit/${id}`);
    
    /*
    const updatedData = {
      title: 'Updated Title', // 새로운 제목 (사용자가 입력한 데이터를 여기에 넣을 수 있다)
      content: 'Updated Content' // 새로운 내용 (사용자가 입력한 데이터를 여기에 넣을 수 있다)
    };
    */

    /*
    //api.js 생성으로 인한 수정
    axios.put(`http://localhost:5001/api/posts/${id}`, updatedData)
      .then(() => {
        alert('Post updated successfully');
        // 필요 시 게시글 데이터를 다시 가져오기
        setPost({ ...post, ...updatedData });
      })
      .catch(error => console.error('게시글 수정 오류:', error));
    */

    /*
    const result = await editPost(id, updatedData);

    if (result.success) {
      alert('Post updated successfully');
      setPost({ ...post, ...updatedData });
    } else {
      alert(result.error || 'Failed to update post');
    }
    */
  };

  // 삭제 함수
  /* 
  // api.js 생성으로 인한 수정
  const handleDelete = () => {
    axios.delete(`http://localhost:5001/api/posts/${id}`)
      .then(() => {
        alert('Post deleted successfully');
        navigate('/'); // 삭제 후 메인 페이지로 이동
      })
      .catch(error => console.error('게시글 삭제 오류:', error));
  }; */

    const handleDelete = async () => {
    const result = await deletePost(id);

    if (result.success) {
      alert('Post deleted successfully');
      navigate('/'); //삭제 후 메인페이지로 이동
    } else {
      alert(result.error || 'Failed to delete post');
    }
  };


  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>조회수:</strong> {post.view_cnt}</p> {/* 조회수 표시 */}
      <p><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</p>
       {/* 버튼 추가 */}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <div>
        <Link to={"/"}>
           게시글 목록
        </Link>
      </div>
    </div>
  );
};

export default PostContent;