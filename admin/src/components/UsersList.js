import React from "react";
import EnhancedTable from "./EnhancedTable";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import {
  loadUsers,
  updateUser,
  deleteUser,
  register,
} from "../actions/userActions";

function UsersList() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Nom",
        accessor: "firstname",
      },
      {
        Header: "Prénom",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Mot de passe",
        accessor: "password",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Date création",
        accessor: "date_creation",
      },
    ],
    []
  );

  const [skipPageReset, setSkipPageReset] = useState(false);

  const data = useMemo(() => users, [users]);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const addData = (user) => {
    console.log(user);
    dispatch(register(user));
  };

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    dispatch(updateUser(rowIndex, columnId, value, data[rowIndex]._id));
    console.log(data[rowIndex]._id);
  };

  const deleteData = (rowIndexs) => {
    Object.keys(rowIndexs).map((e) => {
      dispatch(deleteUser(data[e]._id));
    });
  };

  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Table d'Utilisateurs</h6>
      </div>
      <div class="card-body">
        <CssBaseline />
        <EnhancedTable
          columns={columns}
          data={data}
          addData={addData}
          deleteData={deleteData}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          addDialog={true}
          title="Utilisateur"
        />
      </div>
    </div>
  );
}

export default UsersList;
