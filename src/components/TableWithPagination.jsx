import { useState, useEffect ,useRef,  } from 'react';
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
import { PieChart, Pie, Cell, Tooltip, Legend , BarChart, Bar,XAxis,YAxis,CartesianGrid, } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//import domtoimage from 'dom-to-image';






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
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [chartType, setChartType] = useState("pie");
  const chartRef = useRef(null);
  const [isChartReady, setIsChartReady] = useState(false);
  //const [pieChartRef, setPieChartRef] = useState(null);
  const itemsPerPage = 5;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  useEffect(() => {
    if (chartRef.current) {
      setIsChartReady(true);
    }
  }, [chartRef]);


  useEffect(() => {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => setData(data.countries))
      .catch(error => console.error(error));

  }, []);

  useEffect(() => {
    // Prepare data for pie chart
    const countryData = data.find(country => country.countryName === selectedCountry);
    const stateCounts = {};
    countryData?.universities.forEach(university => {
      stateCounts[university.state] = (stateCounts[university.state] || 0) + 1;
    });
    const pieData = Object.entries(stateCounts).map(([state, count]) => ({ name: state, value: count }));
    setPieData(pieData);
    setBarData(pieData);
  }, [selectedCountry, data]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setPage(1); // Reset page number when country changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  

  function downloadPdf() {
    if (isChartReady) {
      const chartElement = document.getElementById(chartType === 'pie' ? 'pie-chart' : 'bar-chart');
      if (chartElement) {
        requestAnimationFrame(() => {
          html2canvas(chartElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
            pdf.save('chart.pdf');
          });
        });
      } else {
        console.error('Pie chart element not found');
      }
    } else {
      console.error('Chart is not ready yet');
    }
  }
  
  
  return (
    <div>
      <Select style={{ margin: '20px', width: '200px' }} value={selectedCountry} onChange={handleCountryChange}>
        {countries.map((country) => (
          <MenuItem key={country} value={country} >
            {country}
          </MenuItem>
        ))}
      </Select>
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

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
  <button className="p-2 mr-2 rounded-xl bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4" onClick={() => setChartType("pie")}>View Pie Chart</button>
  <button className="bg-purple-500 hover:bg-purple-700  p-2 rounded-xl text-white font-bold py-2 px-4"  onClick={() => setChartType("bar")}>View Bar Chart</button>
</div>


{chartType === "pie" ? (

    <div ref={chartRef}  id="pie-chart">
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"50px" }}>
    <h3 className="text-center ">State Distribution (Pie Chart)</h3>
    
  </div>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     
     <PieChart  width={500} height={500}>
  <Pie
    data={pieData}
    cx={200}
    cy={200}
    labelLine={false}
    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
    outerRadius={80}
    fill="#8884d8"
    dataKey="value"
  >
    {pieData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
</div>
 </div>
 ) : (

<div ref={chartRef}  id="bar-chart">
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
    <h3 className="text-center">State Distribution (Bar Chart)</h3>
    
  </div>
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>

        <BarChart width={800} height={400} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      </div>
    )}
    <div className="relative">
   
    <button 
      onClick={downloadPdf} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed bottom-4 right-4"
    >
      Download as PDF
    </button>
  </div>
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

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Sr. No.</StyledTableCell>
//               <StyledTableCell align="center">University name</StyledTableCell>
//               <StyledTableCell align="center">Website</StyledTableCell>
//               <StyledTableCell align="center">State</StyledTableCell>
//               <StyledTableCell align="center">
//                 <Select style={{ color: "white" }} value={selectedCountry} onChange={handleCountryChange}>
//                   {countries.map((country) => (
//                     <MenuItem key={country} value={country} >
//                       {country}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </StyledTableCell>
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

// export default function CustomizedTablesWithPagination() {
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

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Sr. No.</StyledTableCell>
//               <StyledTableCell align="center">University name</StyledTableCell>
//               <StyledTableCell align="center">Website</StyledTableCell>
//               <StyledTableCell align="center">State</StyledTableCell>
//               <StyledTableCell align="center">
//                 <Select style={{ color: "white" }} value={selectedCountry} onChange={handleCountryChange}>
//                   {countries.map((country) => (
//                     <MenuItem key={country} value={country} >
//                       {country}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(data.find(country => country.countryName === selectedCountry)?.universities || [])
//               .slice((page - 1) * itemsPerPage, page * itemsPerPage)
//               .map((row, index) => (
//                 <StyledTableRow key={row.universityId}>
//                   <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
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
