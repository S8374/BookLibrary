import { useEffect, useState } from "react";

const DiscountBanner = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "on order over $299.00";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          currentIndex = 0;
          setAnimatedText("");
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#DE3241] py-10 h-[200px] flex items-center justify-center px-20 text-white">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text container */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
              Get -30% purchase{" "}
              <span className="inline-block min-w-[180px] sm:min-w-[200px] text-left text-yellow-300">
                {animatedText}
                <span className="inline-block w-1 h-6 bg-white ml-1 animate-pulse"></span>
              </span>
            </h1>
          </div>

          {/* Button */}
          <button className="bg-black text-white py-4 px-10 text-sm sm:text-base transition-all duration-300 ease-in-out hover:bg-transparent hover:text-black hover:border hover:border-black">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
