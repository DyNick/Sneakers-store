import React, { Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Cards from "../Components/Cards/Cards";

function Home() {
  return (
    <Fragment>
      <Carousel
        autoPlay={true}
        interval={2000}
        showThumbs={false}
        infiniteLoop={true}
        showStatus={false}
        dynamicHeight={true}
      >
        <div>
          <img src="https://sneakerstudio.com.ua/data/include/img/links/1629380348_rwd_desktop.jpg" />
        </div>
        <div>
          <img src="https://sneakerstudio.com.ua/data/include/img/links/1626854592_rwd_desktop.jpg" />
        </div>
        <div>
          <img src="https://sneakerstudio.com.ua/data/include/img/links/1629451101_rwd_desktop.jpg" />
        </div>
      </Carousel>
      <Cards />
    </Fragment>
  );
}

export default Home;
