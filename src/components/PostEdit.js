import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editPost } from '../share/api';	//api.js에서 editPost 함수 불러오기
import axios from 'axios';

const PostEdit = () => {
	const { id } = useParams();	//URL에서 post ID를 가져옴
    const navigate = useNavigate();	//navigate 사용
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    useEffect(() => {
    // 게시글 데이터를 가져와서 수정할 수 있도록 제목과 내용 상태에 저장
    axios 
        .get(`http://localhost:5001/api/posts/${id}`) // 템플릿 리터럴 수정
    	.then(response => {
        	setTitle(response.data.title);
        	setContent(response.data.content);
        })
        .catch(error => console.error('게시글 불러오기 오류:', error));
    },[id]);
    
    const handleSave = async () => {
    	const updatedData = { title, content };
       
        try {
            const result = await editPost(id, updatedData);
           
            if (result.success){
                alert('Post updated successfully');
                navigate('/');	//수정 후 목록 페이지로 이동
            } else {
                alert(result.error || 'Failed to update post');
            }
        } catch (error) {
            console.error('### 게시글 수정 오류:', error);
            alert('Failed to update post');
        }
    };
    
    return (
    	<div>
        	<h2>Edit Post</h2>
            <div>
            	<label>Title</label>
                <input
                	type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}	//제목 입력값 상태에 반영
                />
            </div>
            <div>
            <label>Content</label>
            <textarea 
            	value={content}
                onChange={(e) => setContent(e.target.value)}	//내용 입력값 상태에 반영
            />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default PostEdit;