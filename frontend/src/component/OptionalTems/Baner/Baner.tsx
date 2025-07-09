import { FiSend } from "react-icons/fi";

export default function Baner() {
  return (
    <div className="mt-10">
      <section className="bg-[#DE3241] dark:bg-gray-900 lg:h-[400px] grid place-items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center py-16 sm:py-24">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Stay in Touch with Our Updates
          </h1>

          <p className="text-white text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Subscribe to our newsletter to get the latest updates, promotions, and news delivered straight to your inbox.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 rounded-md border border-white  focus:outline-none    placeholder-white text-black"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3  hover:bg-transparent hover:text-black hover:border hover:border-black transition-all duration-300"
            >
              <FiSend className="text-lg" />
              Get In Touch
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
