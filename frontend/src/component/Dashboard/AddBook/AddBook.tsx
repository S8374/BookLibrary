import { useForm } from "react-hook-form";
import { useState } from "react";
import type { Book } from "../../../types/BookTypes";
import { useAddBookMutation } from "../../../Redux/features/book/bookSlice";
import BookList from "./BookList";

export default function AddBook() {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imgbbApiKey = "2ece8294123d5086aaf2b522fa269127"; // 🔁 Replace with your key
  const [addBook] = useAddBookMutation();

  const onSubmit = async (data: Book) => {
    try {
      if (!imageFile) {
        alert("Please select an image");
        return;
      }

      // 1. Upload to ImgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgbbData = await imgbbRes.json();
      const imageUrl = imgbbData.data.url;
      console.log(imageUrl);
      // 2. Construct full book object
      const newBook: Book = {
        ...data,
        imageUrl, // image URL from ImgBB
        format: Array.isArray(data.format) ? data.format : [data.format],
        rating: Number(data.rating),
        copies:Number(data.copies),
        price: Number(data.price),
        pages: Number(data.pages),
        year: Number(data.year),
      };

      console.log("📘 Full Book Object to Submit:", newBook);
      alert("Book submitted successfully!");
      // 3. Send to backend
      const response = await addBook(newBook).unwrap();
      console.log("Backend response:", response);

      // Reset form
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (err) {
      console.error("Image upload or submission failed", err);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* === TITLE === */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Design of the 20th Century"
          />
        </div>

        {/* === AUTHOR === */}
        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            {...register("author")}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Carol Foster"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Pages</label>
          <input
            type="number"
            {...register("copies")}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="total copies available"
          />
        </div>
        {/* === DESCRIPTION === */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Book description..."
            rows={4}
          />
        </div>

        {/* === PRICE + RATING === */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="10.99"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Rating (out of 5)</label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              {...register("rating")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="4.00"
            />
          </div>
        </div>

        {/* === PUBLISHER + YEAR === */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Publisher</label>
            <input
              {...register("publisher")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Manager FeedWise"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Year of Publishing</label>
            <input
              type="number"
              {...register("year")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="2016"
            />
          </div>
        </div>

        {/* === CATEGORY === */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select a category</option>
            <option value="Novel">Novel</option>
            <option value="History">History</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Biography">Biography</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Education">Education</option>
            <option value="Self-help">Self-help</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* === PAGES + ISBN === */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Pages</label>
            <input
              type="number"
              {...register("pages")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="360"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">ISBN</label>
            <input
              {...register("isbn")}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="2544555561"
            />
          </div>
        </div>

        {/* === FORMAT === */}
        <div>
          <label className="block font-medium mb-1">Format</label>
          <select
            {...register("format")}
            className="w-full border rounded-lg px-3 py-2"
            multiple
          >
            <option value="Online Book">Online Book</option>
            <option value="Paper Book">Paper Book</option>
          </select>
          <small className="text-gray-500">
            Hold Ctrl/Cmd to select multiple
          </small>
        </div>

        {/* === IMAGE UPLOAD === */}
        <div>
          <label className="block font-medium mb-1">Book Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-40 h-60 object-cover border rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition"
        >
          Submit Book
        </button>
      </form>
      <BookList />
    </div>
  );
}
