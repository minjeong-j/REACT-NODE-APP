const express = require('express');
const cors = require('cors');  // CORS 패키지 추가
const db = require('./db');
const app = express();

app.use(cors());  // CORS 미들웨어 추가
app.use(express.json()); // JSON 요청을 처리하기 위해 필요

// 게시글 목록 조회 API
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching posts');
    }
    res.json(results);
  });
});

// 게시글 작성 API
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err, result) => {
    if (err) {
      return res.status(500).send('Error creating post');
    }
    res.status(201).send('Post created successfully');
  });
});

// 게시글 상세 정보 가져오기
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

    // 게시글 정보 가져오기
    db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: '서버 오류' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
      }
      console.log(`### 게시글 조회 성공: ${results[0]}`);
      res.json(results[0]);
    });
  //  }); //조회수 증가 쿼리
});

// 조회수 증가 API 생성
app.patch('/api/posts/:id/view', (req, res) => {
  const { id } = req.params;

  db.query('UPDATE posts SET view_cnt = view_cnt + 1 WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('조회수 증가 오류:', err);
      return res.status(500).json({ message: '서버 오류' });
    }
    res.status(200).send('조회수 증가 성공');
  });
});


// 게시글 수정 API
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  db.query(query, [title, content, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating post');
    }
    res.send('Post updated successfully');
  });
});

// 게시글 삭제 API
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting post');
    }
    res.send('Post deleted successfully');
  });
});

// 서버 실행
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});