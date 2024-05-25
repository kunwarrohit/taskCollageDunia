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
    <div>
      <h1>Colleges</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleSearch}
        />
        <button onClick={() => handleSort("collegeduniaRating")}>
          Sort by Collegedunia Rating
        </button>
        <button onClick={() => handleSort("fees")}>Sort by Fees</button>
        <button onClick={() => handleSort("userReviewRating")}>
          Sort by User Review Rating
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Collegedunia Rating</th>
            <th>Fees</th>
            <th>User Review Rating</th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
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
