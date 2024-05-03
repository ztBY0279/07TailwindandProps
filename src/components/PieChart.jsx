import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { Pie } from 'react-chartjs-2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'China'];

export default function CustomizedTables() {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch data from server
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => setData(data.countries))
      .catch(error => console.error(error));
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setPage(1); // Reset page number when country changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getChartData = () => {
    const universities = data.find(country => country.countryName === selectedCountry)?.universities || [];
    const stateCounts = universities.reduce((acc, cur) => {
      acc[cur.state] = (acc[cur.state] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(stateCounts),
      datasets: [
        {
          label: 'State Distribution',
          data: Object.values(stateCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div>
      <Select style={{ margin: '20px', width: '200px' }} value={selectedCountry} onChange={handleCountryChange}>
        {countries.map((country) => (
          <MenuItem key={country} value={country} >
            {country}
          </MenuItem>
        ))}
      </Select>
      <Pie data={getChartData()} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr. No.</StyledTableCell>
              <StyledTableCell align="center">University name</StyledTableCell>
              <StyledTableCell align="center">Website</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
              <StyledTableCell align="center">Country</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.find(country => country.countryName === selectedCountry)?.universities || [])
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.universityId}>
                  <StyledTableCell component="th" scope="row">{(page - 1) * itemsPerPage + index + 1}</StyledTableCell>
                  <StyledTableCell align="center">{row.universityName}</StyledTableCell>
                  <StyledTableCell align="center"><a href='#' style={{ color: "blue" }}>{row.website}</a></StyledTableCell>
                  <StyledTableCell align="center">{row.state}</StyledTableCell>
                  <StyledTableCell align="center">{selectedCountry}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil((data.find(country => country.countryName === selectedCountry)?.universities || []).length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}



// import { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Pagination from '@mui/material/Pagination';
// import { Pie } from 'react-chartjs-2';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'China'];

// export default function CustomizedTables() {
//   const [selectedCountry, setSelectedCountry] = useState('India');
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     // Fetch data from server
//     fetch('http://localhost:3000/data')
//       .then(response => response.json())
//       .then(data => setData(data.countries))
//       .catch(error => console.error(error));
//   }, []);

//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//     setPage(1); // Reset page number when country changes
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const getChartData = () => {
//     const universities = data.find(country => country.countryName === selectedCountry)?.universities || [];
//     const stateCounts = universities.reduce((acc, cur) => {
//       acc[cur.state] = (acc[cur.state] || 0) + 1;
//       return acc;
//     }, {});
//     return {
//       labels: Object.keys(stateCounts),
//       datasets: [
//         {
//           label: 'State Distribution',
//           data: Object.values(stateCounts),
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.6)',
//             'rgba(54, 162, 235, 0.6)',
//             'rgba(255, 206, 86, 0.6)',
//             'rgba(75, 192, 192, 0.6)',
//             'rgba(153, 102, 255, 0.6)',
//             'rgba(255, 159, 64, 0.6)',
//           ],
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div>
//       <Select style={{ margin: '20px', width: '200px' }} value={selectedCountry} onChange={handleCountryChange}>
//         {countries.map((country) => (
//           <MenuItem key={country} value={country} >
//             {country}
//           </MenuItem>
//         ))}
//       </Select>
//       <Pie data={getChartData()} />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Sr. No.</StyledTableCell>
//               <StyledTableCell align="center">University name</StyledTableCell>
//               <StyledTableCell align="center">Website</StyledTableCell>
//               <StyledTableCell align="center">State</StyledTableCell>
//               <StyledTableCell align="center">Country</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(data.find(country => country.countryName === selectedCountry)?.universities || [])
//               .slice((page - 1) * itemsPerPage, page * itemsPerPage)
//               .map((row, index) => (
//                 <StyledTableRow key={row.universityId}>
//                   <StyledTableCell component="th" scope="row">{(page - 1) * itemsPerPage + index + 1}</StyledTableCell>
//                   <StyledTableCell align="center">{row.universityName}</StyledTableCell>
//                   <StyledTableCell align="center"><a href='#' style={{ color: "blue" }}>{row.website}</a></StyledTableCell>
//                   <StyledTableCell align="center">{row.state}</StyledTableCell>
//                   <StyledTableCell align="center">{selectedCountry}</StyledTableCell>
//                 </StyledTableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination
//         count={Math.ceil((data.find(country => country.countryName === selectedCountry)?.universities || []).length / itemsPerPage)}
//         page={page}
//         onChange={handleChangePage}
//         style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
//       />
//     </div>
//   );
// }


// import {useState, useEffect} from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import ReactPaginate from 'react-paginate';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// // function createData(name, calories, fat, carbs, protein) {
// //   return { name, calories, fat, carbs, protein };
// // }

// const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'China'];

// export default function CustomizedTablesPiChart() {
//   const [selectedCountry, setSelectedCountry] = useState('India');
//   const [data, setData] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);
//   const universitiesPerPage = 10;
//   const pagesVisited = pageNumber * universitiesPerPage;
//   const [barData, setBarData] = useState([]);
//   const [pieData, setPieData] = useState([]);

//   useEffect(() => {
//     // Fetch data from server
//     fetch('http://localhost:3000/data')
//       .then(response => response.json())
//       .then(data => {
//         setData(data.countries);
//         const country = data.countries.find(country => country.countryName === selectedCountry);
//         const stateCount = country.universities.reduce((acc, university) => {
//           acc[university.state] = (acc[university.state] || 0) + 1;
//           return acc;
//         }, {});
//         const barData = Object.entries(stateCount).map(([state, count]) => ({state, count}));
//         setBarData(barData);
//         const pieData = Object.entries(stateCount).map(([state, count]) => ({name: state, value: count}));
//         setPieData(pieData);
//       })
//       .catch(error => console.error(error));
//   }, [selectedCountry]);

//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//   };

//   const pageCount = Math.ceil(data.find(country => country.countryName === selectedCountry)?.universities.length / universitiesPerPage);

//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Sr. No.</StyledTableCell>
//               <StyledTableCell align="right">University name</StyledTableCell>
//               <StyledTableCell align="right">Website</StyledTableCell>
//               <StyledTableCell align="right">State</StyledTableCell>
//               <StyledTableCell align="right">
//                 <Select style={{color:"white"}} value={selectedCountry} onChange={handleCountryChange}>
//                   {countries.map((country) => (
//                     <MenuItem  key={country} value={country} >
//                       {country}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.find(country => country.countryName === selectedCountry)?.universities.slice(pagesVisited, pagesVisited + universitiesPerPage).map((row, index) => (
//               <StyledTableRow key={row.universityId}>
//                 <StyledTableCell
// component="th" scope="row">
// {index + 1 + pagesVisited}
// </StyledTableCell>
// <StyledTableCell align="right">{row.universityName}</StyledTableCell>
// <StyledTableCell align="right">{row.website}</StyledTableCell>
// <StyledTableCell align="right">{row.state}</StyledTableCell>
// </StyledTableRow>
// ))}
// </TableBody>

// </Table> </TableContainer> <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} onPageChange={changePage} containerClassName={"pagination"} previousLinkClassName={"pagination__link"} nextLinkClassName={"pagination__link"} disabledClassName={"pagination__link--disabled"} activeClassName={"pagination__link--active"} /> <BarChart width={600} height={300} data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}> <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="state" /> <YAxis /> <Tooltip /> <Legend /> <Bar dataKey="count" fill="#8884d8" /> </BarChart> <PieChart width={400} height={400}> <Pie data={pieData} cx={200} cy={200} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" > {pieData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))} </Pie> </PieChart> </> ); }