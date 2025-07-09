import Level from "../../component/Global/Levle";
import TextDiscount from "../../component/OptionalTems/TextDiscount/TextDiscount";

export default function WishList() {
  return (
    <>
      <Level
        text="Wishlist"
        navItems={[
          { label: "Home", path: "/" },
          { label: "Wishlist", path: "/wishlist" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-3.5">
          Your Wishlist
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-[#DE3241] focus:ring-[#DE3241] border-gray-300 rounded"
                      />
                    </label>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Product Row 1 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-[#DE3241] focus:ring-[#DE3241] border-gray-300 rounded"
                      />
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-full w-full object-cover rounded-md"
                          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                          alt="Book cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          The Great Gatsby
                        </div>
                        <div className="text-sm text-gray-500">
                          F. Scott Fitzgerald
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      $12.99
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#DE3241] hover:text-[#C12A38] mr-4">
                      Remove
                    </button>
                    <button className="bg-[#DE3241] hover:bg-[#C12A38] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </td>
                </tr>

                {/* Product Row 2 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-[#DE3241] focus:ring-[#DE3241] border-gray-300 rounded"
                      />
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-full w-full object-cover rounded-md"
                          src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                          alt="Book cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          To Kill a Mockingbird
                        </div>
                        <div className="text-sm text-gray-500">Harper Lee</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      $10.50
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#DE3241] hover:text-[#C12A38] mr-4">
                      Remove
                    </button>
                    <button className="bg-[#DE3241] hover:bg-[#C12A38] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </td>
                </tr>

                {/* Product Row 3 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-[#DE3241] focus:ring-[#DE3241] border-gray-300 rounded"
                      />
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-20">
                        <img
                          className="h-full w-full object-cover rounded-md"
                          src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                          alt="Book cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          1984
                        </div>
                        <div className="text-sm text-gray-500">
                          George Orwell
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      $9.99
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      $12.99
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Low Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#DE3241] hover:text-[#C12A38] mr-4">
                      Remove
                    </button>
                    <button className="bg-[#DE3241] hover:bg-[#C12A38] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#DE3241] focus:border-[#DE3241]">
                <option>Select an action</option>
                <option>Add selected to cart</option>
                <option>Remove selected</option>
              </select>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Apply Action
              </button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="bg-[#DE3241] hover:bg-[#C12A38] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Add Selected to Cart
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                Add All to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <TextDiscount />
      </div>
    </>
  );
}
