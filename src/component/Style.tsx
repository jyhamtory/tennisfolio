import { useState } from 'react';
import data from '../data/data';

export interface Style {
  index: number;
  id: string;
  imgUrl: string;
  likeNum: number;
  content: string;
  tag: string[];
  hash: string[];
  reply: number;
  view: number;
}

interface StyleProps {
  id: string;
  imgUrl: string;
  likeNum: number;
  content: string;
  tag: string[];
  hash: string[];
  reply: number;
  view: number;
}

function Style():JSX.Element {
  const space: React.CSSProperties = { whiteSpace: "pre-line" }
  let [styleData] = useState(data);

  return (
    <>
      <div className="container stylebox" style={{ margin: "150px auto 150px", maxWidth: "1600px", whiteSpace: "pre-line" }}>
        <div className="row">
          <div className="col-xxl-4">
            <div className="ms-5 mb-5 ms-xxl-0 mb-xxl-0">
              <h3 style={space} className="styleTitle">
                {`테니스 칠 때 뭐 입지? \n 관심있는 스타일을 찾아보세요`}
              </h3>
              <p style={space} className="styleSub">
                {`로그인 하시면 취향에 맞는 스타일을 \n 확인하실 수 있어요.`}
              </p>
            </div>
            <div className="plusBtn d-none d-xxl-block" style={{ margin: "180px 0" }}>
              <img src="img/btn_plus.png" alt="plus"/>
            </div>
            <div className="logoBg d-none d-xxl-block" style={{ opacity: 0.1, position: "relative", left: "-80px", width: "115%" }}>
              <img src="img/logo.svg" alt="logobg"/>
            </div>
          </div>
          <div className="col-xxl-8 stylePhotos">
            <div className="row">
              {
                styleData.map((item) => {
                  return (
                    <Stylebox
                      reply={item.reply}
                      view={item.view}
                      imgUrl={item.imgUrl}
                      id={item.id}
                      likeNum={item.likeNum}
                      content={item.content}
                      tag={item.tag}
                      hash={item.hash} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Stylebox(props: StyleProps): JSX.Element {
  const tagStyle: React.CSSProperties = { listStyle: "none", display: "flex", flexWrap: "wrap", padding: "0" };

  return (
    <div className="col-xxl-4 col-sm-6 px-3" style={{ transition: "0.5s" }}>
      <div className="imgbox">
        <div className="sharebox text-white">
          <div>
            <i className="fa-regular fa-comment-dots"></i>
            <span>{props.reply}</span>
          </div>
          <div>
            <i className="fa-regular fa-eye"></i>
            <span>{props.view}</span>
          </div>
        </div>
        <img src={props.imgUrl} alt="img"/>
      </div>
      <div className="profilebox">
        <div className="profileTop">
          <div className="idbox">
            <div className="profileImg"> <img src={props.imgUrl} /></div>
            <div className="id">{props.id}</div>
          </div>
          <div className="like">
            <i className="fa-regular fa-face-smile"></i>
            <span className="count">{props.likeNum}</span>
          </div>
        </div>
        <div className="profileMid">
          <p>{props.content}</p>
        </div>
        <div className="profileBottom">
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

export default Style;