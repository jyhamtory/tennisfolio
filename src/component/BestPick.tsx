import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState } from 'react';

import Products from './Products';
import bestdata from '../data/bestdata';
import bestbag from '../data/bestbag';
import besttennis from '../data/besttennis';
import bestracquet from '../data/bestracquet';
import bestwoman from '../data/bestwoman';
import bestman from '../data/bestman';
import bestacc from '../data/bestacc';
import bestshoes from '../data/bestshoes';

interface CategoryProps{
  id: number;
  imgUrl:string;
  name: string;
  count: string;
}

export interface Category{
  id: number;
  imgUrl:string;
  name: string;
  count: string;
}

function BestPick(): JSX.Element {
  let [tennisCategory] = useState(bestdata);
  let [view, setView] = useState(0);
  let now :JSX.Element = <div></div>;

  function MultiPage() {
    switch (view) {
      case 0:
        return (
          now = <TennisBagBox></TennisBagBox>
        )
      case 1:
        return (
          now = <TennisItemBox></TennisItemBox>
        )
      case 2:
        return (
          now = <TennisRacquetBox></TennisRacquetBox>
        )
      case 3:
        return (
          now = <TennisWomanBox></TennisWomanBox>
        )
      case 4:
        return (
          now = <TennisManBox></TennisManBox>
        )
      case 5:
        return (
          now = <TennisAccBox></TennisAccBox>
        )
      case 6:
        return (
          now = <TennisShoesBox></TennisShoesBox>
        )
      default:
        break
    }
  }

  return (
    <div className="container bestItem" style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <div className="categoryMore">
        <h3>카테고리별 인기 아이템</h3>
        <p className="more"><a href="#home">더 많은 아이템 확인하기 +</a></p>
      </div>
      
      {/* 카테고리 슬라이드 */}
      <Swiper
        slidesPerView={3}
        speed={500}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: { slidesPerView: 4 },
          600: { slidesPerView: 5 },
          800: { slidesPerView: 6 },
          900: { slidesPerView: 7 }
        }}
      >
        {
          tennisCategory.map((item, index) => {
            return (
              <SwiperSlide
                className="Container category"
                onClick={() => { setView(index) }}>
                <Category key={index}
                  id={item.id}
                  imgUrl={item.imgUrl}
                  name={item.name}
                  count={item.count}
                ></Category>
              </SwiperSlide>
            )
          })
        }
      </Swiper>

      {/* 멀티페이지 */}
      <div className="Container bestContentsBox">
        {
          MultiPage()
        }
      </div>
    </div>
  )
}

function Category(props:CategoryProps): JSX.Element {
  // 수정: 선택한 카테고리 폰트색 변경
  return (
    <>
      <div className={`categoryWrap ${props.id}`}>
        <div className="imgbox">
          <img src={props.imgUrl} alt="category"/>
        </div>
        <div className={`textbox`}>
          <span className="categoryName">{props.name}</span>
          <span className="count">{props.count}</span>
        </div>
      </div>
    </>
  )
}

// 가방
function TennisBagBox(): JSX.Element {
  let [tennisBag] = useState(bestbag);
  let [clicked] = useState("bag");

  return (
    <div style={{ textAlign: "center" }}>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
        {
          tennisBag.map((item, index) => {
            return (
              <Products
                i={index}
                clicked={clicked}
                imgUrl={item.imgUrl}
                shop={item.shop}
                product={item.product}
                dc={item.dc}
                per={item.per}
                price={item.price}
                nodc={item.nodc}/>
            )
          })
        }
      </div>
    </div>
  )
}

// 테니스용품
function TennisItemBox(): JSX.Element {
  let [tennisItem] = useState(besttennis);
  let [clicked] = useState("item");

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {
        tennisItem.map((item, index) => {
          return (
            <Products
              i={index}
              clicked={clicked}
              imgUrl={item.imgUrl}
              shop={item.shop}
              product={item.product}
              dc={item.dc}
              per={item.per}
              price={item.price}
              nodc={item.nodc}/>
          )
        })
      }
    </div>
  )
}

// 라켓
function TennisRacquetBox(): JSX.Element {
  let [tennisRacquet] = useState(bestracquet);
  let [clicked] = useState("racquet")
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {
        tennisRacquet.map((item, index) => {
          return (
            <Products
              i={index}
              clicked={clicked}
              imgUrl={item.imgUrl}
              shop={item.shop}
              product={item.product}
              dc={item.dc}
              per={item.per}
              price={item.price}
              nodc={item.nodc}/>
          )
        })
      }
    </div>
  )
}

// 여성
function TennisWomanBox(): JSX.Element {
  let [tennisWoman] = useState(bestwoman);
  let [clicked] = useState("woman");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {
        tennisWoman.map((item, index) => {
          return (
            <Products
              i={index}
              clicked={clicked}
              imgUrl={item.imgUrl}
              shop={item.shop}
              product={item.product}
              dc={item.dc}
              per={item.per}
              price={item.price}
              nodc={item.nodc}/>
          )
        })
      }
    </div>
  )
}

// 남성
function TennisManBox(): JSX.Element {
  let [tennisMan] = useState(bestman);
  let [clicked] = useState("man");
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {
        tennisMan.map((item, index) => {
          return (
            <Products
              i={index}
              clicked={clicked}
              imgUrl={item.imgUrl}
              shop={item.shop}
              product={item.product}
              dc={item.dc}
              per={item.per}
              price={item.price}
              nodc={item.nodc}/>
          )
        })
      }
    </div>
  )
}

// 패션잡화
function TennisAccBox(): JSX.Element {
  let [tennisAcc] = useState(bestacc);
  let [clicked] = useState("acc")
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {
        tennisAcc.map((item, index) => {
          return (
            <Products
              i={index}
              clicked={clicked}
              imgUrl={item.imgUrl}
              shop={item.shop}
              product={item.product}
              dc={item.dc}
              per={item.per}
              price={item.price}
              nodc={item.nodc}/>
          )
        })
      }
    </div>
  )
}

// 신발
function TennisShoesBox(): JSX.Element {
  let [tennisShoes] = useState(bestshoes);
  let [clicked] = useState("shoes")
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-5">
      {
        tennisShoes.map((item, index) => {
          return (
            <Products
              i={index}
              clicked={clicked}
              imgUrl={item.imgUrl}
              shop={item.shop}
              product={item.product}
              dc={item.dc}
              per={item.per}
              price={item.price}
              nodc={item.nodc}/>
          )
        })
      }
    </div>
  )
}


export default BestPick;