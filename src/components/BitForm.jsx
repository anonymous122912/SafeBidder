import React, { useEffect, useState } from "react";
import authservice from "../appwrite/auth";
import { Upload } from "lucide-react";
import service from "../appwrite/service";
import { useNavigate } from "react-router";


function BitForm() {

  const navigate = useNavigate();

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    seller_name: "",
    seller_id: "",
    location: "",
    category: "",
    start_date: getCurrentDate(),
    end_date: "",
    initial_bit: 0,
    file_upload: null,
    description: "",
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await authservice.getCurrentUser();
        // console.log(user)
        setFormData((prevValues) => ({
          ...prevValues,
          seller_name: user.name,
          seller_id: user.$id,
        }));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    }

    fetchCurrentUser();
  }, []);


  const calculateOffsetDate = (date, offset) => {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + offset);
    return adjustedDate.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);

    const file = await service.uploadFile(formData.file_upload);

    const response = await service.createBid({
      product_name: formData.name,
      product_image: file.$id,
      seller_id: formData.seller_id,
      seller_name: formData.seller_name,
      location: formData.location,
      start_time: formData.start_date,
      end_time: formData.end_date,
      description: formData.description,
      category: formData.category,
      initial_bit: parseInt(formData.initial_bit, 10),
    });

    console.log(response)

    if(response) {
      navigate(`/bit/${response.$id}`);
    }

  };

  return (
    <>
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400 text-black">
          Give the Bit Details
        </h1>
      </div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                for="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="seller_name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Seller Name
                  </label>
                  <input
                    type="text"
                    name="seller_name"
                    id="seller_name"
                    value={formData.seller_name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    disabled
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="seller_id"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Seller Id
                  </label>
                  <input
                    type="text"
                    name="seller_id"
                    id="seller_id"
                    value={formData.seller_id}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                for="location"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                for="category"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="category"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="start_date"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    disabled
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="end_date"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={formData.end_date}
                    min={calculateOffsetDate(formData.start_date, 1)}
                    max={calculateOffsetDate(formData.start_date, 7)} 
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                for="initial_bit"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Initial Bit Amount
              </label>
              <input
                type="number"
                name="initial_bit"
                id="initial_bit"
                value={formData.initial_bit}
                onChange={handleChange}
                min={100}
                max={10000}
                placeholder="initial bit"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Product Image
              </label>
              <div class="flex-1 items-center max-w-screen-sm mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <div className="items-center justify-center max-w-xl mx-auto">
                    <label
                      className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                      id="drop"
                    >
                      <span className="flex items-center space-x-2">
                      <Upload />
                        <span className="font-medium text-gray-600">
                          Drop files to Attach, or
                          <span className="text-blue-600 underline ml-[4px]">
                            browse
                          </span>
                        </span>
                      </span>
                      <input
                        type="file"
                        name="file_upload"
                        className="hidden"
                        accept="image/png,image/jpeg"
                        id="input"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Product Description
              </label>
              <textarea
                rows="10"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                placeholder="Enter the description..."
              ></textarea>
            </div>

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Create Bit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BitForm;
