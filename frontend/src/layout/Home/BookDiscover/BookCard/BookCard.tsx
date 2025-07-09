import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function BookCard() {
  return (
    <div>
      <div className="card bg-base-100 w-48  shadow-sm  rounded-none">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className=" h-60 w-full object-cover transition duration-500 hover:scale-105"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">A Doctor in the House</h2>
          <h2>Candy Carson</h2>
          <Rating
            initialRating={4}
            emptySymbol={<FaRegStar className="text-blue-400" />}
            fullSymbol={<FaStar className="text-blue-600" />}
            onChange={(rate) => console.log("New Rating:", rate)}
          />
          <p>Price : 18$</p>
        </div>
      </div>
    </div>
  );
}
