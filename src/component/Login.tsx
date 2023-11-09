import { useState } from 'react';
import {Nav, Form, Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import '../css/Nav.css';

function Example(): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link onClick={handleShow} href="#" className="loginLink">로그인</Nav.Link>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <img src="/img/logo.svg" alt="logo"/>
          <button onClick={handleClose}><i className="fa-solid fa-x"></i></button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>아이디</Form.Label>
              <Form.Control autoFocus/>
            </Form.Group>
            <Form.Group>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control/>
            </Form.Group>
          </Form>
          <Button className="loginBtn">로그인</Button>
          <div className="sign">
            <button>회원가입</button>
            <button>아이디·비밀번호 찾기</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;