import React, { useState } from 'react';
import Accordian from './components/accordian/index'
import RandomColor from './components/random-color';
import StarRating from './components/star-rating';
import ImageSlider from './components/image-slider';
import LoadMore from './components/load-more';
import TreeView from './components/tree-view';
import QRCodeGenerator from './components/qr-code-generator';
import ThemeChange from './components/theme-change';
import ScrollIndicator from './components/scroll-indicator';
import Modal from './components/modal-popup';
import GithubProfile from './components/github-profile';

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
  
  const [showPopup, setShowPopup] = useState<boolean>(false);
 
  const handlePopup = () => {
    setShowPopup(!showPopup);
  }

  function onClose() {
    setShowPopup(false);
  }

  return (
    <>
      {/* <Accordian /> */}
      {/* <RandomColor /> */}
      {/* <StarRating /> */}
      {/* <ImageSlider url={imageSliderProps.url} limit={imageSliderProps.limit} page={imageSliderProps.page}/> */}
      {/* <LoadMore url={loadMoreProps.url} limit={loadMoreProps.limit} /> */}
      {/* <TreeView /> */}
      {/* <QRCodeGenerator /> */}
      {/* <ThemeChange /> */}
      {/* <ScrollIndicator url={'https://dummyjson.com/products?limit=100'} /> */}
      {/* <button onClick={handlePopup}>Toggle Popup Modal</button>
      {showPopup && <Modal onClose={onClose}/> } */}

      <GithubProfile />
    </>
  )
}

export default App
