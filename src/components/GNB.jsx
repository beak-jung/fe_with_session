import { useNavigate } from 'react-router-dom'

function GNB() {
  const navigate = useNavigate();

  return (
    <nav className="gnb">
      <div className="gnb-container">
        <div className="gnb-logo" onClick={() => navigate('/success')}>
          Logo
        </div>
        <ul className="gnb-menu">
          <li>
            <button onClick={() => navigate('/success')} className="gnb-link">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/success/service')} className="gnb-link">
              Service
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/success/product')} className="gnb-link">
              Product
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/success/about')} className="gnb-link">
              About
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default GNB

