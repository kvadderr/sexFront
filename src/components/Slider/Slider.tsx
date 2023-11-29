import ImageSlider from "react-image-comparison-slider";
import { nude_1, nude_2 } from "../../assets/images";
const Slider = () => {
  return (
    <div style={{ width: 315, height: 465 }} >
      <ImageSlider
        image1={nude_1}
        image2={nude_2}
        animate
        sliderColor="#4CFF7F"
        showHandle={false}
        animationCycleDuration={5000} />
    </div>
  )
}

export default Slider;