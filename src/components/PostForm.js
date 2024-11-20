import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

function PostForm({ setPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5001/api/posts', { title, content }) 
      .then(() => {
        alert('게시글이 작성되었습니다.');
        setTitle('');
        setContent('');

        axios.get('http://localhost:5001/api/posts')
          .then((response) => setPosts(response.data))
          .catch((error) => console.error('Error fetching posts:', error));

        navigate('/');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <Container style={{ maxWidth: '800px', marginTop: '50px' }}>
      <h2 className="mb-5">새 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <Row className="mb-3">
          <Form.Label>제목</Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </Col>
        </Row>

        {/* 내용 입력 및 버튼 */}
        <Row className="mb-4 align-items-center">
          <Form.Label>내용</Form.Label>
          <Col md={10} className="position-relative">
            <Form.Control
              as="textarea"
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              style={{ paddingRight: '100px' }} 
            />
            {/* 버튼을 textarea 왼쪽 아래에 위치 */}
            <Button
              className='mt-3'
              variant="primary"
              type="submit"
              style={{
                bottom: '10px',
                right: '10px',
              }}>작성
            </Button>
           </Col>
        </Row>
      </form>
    </Container>
  );
}

export default PostForm;
