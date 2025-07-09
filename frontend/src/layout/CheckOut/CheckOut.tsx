import { useState } from "react";
import Level from "../../component/Global/Levle";
import TextDiscount from "../../component/OptionalTems/TextDiscount/TextDiscount";
export default function CheckOut() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  return (
    <div className="font-sans">
      <Level
      text="Checkout"
        navItems={[
          { label: "Home", path: "/" },
          { label: "Checkout", path: "/checkout" },
        ]}
      />

      {/* Checkout Progress */}
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
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#DE3241] text-white flex items-center justify-center font-semibold">
                2
              </span>
              <span className="text-sm md:text-base font-medium text-gray-700">
                Checkout
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

      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-12">Checkout</h1>

        <div className="max-w-6xl mx-auto">
          {/* Login and Coupon Notices */}
          <div className="mb-8 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-gray-700">
                Returning customer?{" "}
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="text-[#DE3241] hover:underline font-medium"
                >
                  Click here to login
                </button>
              </p>
              {showLogin && (
                <div className="mt-4 flex flex-wrap gap-4">
                  <input
                    type="text"
                    placeholder="Username or email"
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241] flex-grow min-w-[200px]"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241] flex-grow min-w-[200px]"
                  />
                  <button className="bg-[#DE3241] text-white px-6 py-3 rounded hover:bg-[#C12A38] transition">
                    Login
                  </button>
                </div>
              )}
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-gray-700">
                Have a coupon?{" "}
                <button
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="text-[#DE3241] hover:underline font-medium"
                >
                  Click here to enter your code
                </button>
              </p>
              {showCoupon && (
                <div className="mt-4 flex gap-4">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241] flex-grow"
                  />
                  <button className="bg-[#DE3241] text-white px-6 py-3 rounded hover:bg-[#C12A38] transition">
                    Apply Coupon
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Billing Details - Left Column */}
            <div className="lg:w-7/12">
              <div className="bg-white p-8 rounded shadow-sm">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">
                  Billing Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Company Name (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Country / Region *
                  </label>
                  <select className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241] bg-white">
                    <option>United States (US)</option>
                    <option>United Kingdom (UK)</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    placeholder="House number and street name"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241] mb-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Postcode / ZIP *
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241]"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-700">Create an account?</span>
                  </label>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-3">
                    Additional Information
                  </h4>
                  <label className="block text-gray-700 mb-2">
                    Order Notes (optional)
                  </label>
                  <textarea
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-1 focus:ring-[#DE3241] h-24"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="lg:w-5/12">
              <div className="bg-white p-8 rounded shadow-sm sticky top-4">
                <h3 className="text-xl font-bold mb-6 pb-2 border-b">
                  Your Order
                </h3>

                <div className="mb-6">
                  <div className="flex justify-between font-bold text-gray-800 pb-2 border-b">
                    <span>Product</span>
                    <span>Total</span>
                  </div>

                  <div className="py-4 border-b">
                    <div className="flex justify-between text-gray-700 mb-2">
                      <span>"The Great Novel" × 1</span>
                      <span>$24.99</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>"Poetry Collection" × 1</span>
                      <span>$18.00</span>
                    </div>
                  </div>

                  <div className="py-4 border-b">
                    <div className="flex justify-between text-gray-700 mb-2">
                      <span>Subtotal</span>
                      <span>$42.99</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>Free Shipping</span>
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$42.99</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Payment Method</h4>

                  <div className="space-y-3">
                    <div
                      className={`p-4 border rounded cursor-pointer ${
                        paymentMethod === "bank"
                          ? "border-[#DE3241] bg-red-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                          className="h-4 w-4 text-[#DE3241] focus:ring-[#DE3241]"
                        />
                        <span className="font-medium">
                          Direct Bank Transfer
                        </span>
                      </label>
                      {paymentMethod === "bank" && (
                        <p className="mt-2 text-gray-600 text-sm">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                        </p>
                      )}
                    </div>

                    <div
                      className={`p-4 border rounded cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-[#DE3241] bg-red-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                          className="h-4 w-4 text-[#DE3241] focus:ring-[#DE3241]"
                        />
                        <span className="font-medium">Cash On Delivery</span>
                      </label>
                      {paymentMethod === "cash" && (
                        <p className="mt-2 text-gray-600 text-sm">
                          Pay with cash upon delivery.
                        </p>
                      )}
                    </div>

                    <div
                      className={`p-4 border rounded cursor-pointer ${
                        paymentMethod === "paypal"
                          ? "border-[#DE3241] bg-red-50"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="h-4 w-4 text-[#DE3241] focus:ring-[#DE3241]"
                        />
                        <span className="font-medium">PayPal</span>
                      </label>
                      {paymentMethod === "paypal" && (
                        <p className="mt-2 text-gray-600 text-sm">
                          Pay via PayPal; you can pay with your credit card if
                          you don't have a PayPal account.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-6">
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a href="#" className="text-[#DE3241] hover:underline">
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                <button className="w-full bg-[#DE3241] text-white py-4 font-bold rounded hover:bg-[#C12A38] transition">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TextDiscount />
    </div>
  );
}
