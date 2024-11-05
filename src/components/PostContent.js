import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostContent = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('게시글 불러오기 오류:', error));
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>작성일:</strong> {new Date(post.created_at).toLocaleString()}</p>
    </div>
  );
};

export default PostContent;