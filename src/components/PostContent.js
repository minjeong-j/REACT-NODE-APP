//PostContent.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost } from '../share/api'; // api.js에서 함수 불러오기
import axios from 'axios';
import { Link } from 'react-router-dom';  // 링크 추가
import { Container, Row, Col, Button } from 'react-bootstrap';

const PostContent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 변수 선언
  const [post, setPost] = useState(null);
  
  useEffect(() => {
  // 게시글 데이터 가져오기
  console.log("### useEffect 실행됨");
  axios.get(`http://localhost:5001/api/posts/${id}`)
    .then(response => {
      setPost(response.data);

      // 조회수 증가 API 호출
      console.log("### 조회수 증가 API 호출");
      axios.patch(`http://localhost:5001/api/posts/${id}/view`)
        .catch(error => console.error('조회수 증가 오류:', error));
    })
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
    <Container style={{ maxWidth: '800px', marginTop: '50px' }}>
      <h2 className="mb-4">{post.title}</h2>
      <Row className="mb-4">
        {/* 조회수와 작성일을 같은 Row에 배치 */}
        <Col md="6">
          <p>
            <strong>조회수:</strong> {post.view_cnt}
          </p>
        </Col>
        <Col md="6" className="text-end">
          <p>
            <strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}
          </p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {/* 내용에 테두리 추가 */}
          <div
            style={{
              border: '1px solid #ccc', // 테두리 색상
              borderRadius: '8px', // 테두리 둥글게
              padding: '16px', // 내용과 테두리 간 간격
              backgroundColor: '#f9f9f9', // 배경 색상
              minHeight: '350px', // 최소 높이를 350px로 설정
            }}>
              <p>{post.content}</p>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* 목록으로 돌아가기 버튼을 하단 왼쪽에 배치 */}
        <Col md="6">
          <Link to="/">
            <Button variant="secondary">목록으로 돌아가기</Button>
          </Link>
        </Col>

        <Col className="d-flex justify-content-end">
          <Button variant="primary" className="me-2" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </Col>
      </Row>
    </Container>
  );
};


export default PostContent;