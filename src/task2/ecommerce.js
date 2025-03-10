////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
  const ids = allIds;
  // .....
  //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
  return Promise.all(ids.map((id) => fetchOrderById(id)));
};

const bucketOrdersByUsers = async () => {
  let ordersByUsers = {};
  //   2. TODO: using the function from section 1 you should now bucket the orders by user.
  // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
  try {
    const orders = await fetchAllOrders();
    orders.forEach((order) => {
      ordersByUsers[order.userId]
        ? ordersByUsers[order.userId].push(order)
        : (ordersByUsers[order.userId] = [order]);
    });
  } catch (error) {
    console.log(error.message);
  }
  return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
  //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
  let res = [];
  try {
    const orders = await fetchAllOrders();
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    const timeLimit = current - 1000 * 3600 * 24 * 14;

    res = orders.filter((order) => order.timestamp >= timeLimit);
  } catch (error) {
    console.log(error.message);
  }
  return res;
};

const bucketOrdersByDate = async () => {
  let ordersByDate = {};
  //   4. TODO: using the function from section 3 bucket the orders by date.
  // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
  try {
    const lastOrders = await getLast2WeeksOrders();
    lastOrders.forEach((order) => {
      const date = new Date(order.timestamp).toLocaleDateString();
      ordersByDate[date]
        ? ordersByDate[date].push(order)
        : (ordersByDate[date] = [order]);
    });
  } catch (error) {
    console.log(error.message);
  }
  return ordersByDate;
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
