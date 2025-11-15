//react 패키지로부터 useState 함수를 가져오기
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'

//state(상태)를 정의하고 초기화한다
// const [count, setCount] = useState(0); // count라는 상태를 정의하고 초기값을 0으로 설정

//상태 정의하기
// const [상태명, 상태값을 변경하는 함수명] = useState(초기값);

// 상태(state)의 특징
// 상태값이 변경되면 페이지의 해당 컴포넌트가 다시 랜더링된다.

function Home({ user }) {
  const navigate = useNavigate();
  return(
    <>
      <div className="home-container">
        {user && user.nick_name ? (
          <>
            <h1>{user.nick_name}님 환영합니다.</h1>
            <p>로그인에 성공하셨습니다.</p>
          </>
        ) : (
          <>
            <h1>환영합니다!</h1>
            <p>로그인하거나 회원가입을 진행해주세요.</p>
            <div className="button-group">
              <button onClick={() => navigate('/login')} className="btn btn-login">
                로그인
              </button>
              <button onClick={() => navigate('/signup')} className="btn btn-signup">
                회원가입
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
