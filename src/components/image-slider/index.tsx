import { useEffect, useState } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import "./styles.css";

interface ImageData {
  id: string;
  author?: string;
  download_url: string;
  url?: string;
}

interface ImageSliderProps {
  url: string;
  limit?: number;
  page?: number;
}

const ImageSlider = ({
  url,
  limit = 5,
  page = 1,
}: ImageSliderProps) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchImages(getUrl: string) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data: ImageData[] = await response.json();

      if (data && data.length > 0) {
        setImages(data);
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }finally {
        setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url, limit, page]);

  if (loading) {
    return <div>Loading data! Please wait...</div>;
  }

  if (errorMsg) {
    return <div>Error occurred! {errorMsg}</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images.length > 0 &&
        images.map((imageItem, index) => (
          <img
            key={imageItem.id}
            alt={imageItem.author || "Slide Image"}
            src={imageItem.download_url}
            className={
              currentSlide === index
                ? "current-image"
                : "current-image hide-current-image"
            }
          />
        ))}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={
              currentSlide === index
                ? "current-indicator"
                : "current-indicator inactive-indicator"
            }
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </span>
    </div>
  );
}

export default ImageSlider
