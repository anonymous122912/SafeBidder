import { useParams } from "react-router";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import service from "../appwrite/service";

function BitDetails() {
  const { bitid } = useParams();
  const [product, setProduct] = useState({});
  const [fileURL, setFileURL] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await service.getBit(bitid);
      const fileRes = service.getFilePreview(res.product_image);
      setProduct(res);
      setFileURL(fileRes);
      calculateRemainingTime(res.end_time);
    }

    fetchData();

    // Update remaining time every second
    const interval = setInterval(() => {
      if (product.end_time) {
        calculateRemainingTime(product.end_time);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bitid, product.end_time]);

  function calculateRemainingTime(endTime) {
    const now = new Date();
    const end = new Date(endTime);

    if (now < end) {
      const timeDiff = end - now;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setRemainingTime("Auction Ended");
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">
              {product.product_name}
            </h1>

            <img
              className="max-w-sm mx-auto my-4 rounded-lg mb-4 shadow-md"
              src={fileURL}
              alt="product_image"
            />
            <h2 className="text-2xl font-semibold mb-2">Product Details</h2>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">Name: {product.product_name}</li>
              <li className="mb-2">Seller Name: {product.seller_name}</li>
              <li className="mb-2">Seller Id: {product.seller_id}</li>
              <li className="mb-2">Category: {product.category}</li>
              <li className="mb-2">Location: {product.location}</li>
              <li className="mb-2">Current Bit: {product.current_bit}</li>
              <li className="mb-2">Description: {product.description}</li>
              <li className="mb-2">Remaining Time: {remainingTime}</li>
            </ul>

            <div className="text-center">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                Bit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BitDetails;
