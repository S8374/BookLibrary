import Level from "../../component/Global/Levle";
import  TextDiscount from "../../component/OptionalTems/TextDiscount/TextDiscount";
export default function Cart() {
  return (
    <div className="font-sans text-gray-800">
      <Level
        text="Cart"
        navItems={[
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
        ]}
      />

      {/* Progress Steps */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center items-center gap-4 md:gap-8">
            <li className="flex items-center gap-2">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#DE3241] text-white flex items-center justify-center font-semibold">
                1
              </span>
              <span className="text-sm md:text-base font-medium text-gray-700">
                Shopping Cart
              </span>
            </li>

            <li className="flex items-center gap-2">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                2
              </span>
              <span className="text-sm md:text-base text-gray-500">
                Payment & Delivery Options
              </span>
            </li>

            <li className="flex items-center gap-2">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                3
              </span>
              <span className="text-sm md:text-base text-gray-500">
                Order Received
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Table */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Product 1 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-full w-full object-cover rounded"
                              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                              alt="Product"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              The Great Novel
                            </div>
                            <div className="text-sm text-gray-500">
                              Author: John Doe
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $24.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border border-gray-300 rounded-md w-24">
                          <button className="px-2 py-1 text-gray-600 hover:text-[#DE3241]">
                            -
                          </button>
                          <span className="px-2 py-1 text-center flex-grow">
                            1
                          </span>
                          <button className="px-2 py-1 text-gray-600 hover:text-[#DE3241]">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        $24.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#DE3241] hover:text-[#C12A38]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {/* Product 2 */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-full w-full object-cover rounded"
                              src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                              alt="Product"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Poetry Collection
                            </div>
                            <div className="text-sm text-gray-500">
                              Author: Jane Smith
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $18.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border border-gray-300 rounded-md w-24">
                          <button className="px-2 py-1 text-gray-600 hover:text-[#DE3241]">
                            -
                          </button>
                          <span className="px-2 py-1 text-center flex-grow">
                            1
                          </span>
                          <button className="px-2 py-1 text-gray-600 hover:text-[#DE3241]">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        $18.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#DE3241] hover:text-[#C12A38]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Coupon and Action Buttons */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200">
                <div className="w-full md:w-auto mb-4 md:mb-0">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#DE3241] focus:border-[#DE3241] flex-grow"
                    />
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                      Apply Coupon
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                    Continue Shopping
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                    Update Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b">
                Cart Totals
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$42.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">$42.99</span>
                </div>
              </div>

              <button className="w-full bg-[#DE3241] hover:bg-[#C12A38] text-white py-3 font-bold rounded transition-colors">
                Proceed to Checkout
              </button>

              <div className="mt-4 text-sm text-center text-gray-500">
                <p>
                  or{" "}
                  <a href="#" className="text-[#DE3241] hover:underline">
                    continue shopping
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TextDiscount />
    </div>
  );
}
