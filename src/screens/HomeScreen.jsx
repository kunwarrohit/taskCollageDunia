import React, { useState, useEffect } from "react";

// Dummy college data
const colleges = [
  {
    name: "College A",
    collegeduniaRating: 4.5,
    fees: 100000,
    userReviewRating: 4,
    featured: true,
  },
  {
    name: "College B",
    collegeduniaRating: 3.8,
    fees: 80000,
    userReviewRating: 3.5,
    featured: false,
  },
  {
    name: "College C",
    collegeduniaRating: 4.2,
    fees: 120000,
    userReviewRating: 4.2,
    featured: true,
  },
  {
    name: "College A",
    collegeduniaRating: 4.5,
    fees: 100000,
    userReviewRating: 4,
    featured: true,
  },
  {
    name: "College B",
    collegeduniaRating: 3.8,
    fees: 80000,
    userReviewRating: 3.5,
    featured: false,
  },
  {
    name: "College C",
    collegeduniaRating: 4.2,
    fees: 120000,
    userReviewRating: 4.2,
    featured: true,
  },
  {
    name: "College A",
    collegeduniaRating: 4.5,
    fees: 100000,
    userReviewRating: 4,
    featured: true,
  },
  {
    name: "College B",
    collegeduniaRating: 3.8,
    fees: 80000,
    userReviewRating: 3.5,
    featured: false,
  },
  {
    name: "College C",
    collegeduniaRating: 4.2,
    fees: 120000,
    userReviewRating: 4.2,
    featured: true,
  },
];

const HomeScreen = () => {
  const [data, setData] = useState(colleges.slice(0, 10)); // Initial 10 rows
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null); // Sort by field
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order (ascending/descending)

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
    setData(colleges.slice(startIndex, endIndex));
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
  const filteredData = data
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
    <div className="grid justify-items-center border border-gray-500 rounded-lg p-2">
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

      <table className="w-full ">
        <thead className="w-full flex justify-center border border-green-500 rounded-lg p-2">
          <tr className="flex justify-center ">
            <th className="bg-blue-400 text-white   p-2 w-[150px] text-left">
              CD Rank
            </th>
            <th className="bg-blue-400 mx-1 text-white p-2 w-[500px] text-left">
              Colleges
            </th>
            <th className="bg-blue-400 mx-1 text-white p-2 w-[150px] text-left">
              Course Fees
            </th>
            <th className="bg-blue-400 mx-1 text-white p-2 w-[150px] text-left">
              Placement
            </th>
            <th className="bg-blue-400 mx-1 text-white p-2 w-[150px] text-left">
              User Reviews
            </th>
            <th className="bg-blue-400 mx-1 text-white p-2 w-[150px] text-left">
              Ranking
            </th>
          </tr>
        </thead>
        <tbody className=" border border-gray-500 p-2">
          {filteredData.map((college) => (
            <tr key={college.name}>
              <td>{college.name}</td>
              <td>{college.collegeduniaRating}</td>
              <td>{college.fees}</td>
              <td>{college.userReviewRating}</td>
              <td>{college.featured ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
