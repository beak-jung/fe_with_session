import GNB from '../components/GNB'
import { useNavigate, useLocation } from 'react-router-dom'

function Success({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 경로에 따라 다른 내용 표시
  const getPageContent = () => {
    const path = location.pathname;
    
    if (path.includes('/service')) {
      return {
        title: 'Service',
        content: '서비스 페이지입니다.'
      };
    } else if (path.includes('/product')) {
      return {
        title: 'Product',
        content: '제품 페이지입니다.'
      };
    } else if (path.includes('/about')) {
      return {
        title: 'About',
        content: '회사 소개 페이지입니다.'
      };
    } else {
      // 사용자 이름 필드 확인 (nick_name, username, name 등)
      const userName = user?.nick_name || user?.username || user?.name || '사용자';
      return {
        title: `${nick_name}님 환영합니다.`,
        content: '로그인에 성공하셨습니다.'
      };
    }
  };

  const pageContent = getPageContent();

  return (
    <div className="success-page">
      <GNB />
      <div className="success-content">
        <h1>{pageContent.title}</h1>
        <p>{pageContent.content}</p>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-home"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Success

