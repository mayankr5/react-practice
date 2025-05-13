import React from 'react';
import Accordian from './components/accordian/index'
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';
import ImageSlider from './components/image-slider';
import LoadMore from './components/load-more';
import TreeView from './components/tree-view';
import QRCodeGenerator from './components/qr-code-generator';

const imageSliderProps = {
  url: "https://picsum.photos/v2/list",
  limit: 5,
  page: 1
}

const loadMoreProps = {
  url: "https://dummyjson.com/products",
  limit: 20
}

function App() {
  return (
    <>
      {/* <Accordian /> */}
      {/* <RandomColor /> */}
      {/* <StarRating /> */}
      {/* <ImageSlider url={imageSliderProps.url} limit={imageSliderProps.limit} page={imageSliderProps.page}/> */}
      {/* <LoadMore url={loadMoreProps.url} limit={loadMoreProps.limit} /> */}
      {/* <TreeView /> */}
      <QRCodeGenerator />
    </>
  )
}

export default App
