import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post('/api/user/login', loginData);
      console.log('로그인 성공:', response.data);
      console.log('전체 응답:', response);
      
      // 사용자 정보 저장 (응답에서 사용자 정보를 받아온다고 가정)
      // 실제 API 응답 구조에 맞게 수정 필요
      let userData = null;
      const data = response.data;
      
      // 다양한 응답 구조 처리
      if (data) {
        // 1. data.user 객체가 있는 경우
        if (data.user) {
          userData = data.user;
        }
        // 2. data에 직접 사용자 정보가 있는 경우
        else if (data.nick_name || data.username || data.name) {
          userData = {
            nick_name: data.nick_name || data.username || data.name,
            email: data.email || formData.email
          };
        }
        // 3. data 자체가 사용자 정보인 경우
        else {
          userData = data;
        }
      }
      
      // 사용자 이름 필드 확인 (nick_name, username, name 등)
      const userName = userData?.nick_name || userData?.username || userData?.name;
      
      if (userData && userName) {
        // nick_name 필드가 없으면 추가
        if (!userData.nick_name) {
          userData.nick_name = userName;
        }
        setUser(userData);
        console.log('사용자 정보 저장:', userData);
        // 홈으로 이동
        navigate('/');
      } else {
        console.error('사용자 정보 파싱 실패. 응답 데이터:', data);
        // 사용자 정보가 없어도 로그인은 성공했으므로, 이메일을 사용자 이름으로 사용
        setUser({
          nick_name: formData.email.split('@')[0] || '사용자',
          email: formData.email
        });
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="패스워드를 입력하세요"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-submit">
              로그인
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn btn-cancel"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login

