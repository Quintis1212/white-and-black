import React from "react";
import HomePageImg from "../components/HomePageImg";

export default function HomePage() {
  return (
    <main className="home-page">
      <HomePageImg
        imgPath={require("../img/home-page-img.jpg")}
        whiteHeading={"CLOTHES"}
        mainHeading={"FOR EVERYONE"}
      />

      <HomePageImg
        imgPath={require("../img/home-page-insta-img.jpg")}
        whiteHeading={"OUR CLOTHES IN SOCIAL MEDIA"}
        instaList={[
          "@yuiliaQ",
          "@TuiliaQ",
          "@MuiliaQ",
          "@Pia",
          "@slivOchka",
          "@klubnichka",
        ]}
      />
    </main>
  );
}
