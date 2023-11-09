import { Navbar, Nav, Container} from 'react-bootstrap';
import { Routes, Route, useNavigate} from 'react-router-dom';
import { useState } from 'react';

import Login from './Login';
import SignUp from './SignUp';
import Search from './Search';
import Menu from './Menu';
import MainSlide from './MainSlide';
import Style from './Style';
import Hot from './Hot';
import Best from './BestPick';
import CardList from './CardList';
import Detail from './Detail';
import Cart from './Cart';

import '../css/Nav.css';

function NavGroup():JSX.Element {
  
  let navigate = useNavigate();
  
  // 검색
  const [isClicked, setIsClicked] = useState(false);

  // 메뉴
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const row = { display: "flex", flexFlow: "row wrap", alignItems: "center", marginLeft: "50px" };
  const bold = { fontSize: "20px", fontWeight: "700" };
  return (
    <>
      <Navbar bg="black" variant="dark" className="loginBar">
        <Container style={{ maxWidth: "1550px" }}>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="ml-auto login">
            <Login/>
            <SignUp/>
            <Nav.Link href="#" className="loginLink">고객센터</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar expand="xxl">
        <Container className="categoryBar">
          <Navbar.Brand href="#">
            <Nav.Link onClick={() => { navigate('/') }}><img src="/img/logo.svg" width="150" height="65" alt="logo"/></Nav.Link>
          </Navbar.Brand>
          <Navbar.Collapse className="category">
            <Nav className="me-auto">
              <div style={row} className="community">
                <Nav.Link onClick={() => { navigate("/detail/hot/0") }} style={bold}>커뮤니티</Nav.Link>
                <Nav.Link onClick={() => { navigate("/detail/hot/1") }}>SNS</Nav.Link>
                <Nav.Link onClick={() => { navigate("/detail/hot/2") }}>컨텐츠</Nav.Link>
                <Nav.Link onClick={() => { navigate("/detail/hot/3") }}>질문답변</Nav.Link>
              </div>
              <div style={row} className="store">
                <Nav.Link onClick={() => { navigate("/detail/hot/4") }} style={bold}>스토어</Nav.Link>
                <Nav.Link onClick={() => { navigate("/detail/hot/5") }}>베스트</Nav.Link>
                <Nav.Link onClick={() => { navigate("/detail/hot/6") }}>카테고리</Nav.Link>
                <Nav.Link onClick={() => { navigate("/detail/hot/7") }}>기획전</Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
          <Navbar className="iconbox">
            <Nav.Link onClick={() => { setIsClicked(!isClicked) }}><i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
            <Nav.Link onClick={() => { navigate("/Cart") }}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
            <Nav.Link onClick={handleShow}><i className="fa-solid fa-bars"></i></Nav.Link>
            {/* 메뉴바 */}
            <Menu show={show} handleClose={handleClose}/>
          </Navbar>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={
          <div>
            {
              isClicked ? <Search isClicked={isClicked} setIsClicked={setIsClicked}></Search> : null
            }
            <MainSlide/>
            <Style/>
            <Hot />
            <div className="banner1 img-fluid" style={{ marginBottom: "150px" }}>
              <a href="/"><img src="img/banner.jpg" alt="banner"/></a>
            </div>
            <Best />
            <Container className="banner2 d-flex justify-content-between" style={{ maxWidth: "1600px", marginBottom: "150px" }}>
              <div className="row row-cols-1 row-cols-xl-2">
                <div className="col img-fluid">
                  <a href="/"><img src="img/banner2.png" alt="banner"/></a>
                </div>
                <div className="col img-fluid">
                  <a href="/"><img src="img/banner3.png" alt="banner"/></a>
                </div>
              </div>
            </Container>
            <CardList />
          </div>} />
        <Route path="/detail/hot/:id" element={<Detail />} />
        <Route path="/detail/best/bag/:id" element={<Detail />} />
        <Route path="/detail/best/item/:id" element={<Detail />} />
        <Route path="/detail/best/racquet/:id" element={<Detail />} />
        <Route path="/detail/best/woman/:id" element={<Detail />} />
        <Route path="/detail/best/man/:id" element={<Detail />} />
        <Route path="/detail/best/acc/:id" element={<Detail />} />
        <Route path="/detail/best/shoes/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default NavGroup;