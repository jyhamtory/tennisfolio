import { useState } from 'react';
import productHot from '../data/productHot';
import Products from './Products';

function Hot(): JSX.Element {
  let [tennisHot] = useState(productHot);
  let [clicked] = useState("hot");
  return (
    <div className="container hotItems" style={{ margin: "150px auto 150px", maxWidth: "1600px" }}>
      <h3 style={{ fontWeight: "700" }}>요즘 핫해요</h3>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xxl-4">
        {
          tennisHot.map((item, index) => {
            return (
              <Products
                clicked = {clicked}
                i = {index}
                new={item.new}
                imgUrl={item.imgUrl}
                shop={item.shop}
                product={item.product}
                dc={item.dc}
                per={item.per}
                price={item.price}
                nodc={item.nodc}></Products>
            )
          })
        }
      </div>
    </div>
  )
}

export default Hot;