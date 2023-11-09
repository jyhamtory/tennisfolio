import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// clicked -> BestPick, Hot에서 설정함

export interface ProductProps{
  i:number;
  new?:boolean;
  imgUrl:string;
  shop:string;
  product:string;
  dc:string;
  per:string;
  price:string;
  nodc:string;
  clicked:string;
}

function Products(props:ProductProps):JSX.Element {
  let navigate = useNavigate();
  let now = navigate("/");


  // URL 주소 
  function MultiPage() {
    switch (props.clicked) {
      case "hot":
        return (
          now = navigate("/detail/hot/" + props.i)
        )
      case "bag":
        return (
          now = navigate("/detail/best/bag/" + props.i)
        )
      case "item":
        return (
          now = navigate("/detail/best/item/" + props.i)
        )
      case "racquet":
        return (
          now = navigate("/detail/best/racquet/" + props.i)
        )
      case "woman":
        return (
          now = navigate("/detail/best/woman/" + props.i)
        )
      case "man":
        return (
          now = navigate("/detail/best/man/" + props.i)
        )
      case "acc":
        return (
          now = navigate("/detail/best/acc/" + props.i)
        )
      case "shoes":
        return (
          now = navigate("/detail/best/shoes/" + props.i)
        )
      default:
        break
    }
  }

  return (
    <div className="col">
      <Nav.Link onClick={() => { MultiPage() }}>
        <div className="boxWrap">
          <div className="imgbox">
            {
              props.new ? <div><span className="new">New</span></div> : null
            }
            <img src={props.imgUrl} alt="img"/>
          </div>
          <div className="textbox" style={{ textAlign: "left" }}>
            <p className="shop">{props.shop}</p>
            <p className="product ">{props.product}</p>
            <div className="priceBox">
              {
                props.dc.length !== 0 ? <span className="dc">{props.dc}</span> : null
              }
              {
                props.per.length !== 0 ? <span className="per">{props.per}</span> : null
              }
              <span className="price">{props.price}</span>
              {
                props.nodc.length !== 0 ? <span className="nodc">{props.nodc}</span> : null
              }
            </div>
          </div>
        </div>
      </Nav.Link>
    </div>
  )
}

export default Products;