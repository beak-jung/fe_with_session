import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nick_name: ''
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
    
    // 패스워드 확인 검증
    if (formData.password !== formData.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        nick_name: formData.nick_name
      };

      const response = await axios.post('/api/user/signup', signupData);
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h1>회원가입</h1>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">패스워드 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="패스워드를 다시 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nick_name">사용자 이름</label>
            <input
              type="text"
              id="nick_name"
              name="nick_name"
              value={formData.nick_name}
              onChange={handleChange}
              placeholder="사용자 이름을 입력하세요"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-submit">
              회원가입
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

export default Signup

