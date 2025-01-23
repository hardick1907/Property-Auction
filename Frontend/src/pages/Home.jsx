import Slider from '../components/Hero/HeaderSlider'
import Search from '../components/Hero/Search'
import Cards from '../components/Hero/Cards'
import Upcoming from '../components/Hero/Upcoming'
import HeaderSlider from '../components/Hero/HeaderSlider'
import Reviews from '../components/Hero/Reviews'
import Learn from '../components/Hero/Learn'

const Home = () => {
  return (
    <>
      <HeaderSlider/>
      <Search/>
      <Cards/>
      <Upcoming/>
      <Reviews/>
      <Learn/>
    </>
  )
}

export default Home