import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NavBar from "../components/NavBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const mapStateToProps = (state) => {
  return {
    orders: state.products.lastOrders,
    login: state.login.data,
    isAdmin: state.login.data.dataUser.isAdmin
  };
}

class Table1 extends React.Component {
   constructor() {
      super()
      this.state = { 
      }
   }

   renderTableData() {
   
    return this.props.orders.map((order, index) => {
        { 
         const { id, date, total } = order       
         return (
            <Fragment>
              <TableHead>
                <TableRow>
                 <TableCell align="center">ORDER # </TableCell>
                 <TableCell align="center">DATE</TableCell>
                 <TableCell align="center">TOTAL $</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              <TableRow key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.total}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell align="left" colSpan={3}>
                  Products List:
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell align="center">PRODUCT NAME</TableCell>
                <TableCell align="center">QTY</TableCell>
              </TableRow>
      
              {
              order.Products.map((item) => {
              console.log("item", item)
              return (
              <TableRow key={item.id}>
                  <TableCell align="center"key={item.id}>{item.title}</TableCell>              
                  <TableCell align="center">{item.quantity}</TableCell>
              </TableRow>
              )})}
              </TableBody>
            </Fragment>
            )}           
        })
      }

  render() {



      return (    
        <div>
          <NavBar props={this.props}/>
          <Box bgcolor="success.main">
             <h1 id='title' align="center">Purchase History</h1>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    {this.renderTableData()}
                </Table>
              </TableContainer>
          </Box>
         </div> 
        )
     }
}

export default connect(mapStateToProps)(Table1);

