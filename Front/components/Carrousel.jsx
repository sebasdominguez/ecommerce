import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import carrousel1 from "./assets/carrousel1.png"
import carrousel2 from "./assets/carrousel2.png"
import carrousel3 from "./assets/carrousel3.png"
import carrousel4 from "./assets/carrousel4.png"

export default function Example(props) {
  var items = [
    {
      name: "Random Name #1",
      Image: carrousel1,
    },
    {
      name: "Random Name #2",
      Image: carrousel2,
    },
    {
      name: "Random Name #3",
      Image: carrousel3,
    },
    {
      name: "Random Name #4",
      Image: carrousel4,
    },
  ];

  return (
    <div id="carousel">
      <Carousel>
        {items.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </Carousel>
    </div>
  );
}

function Item({ item }) {
  return (
   <div>
      <img src={item.Image} height="80%" width="100%" />
    </div>
  );
}
