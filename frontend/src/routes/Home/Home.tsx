import BooksChoose from "../../component/BooksChoose/BooksChoose";
import Baner from "../../component/OptionalTems/Baner/Baner";
import ReadDowns from "../../component/OptionalTems/ReadDowns/ReadDowns";
import TestimonialSlider from "../../component/OptionalTems/Testimonal/Testimonal";
import PickByReaders from "../../component/PickByReaders/PickByReaders";
import { useAuth } from "../../component/Provider/authProvider";
import BookDiscover from "../../layout/Home/BookDiscover/BookDiscover";
import Slider from "../../layout/Home/Slider/Slider";
export default function Home() {
  const { currentUser } = useAuth();
  console.log("current user", currentUser);
  return (
    <div>
      <div className="">
        {/* <TopHeader />
        <Navbar /> */}
        <Slider />
        <h1 className="text-center text-3xl md:text-5xl lg:text-6xl font-bold mt-20 text-black mb-6 leading-tight">Discover Your Next Book</h1>
        <BookDiscover />
   
          <Baner />
      
        <BooksChoose />
        <ReadDowns />
        <PickByReaders />
       <div className="">
         <TestimonialSlider />
       </div>
      </div>
    </div>
  );
}
