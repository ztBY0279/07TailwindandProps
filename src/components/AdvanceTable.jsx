import {useState, useEffect} from 'react';
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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'China'];

export default function CustomizedTables() {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from server
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => setData(data.countries))
      .catch(error => console.error(error));
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr. No.</StyledTableCell>
            <StyledTableCell align="center">University name</StyledTableCell>
            <StyledTableCell align="center">Website</StyledTableCell>
            <StyledTableCell align="center">State</StyledTableCell>
            <StyledTableCell align="center">
              <Select style={{color:"white"}} value={selectedCountry} onChange={handleCountryChange}>
                {countries.map((country) => (
                  <MenuItem  key={country} value={country} >
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.find(country => country.countryName === selectedCountry)?.universities.map((row, index) => (
            <StyledTableRow key={row.universityId}>
              <StyledTableCell
component="th" scope="row">
{index + 1}
</StyledTableCell>
<StyledTableCell align="center">{row.universityName}</StyledTableCell>
<StyledTableCell align="center"><a href='#' style={{color:"blue"}}>{row.website}</a></StyledTableCell>
<StyledTableCell align="center">{row.state}</StyledTableCell>
<StyledTableCell align="center">{selectedCountry}</StyledTableCell>
</StyledTableRow>
))}
</TableBody>

</Table>
 </TableContainer>
  );

}