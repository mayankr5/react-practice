import React from 'react';
import Accordian from './components/accordian/index'
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';
import ImageSlider from './components/image-slider';

const imageSliderProps = {
  url: "https://picsum.photos/v2/list",
  limit: 5,
  page: 1
}

function App() {
  return (
    <>
      {/* <Accordian /> */}
      {/* <RandomColor /> */}
      {/* <StarRating /> */}
      <ImageSlider url={imageSliderProps.url} limit={imageSliderProps.limit} page={imageSliderProps.page}/>
    </>
  )
}

export default App
