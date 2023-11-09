import { useState } from 'react';

interface SearchProps{
  setIsClicked(arg0: boolean): unknown;
  isClicked:boolean;
}


function Search(props:SearchProps):JSX.Element {
  let [text, setText] = useState("");

  return (
    <div className="searchBox">
      <form>
        <input type="search" id="search" placeholder="제목을 입력해주세요" value={text} onChange={(e) => { setText(e.target.value) }}></input>
        <button onClick={(e) => { e.preventDefault(); }}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button onClick={(e) => { props.setIsClicked(!props.isClicked); e.preventDefault(); }}>
          <i className="fa-solid fa-x text-white ms-3"></i>
        </button>
      </form>
    </div>
  )
}

export default Search;