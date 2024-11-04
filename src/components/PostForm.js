// src/components/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/posts', { title, content })
      .then(() => {
        alert('게시글이 작성되었습니다.');
        setTitle('');
        setContent('');
      })
      .catch((error) => console.error('Error creating post:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>새 게시글 작성</h2>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">작성</button>
    </form>
  );
}

export default PostForm;