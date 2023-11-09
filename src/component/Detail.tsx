import { Button, Nav, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate} from 'react-router-dom';

// 데이터
import productHot from '../data/productHot';
import bestbag from '../data/bestbag';
import besttennis from '../data/besttennis';
import bestracquet from '../data/bestracquet';
import bestwoman from '../data/bestwoman';
import bestman from '../data/bestman';
import bestacc from '../data/bestacc';
import bestshoes from '../data/bestshoes';
import review from '../data/review';

//장바구니
import { addItem } from './store'
import { useDispatch } from 'react-redux';

import style from '../css/Detail.module.css'

export interface Product{
  id: number;
  index?: number;
  imgUrl: string;
  shop: string;
  product: string;
  price: string;
  new?: boolean;
  dc: string;
  per: string;
  nodc:string;
  subImg:string[];
}

export interface Reviews{
  rating: string;
  percent: string;
  text: string;
  date: string;
} 

interface DetailProps{
  thisItem?:any;
  id?:string|number;
  tap?:number;
  ratingTitle?:string;
  num?:number;
}

function Detail(): JSX.Element {
  const { id } = useParams() as {id: string};  // id
  const location = useLocation();
  let pathname = location.pathname.split("/")[3];
  let [multi, setMulti] = useState(bestbag);  // 클릭한 카테고리의 데이터로 변경
  let [like, setLike] = useState<number>(0);  // 좋아요
  let thisItem = multi[Number(id)];  // 현재 클릭한 상품의 json

  let [tap, setTap] = useState<number>(0);
  let [scrollActive, setScrollActive] = useState<boolean>(false);

  function multipath() {
    switch (pathname) {
      case "bag":
        return (
          setMulti(bestbag)
        )
      case "item":
        return (
          setMulti(besttennis)
        )
      case "racquet":
        return (
          setMulti(bestracquet)
        )
      case "woman":
        return (
          setMulti(bestwoman)
        )
      case "man":
        return (
          setMulti(bestman)
        )
      case "acc":
        return (
          setMulti(bestacc)
        )
      case "shoes":
        return (
          setMulti(bestshoes)
        )
      default:
        return (
          setMulti(productHot)
        )
    }
  }

  useEffect(() => {
    function scrollFixed() {
      const position = window.scrollY;
      if (window.innerWidth > 1400) {
        if (position > 1050) {
          setScrollActive(true);
        } else {
          setScrollActive(false);
        }
      } else {
        setScrollActive(false);
      }
    };
    window.addEventListener("scroll", scrollFixed);
    
    return () => {
      window.removeEventListener("scroll", scrollFixed);
    };
  })

  useEffect(()=>{
    multipath()
    window.scrollTo(0, 0)
  },[])

  return (
    <div style={{ background: "#f5f6f7" }}>
      {/*위쪽 컨텐츠 */}
      <div className="container" style={{ padding: "50px" }}>
        {/* 왼쪽 */}
        <div className="row">
          <div className="col-xl-7 col-md-12" style={{ padding: "20px" }}>
            <div className="ThumbImg">
              <div className={style.mainImg}>
                <img src={"/" + thisItem.imgUrl} alt="thumbimg"/>
              </div>
              <div className={style.subImg}>
                <img src={"/" + thisItem.imgUrl} alt="subimg"/>
              </div>
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="col-xl-5 col-md-12" style={{ padding: "20px 50px" }}>
            <div className={style.detailTop}>
              <span className={style.brand}>{thisItem.shop}</span>
              <p className={style.product}>{thisItem.product}</p>
            </div>
            <div className={style.price}>
              <p>{thisItem.price}</p>
              <div className={style.likeBox}>
                <i className="fa-regular fa-face-smile" onClick={() => { setLike(like + 1) }}></i>
                <span>{like}</span>
              </div>
            </div>
            <span className={style.delivery}>무료배송</span>
            <div className={style.deliveryInfo}>
              <span>브랜사 직접배송</span>
              <br></br>
              <span>제주도 정가배송/도서산간지역 정가배송</span>
            </div>
            <Price thisItem={thisItem} />
          </div>
        </div>
      </div>
      {/* 아래쪽 컨텐츠 */}
      <div className={`container-fluid ${scrollActive ? style.fixedLeft : ""}`} style={{ height: "92px", background: "#fff" }}>
        <div className="container">
          {/* 네비게이션 */}
          <div className="row">
            <div className="col-xl-9" >
              <div style={{ padding: "50px 50px 0", background: "#fff" }} className="detailTab">
                <Nav variant="tabs" defaultActiveKey="link0">
                  <Nav.Item>
                    <Nav.Link onClick={() => { setTap(0); window.scrollTo(0, 1000); }} eventKey="link0">상세정보</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => { setTap(1); window.scrollTo(0, 1000); }} eventKey="link1">후기</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => { setTap(2); window.scrollTo(0, 1000); }} eventKey="link3">배송환불</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            {/* 상품금액 */}
            <div className={`col-xl-3 d-none d-xl-block`}>
              <Price thisItem={thisItem} id={id} />
            </div>
          </div>
        </div>
      </div>
      {/* 상품컨텐츠 */}
      <div className={`container-fluid`}>
        <div className="container-fluid" style={{ background: "#fff" }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-9" style={{ padding: "50px" }}>
                <TabContent tap={tap} thisItem={thisItem} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Price(props:DetailProps): JSX.Element {
  let [count, setCount] = useState(1);
  let [total] = useState(0);
  let totalStr = "";

  let dispatch = useDispatch();
  let basket = props.thisItem;

  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function totalPrice() { //제품의 총 가격 표시
    total = Number(basket.price.replace(",", "")) * count;
    totalStr = total.toLocaleString();
    

    return (totalStr)
  }

  return (
    <>
      <div className={`${style.detailSelect}`}>
        <div className={`${style.optionBox}`}>
          <div className={`${style.count}`}>
            <button
              className={`${style.leftBtn}`}
              onClick={() => { count > 1 ? setCount(count - 1) : setCount(1) }}>-</button>
            <input
              type="number"
              value={count}
              onChange={(e) => { setCount(Number(e.target.value)) }}
              title="totalCount"
              className={`${style.inputNum}`}></input>
            <button
              className={`${style.rightBtn}`}
              onClick={() => { setCount(count + 1) }}>+</button>
          </div>
          <div className={`${style.total}`}>
            <span>{totalPrice()}</span>
          </div>
        </div>
      </div>
      <div className={`${style.totalBox}`}>
        <span className={`${style.totalTit}`}>총 상품 금액</span>
        <span className={`${style.totalBig}`}>{totalPrice()}원</span>
      </div>
      <div className={`${style.buttonBox}`}>
        <Button variant="secondary" className={`${style.grayBtn}`}>바로구매</Button>{' '}
        <Button
          variant="secondary"
          className={`${style.purpleBtn}`}
          onClick={() => {
            setShow(true)
            dispatch(
              addItem({
                id: basket.id,
                imgUrl: basket.imgUrl.replace("img/", ""),
                product: basket.product,
                
                //수정: 처음 장바구니를 누르면 설정한 count만큼 들어가는데, 두 번째부터 count 무시 (1씩 늘어남) 
                count: count,  
                price: Number(basket.price.replace(",", ""))
              })
            );
          }}>장바구니</Button>{' '}
        
        {/* 장바구니 모달창 */}

      <Modal show={show} onHide={handleClose} className={`${style.cartModal}`} centered>
        <Modal.Body>
          <div className={`${style.cartModalTit}`}>
            <i className="fa-solid fa-cart-shopping"></i>
            <p>{`선택하신 상품이\n 장바구니에 추가되었습니다.`}</p>
          </div>
          <div className={`${style.cartModalBtn}`}>
            <Button variant="secondary" className={`${style.grayBtn}`} onClick={handleClose}>
              쇼핑 계속하기
            </Button>
            <Button className={`${style.purpleBtn}`} onClick={() => {navigate("/Cart")}}>
              장바구니로 이동
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      </div>
      
    </>
  )
}

interface TabContentProps{
  thisItem:any;
  tap:number;
}

function TabContent(props:TabContentProps): JSX.Element {
  return [
    <ProductInfo thisItem={props.thisItem} />,
    <Review thisItem={props.thisItem} />,
    <Delivery />
  ][props.tap]
}

function ProductInfo(props:DetailProps): JSX.Element {
  return (
    <div className={style.productInfo} style={{ padding: "50px 0 150px" }}>
      <div>
        <img src={"/" + props.thisItem.subImg} alt="productInfo"/>
      </div>
      <div className={style.infoDetail}>
        <h3 className={style.title}>상품정보 제공 고시</h3>
        <table className={style.detailTable}>
          <tbody>
            <tr>
              <th>품명 및 모델명</th>
              <td>{props.thisItem.product}</td>
            </tr>
            <tr>
              <th>소재</th>
              <td>상세페이지 참조</td>
            </tr>
            <tr>
              <th>색상</th>
              <td>상세페이지 참조</td>
            </tr>
            <tr>
              <th>제조자, 수입품의 경우 수입자를 함께 표기 (병행수입의 경우 병행수입 여부로 대체 가능)</th>
              <td>상세페이지 참조</td>
            </tr>
            <tr>
              <th>제조국</th>
              <td>상세페이지 참조</td>
            </tr>
            <tr>
              <th>취급시 주의사항</th>
              <td>상세페이지 참조</td>
            </tr>
            <tr>
              <th>품질보증기준</th>
              <td>상세페이지 참조</td>
            </tr>
            <tr>
              <th>A/S 책임자와 전화번호</th>
              <td>상세페이지 참조</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface ReviewProps{
  thisItem:any;
}

function Review(props:ReviewProps): JSX.Element {

  return (
    <div className={style.review} style={{ padding: "50px 0 150px" }}>
      <div>
        <h3 className={style.title}>후기</h3>
      </div>
      <div className={`row ${style.rating}`}>
        <div className={`col-md-6 col-sm-12 ${style.left}`}>
          <StarBig ratingTitle={"별점"} />
          <span className={style.ratingNow}>4.5</span>
          <span className={style.ratingTotal}>/5.0</span>
        </div>
        <div className={`col-md-6 col-sm-12 ${style.right}`}>
          <Star ratingTitle={"내구성"} />
          <Star ratingTitle={"가격"} />
          <Star ratingTitle={"디자인"} />
          <Star ratingTitle={"배송"} />
        </div>
      </div>
      <div className={`row ${style.reviewBox}`}>
        <div className="col-xl-12">
          <ul>
            <ReviewContent thisItem={props.thisItem} num={0} />
            <ReviewContent thisItem={props.thisItem} num={1} />
            <ReviewContent thisItem={props.thisItem} num={2} />
          </ul>
        </div>
      </div>
    </div>
  )
}

interface StarProps{
  ratingTitle:string;
}

function StarBig(props:StarProps): JSX.Element {
  return (
    <div className={style.starsBig}>
      <p className={style.ratingTitle}>{props.ratingTitle}</p>
      <div className={style.ratingBox}>
        <div className={style.ratingBase}>
          <img src="/img/star_rating_base.svg" alt="starbase"/>
        </div>
        <div className={style.ratingFill}>
          <img src="/img/star_rating_fill.svg" alt="starfill"/>
        </div>
      </div>
    </div>
  )
}

function Star(props:StarProps): JSX.Element {
  return (
    <div className={style.stars}>
      <p className={style.ratingTitle}>{props.ratingTitle}</p>
      <div className={style.ratingBox}>
        <div className={style.ratingBase}>
          <img src="/img/star_rating_base.svg" alt="starbase"/>
        </div>
        <div className={style.ratingFill}>
          <img src="/img/star_rating_fill.svg" alt="starfill"/>
        </div>
      </div>
    </div>
  )
}

interface ReviewContentProps{
  thisItem:any;
  num:number;
}

function ReviewContent(props:ReviewContentProps): JSX.Element {
  let [count, setCount] = useState(0);
  let [reviewData] = useState(review);

  return (
    <li className={style.reviewContent}>
      <div className={style.reviewLeft}>
        <div className={style.imgbox}>
          <img src="/img/profile_basic.svg" alt="profile"/>
        </div>
      </div>
      <div className={style.reviewRight}>
        <p className={style.product}>{props.thisItem.product}</p>
        <p className={style.option}>옵션1</p>
        <div className={style.ratingBox}>
          <div className={style.ratingBase}>
            <img src="/img/star_rating_base.svg" alt="starbase"/>
          </div>
          <div className={style.ratingFill} style={{ width: `${reviewData[props.num].percent}` }}>
            <img src="/img/star_rating_fill.svg" alt="starfill"/>
          </div>
          <span>{reviewData[props.num].rating}</span>
        </div>
        <p className={style.content}>{reviewData[props.num].text}</p>
        <div className={style.btnbox}>
          <div className={style.thankBtn} onClick={() => { setCount(count + 1) }}>
            <i className="fa-solid fa-thumbs-up"></i>
            <span>감사요</span>
            <span>{count}</span>
          </div>
          <div className={style.reportBtn}>
            <span>신고하기</span>
          </div>
          <div className={style.data}>
            <span>{reviewData[props.num].date}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

function Delivery(): JSX.Element {
  return (
    <div className={style.deliveryDetail} style={{ padding: "50px 0 150px" }}>
      <div>
        <h3 className={style.title}>상품정보 제공 고시</h3>
        <table className={style.detailTable}>
          <tbody>
            <tr>
              <th>배송</th>
              <td>브랜드사 직접배송</td>
            </tr>
            <tr>
              <th>배송비</th>
              <td>무료</td>
            </tr>
            <tr>
              <th>제주도/도서산간지역</th>
              <td>제주도: 5,500원 / 도서 산간지역:5,500원</td>
            </tr>
            <tr>
              <th>배송불가지역</th>
              <td>배송 불가 지역이 없습니다.</td>
            </tr>
            <tr>
              <th>배송기간</th>
              <td>일반적으로 평일기준 3-5일정도 소요되며, 도서산간 지역 등은 3-5일이 더 소요될 수 있습니다.<br></br>
                -천재지변, 물량 수급 변동 등 예외적인 사유 발생 시, 다소 지연될 수 있는 점 양해 부탁드립니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.changeDetail}>
        <h3 className={style.title}>반품/교환</h3>
        <table className={style.detailTable}>
          <tbody>
            <tr>
              <th>반품배송비</th>
              <td>반품비용 : 5,000 원, 수거비용 : 0 원</td>
            </tr>
            <tr>
              <th>교환 배송비</th>
              <td>교환비용 : 5,000 원, 재배송비 : 0 원</td>
            </tr>
            <tr>
              <th>보내실 곳</th>
              <td>(12950) 경기 하남시 대청로 9 7층 L7119호</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={style.changeInfo}>
        <p style={{ fontWeight: "600" }}>반품/교환 사유에 따른 요청 가능 기간</p>
        <p>- 구매자 단순변심에 의한 교환/반품은 제품 수령 후 7일 이내, 교환/반품 제한사항에 해당하지 않는 경우만 가능 (구매자가 반품 배송비 부담)</p>
        <p>- 상품의 내용이 표시·광고의 내용과 다른 경우 상품을 수령한 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내 가능 (판매자가 반품 배송비 부담)</p>
      </div>
      <div className={style.changeInfo}>
        <p style={{ fontWeight: "600" }}>반품/교환 불가사유</p>
        <p>1. 반품요청기간이 경과한 경우</p>
        <p>2. 구매자의 책임 있는 사유로 상품 등이 멸실/훼손된 경우 (단, 상품확인을 위한 훼손은 제외)</p>
        <p>3. 구매자의 사용 또는 소비에 의해 상품 등의 가치가 현저히 감소한 경우</p>
        <p>4. 시간의 경과에 의해 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</p>
        <p>5. 복제가 가능한 상품 등의 포장을 훼손한 경우</p>
        <p>6. 판매/생산방식의 특성상, 교환/반품 시 판매자에게 회복할 수 없는 손해가 발생하는 경우(주문접수 후 개별생산, 맞품 제작 등)</p>
        <p>※ 구매자가 반품 비용을 부담하는 경우 환불금액에서 반품비용 차감 후 환불처리됩니다.</p>
      </div>
      <h3 className={style.title}>판매자 정보</h3>
      <table className={style.detailTable}>
        <tbody>
          <tr>
            <th>상호</th>
            <td>논포멀하우스</td>
          </tr>
          <tr>
            <th>대표자</th>
            <td>정채은</td>
          </tr>
          <tr>
            <th>사업장소재지</th>
            <td>(12950) 경기 하남시 대청로 9 7층 L7119호</td>
          </tr>
          <tr>
            <th>고객센터 연락처</th>
            <td>010-4114-8233</td>
          </tr>
          <tr>
            <th>응대 가능 시간</th>
            <td>-</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>nfh.kr.official@gmail.com</td>
          </tr>
          <tr>
            <th>FAX</th>
            <td>-</td>
          </tr>
          <tr>
            <th>사업자 등록 번호</th>
            <td>666-34-01065</td>
          </tr>
          <tr>
            <th>통신판매업신고</th>
            <td>2022-경기하남-2215</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;