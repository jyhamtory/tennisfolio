import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState } from 'react';

import cardData from '../data/cardData';

export interface Card{
  imgUrl: string;
  title: string;
  tag: string[];
  hash: string[];
}

interface CardProps{
  imgUrl: string;
  title: string;
  tag: string[];
  hash: string[];
}

function CardList():JSX.Element {
  let [tennisCard] = useState(cardData);

  return (
    <div style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <div className="categoryMore">
        <h3>취향저격! 요즘 테니스</h3>
        <p className="more"><a href="#">더 많은 컨텐츠 확인하기 +</a></p>
      </div>
      <div className="cardWrap">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          speed={500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1200: {
              slidesPerView: 4
            },
            500: {
              slidesPerView: 2,
            },
            300: {
              slidesPerView: 1,
            }
          }}
          loop={true}
        >
          {
            tennisCard.map((item) => {
              return (
                <SwiperSlide>
                  <Cardbox
                    imgUrl={item.imgUrl}
                    title={item.title}
                    tag={item.tag}
                    hash={item.hash}
                  />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  )
}

function Cardbox(props:CardProps): JSX.Element {
  const tagStyle:React.CSSProperties = { listStyle: "none", display: "flex", flexWrap: "wrap", padding: "0" };

  return (
    <div className="cardHover">
      <div className="imgbox">
        <img src={props.imgUrl} />
      </div>
      <div className="textbox">
        <p>{props.title}</p>
        <div className="tagbox">
          <ul style={tagStyle} className="tagList">
            {
              props.tag.map(item => <li>{item}</li>)
            }
          </ul>
        </div>
        <div className="hashbox">
          <ul style={tagStyle} className="hashList">
            {
              props.hash.map(item => <li>{item}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CardList;