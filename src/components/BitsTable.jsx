import { useEffect, useState } from "react";
import service from "../appwrite/service";

function BitsTable() {
  const [bits, setBits] = useState([]);

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const bitResponse = await service.getActiveBits();
        // Add remaining time field to each bit
        const updatedBits = bitResponse.documents.map((bit) => ({
          ...bit,
          remainingTime: calculateRemainingTime(bit.end_time), // Assuming `end_time` exists
        }));
        setBits(updatedBits);
      } catch (error) {
        console.error("Error fetching bits:", error);
        setBits([]);
      }
    }

    fetchData();

    // Update remaining time every second
    const intervalId = setInterval(() => {
      setBits((prevBits) =>
        prevBits.map((bit) => ({
          ...bit,
          remainingTime: calculateRemainingTime(bit.end_time),
        }))
      );
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seller Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remaining Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Bit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(bits) && bits.length > 0 ? (
            bits.map((bit) => (
              <tr key={bit.id}>
                <td className="px-6 py-4 whitespace-nowrap">{bit.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bit.seller_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bit.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bit.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {bit.remainingTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{bit.current_bit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                    Edit
                  </button>
                  <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center">
                No bits available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BitsTable;
