import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ContentPagination from '../../Shared/Pagination';

const Guests = () => {
  function createData(id, firstName, lastName, personalId, birthDate, birthplace, gender, phone, email, adress, reservation, roomId, hotelId, status, note) {
  return { id, firstName, lastName, personalId, birthDate, birthplace, gender, phone, email, adress, reservation, roomId, hotelId, status, note};
}

const rows = [
    createData(1, 'Lorem', 'Ipsum', 123456, '1999.01.23', "Lorem City", "Male" , "123-123-123" ,"Lorem@ipsum.com", "1234 Lorem Ipsum 23", "This, That" ,4 , 2, "Checked in", "This is a note"),
    createData(2, 'Ipsum', 'Lorem', 523, '1939.12.01', "Lorem City", "Female", "21324-42132-13", "Ipsum@Lorem.com", "3225 Ipsum 23", "This, That" , 7 , 40, "Checked out", "This is a note"),
    createData(3, 'Bob', 'DaBuilder', 2342342, '1979.01.04', "New York", "Male", "1234-5243-34", "Builda@Bob.com", "5321 NewBob Ipsum 23", "This, That",  32 , 123, "Checked in", "This is a note"),
    createData(4, 'Jose', 'Sumip', 65246, '1969.04.04', "Lorem City", "Male", "6534-3452-1234", "OutOf@Idea.com", "2345 Tuna 23", "This, That" , 6 , 420, "Checked out", "This is a note"),
];

return (
  <>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
              <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">FirstName</TableCell>
                  <TableCell align="center">LastName</TableCell>
                  <TableCell align="center">Personal Id</TableCell>
                  <TableCell align="center">Birth Date</TableCell>
                  <TableCell align="center">Birth Place</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Adress</TableCell>
                  <TableCell align="center">Reservation</TableCell>
                  <TableCell align="center">Room Id</TableCell>
                  <TableCell align="center">Hotel Id</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Note</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {rows.map((row) => (
                  <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">{row.personalId}</TableCell>
                      <TableCell align="center">{row.birthDate}</TableCell>
                      <TableCell align="center">{row.birthplace}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.adress}</TableCell>
                      <TableCell align="center">{row.reservation}</TableCell>
                      <TableCell align="center">{row.roomId}</TableCell>
                      <TableCell align="center">{row.hotelId}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{row.note}</TableCell>
                      <TableCell align="center"><Button variant="text"><EditIcon/></Button></TableCell>
                      <TableCell align="center"><Button variant="text"><DisabledByDefaultIcon /></Button></TableCell>
                  </TableRow>
              ))}
          </TableBody>
      </Table>
      </TableContainer>
      <ContentPagination />
  </>
)
}

export default Guests