import React, { useState } from "react";

export default function HomePageImg({
  imgPath,
  instaList,
  whiteHeading,
  mainHeading,
}) {
  let [imageLoaded, setImageLoaded] = useState(false);

  function imgLoaded() {
    setImageLoaded(true);
  }

  return (
    <section
      className={`home-page-section ${imageLoaded ? "" : "home-page-gears"}`}
    >
      <p className="home-page-text">
        <span>{whiteHeading}</span> {mainHeading}
      </p>

      {instaList && (
        <div className="home-page-insta">
          {instaList.map((el) => {
            return (
              <a 
              className={imageLoaded ? "" : "hide-absoluts"}
              
              key={el} href="https://www.instagram.com">
                {el}
              </a>
            );
          })}
        </div>
      )}

      <img
        onLoad={imgLoaded}
        className={`home-page-img img-${imageLoaded ? "visible" : "hidden"}`}
        src={imgPath}
        alt="family-logo"
      />
    </section>
  );
}
