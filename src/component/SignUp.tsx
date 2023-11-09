import { useState } from 'react';
import { Nav, Form, Modal} from 'react-bootstrap';

import '../css/Nav.css';


function Example(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [view, setView] = useState(true);

  return (
    <>
      <Nav.Link onClick={handleShow} href="#" className="loginLink">회원가입</Nav.Link>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {
            view === true ?
              (<Step1
                checked1={checked1}
                setChecked1={setChecked1}
                checked2={checked2}
                setChecked2={setChecked2} />) :
              (<Step2 />)
          }
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={() => { checked1 && checked2 === true ? setView(false) : alert("모든 항목에 동의 후 진행하세요")}}
            className={"nextBtn"}> 다음</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

interface SignProps{
  setChecked1(arg0: boolean): unknown;
  setChecked2(arg0: boolean): unknown;
  checked1:boolean;
  checked2:boolean;
}

function Step1(props:SignProps):JSX.Element {
  return (
    <>
      <div className="stepbox">
        <span>Step 1.</span>
        <p>아래 약관에 동의해주세요.</p>
      </div>
      <div className="agreebox">
        <Form>
          <Form.Group>
            <div className="tit">
              <p>개인정보 처리 방침<span>*</span></p>
              <p className="more">약관전체보기</p>
            </div>
            <button
              onClick={(e) => { props.setChecked1(!props.checked1); e.preventDefault() }}
              className={props.checked1 ? "checked" : ""}>동의합니다.</button>
            <div className="tit">
              <p>이용약관<span>*</span></p>
              <p className="more">약관전체보기</p>
            </div>
            <button
              onClick={(e) => { props.setChecked2(!props.checked2); e.preventDefault() }}
              className={props.checked2 ? "checked" : ""}>동의합니다.</button>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

function Step2(): JSX.Element {
  // 수정1: Step2에서 나가면 Step1으로 돌아가기
  // 수정2: Step2에서 required 미입력시 오류 표시
  return (
    <>
      <div className="stepbox">
        <span>Step 2.</span>
        <p>회원정보를 입력해 주세요.</p>
      </div>
      <Form className="signUp">
        <Form.Group>
          <Form.Label>아이디<span>*</span></Form.Label>
          <Form.Control required type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>이름<span>*</span></Form.Label>
          <Form.Control required type="text"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>닉네임<span>*</span></Form.Label>
          <Form.Control required type="text"/>
        </Form.Group>
        <Form.Group className="pw">
          <Form.Label>비밀번호<span>*</span></Form.Label>
          <Form.Control required type="password"/>
          <p className="rule">영어, 숫자, 특수문자 중 2가지를 포함한 8자리 이상</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>비밀번호 확인<span>*</span></Form.Label>
          <Form.Control required type="password"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>이메일<span>*</span></Form.Label>
          <Form.Control required type="email"/>
        </Form.Group>
      </Form>
    </>
  )
}

export default Example;