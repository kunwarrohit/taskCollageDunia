import React, { useState, useEffect } from "react";
import tableUtils from "../lib/tableData.json";
import collegeData from "../lib/collageDetails.json";
// Dummy college data
const colleges = collegeData;

const HomeScreen = () => {
  const [data, setData] = useState(colleges.collegeDetails.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {
        // Load more data if scrolled near the bottom
        setCurrentPage(currentPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // Load more data for infinite scroll
  useEffect(() => {
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    setData(colleges.collegeDetails.slice(startIndex, endIndex));
  }, [currentPage]);

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sort functionality
  const handleSort = (field) => {
    // Toggle sort order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortBy(field);
  };

  // Filter and sort data
  const filteredData = colleges.collegeDetails
    .filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === null) {
        return 0; // No sorting
      }
      if (sortOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  return (
    <div className="grid justify-items-center  rounded-lg p-2">
      <div className=" my-5 ">
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleSearch}
          className="hover:bg-gray-500 hover:text-white mx-5 border-2 border-gray-500 rounded-lg p-2"
        />
        <button
          className="hover:bg-gray-500 hover:text-white mx-5 border-2 border-gray-500 rounded-lg p-2"
          onClick={() => handleSort("collegeduniaRating")}
        >
          Sort by Collegedunia Rating
        </button>
        <button
          className="hover:bg-gray-500 hover:text-white mx-5 border-2 border-gray-500 rounded-lg p-2"
          onClick={() => handleSort("fees")}
        >
          Sort by Fees
        </button>
        <button
          className="hover:bg-gray-500 hover:text-white mx-5 border-2 border-gray-500 rounded-lg p-2"
          onClick={() => handleSort("userReviewRating")}
        >
          Sort by User Review Rating
        </button>
      </div>

      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className="">
            {tableUtils.tableHeaders.map((item) => (
              <th className="p-4 text-center border-b border-blue-gray-100 bg-blue-400  ">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((collegeDetail) => (
            <tr className="hover:bg-orange-200">
              {Object.keys(collegeDetail).map((detail) => {
                if (detail === "featured")
                  return (
                    <td className="p-4 text-center border-b border-blue-gray-50">
                      {collegeDetail[detail]}
                      <button className="hover:bg-gray-500 hover:text-white hover:border border-gray-500 rounded-lg text-orange-500 p-2">
                        Apply Now
                      </button>
                      <button className="hover:bg-gray-500 hover:text-white hover:border border-gray-500 rounded-lg text-green-500 p-2">
                        Download Brochure
                      </button>
                    </td>
                  );
                return (
                  <td className="p-4 text-center border-b border-blue-gray-50">
                    {collegeDetail[detail]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
