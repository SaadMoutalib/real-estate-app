import React from "react";
import EnhancedTable from "./EnhancedTable";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import {
  getAnnonces,
  updateAnnonce,
  deleteAnnonce,
} from "../actions/annonceActions";

function AnnoncesList() {
  const dispatch = useDispatch();

  const annonces = useSelector((state) => state.annonce.annonces);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Titre",
        accessor: "titre",
      },
      {
        Header: "Prix",
        accessor: "prix",
      },
      {
        Header: "Surface",
        accessor: "surface",
      },
      {
        Header: "N Chambres",
        accessor: "nbrChambres",
      },
      {
        Header: "N Salle de bains",
        accessor: "nbrSallesDeBain",
      },
      {
        Header: "N Pieces",
        accessor: "nbrPieces",
      },
      {
        Header: "Tel",
        accessor: "tel",
      },
      {
        Header: "Etat",
        accessor: "etat",
      },
      {
        Header: "Date creation",
        accessor: "date_creation",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const [skipPageReset, setSkipPageReset] = useState(false);

  const data = useMemo(() => annonces, [annonces]);

  useEffect(() => {
    dispatch(getAnnonces());
  }, []);

  const setData = () => {};

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    dispatch(updateAnnonce(rowIndex, columnId, value, data[rowIndex]._id));
    console.log(data[rowIndex]._id);
  };

  const deleteData = (rowIndexs) => {
    Object.keys(rowIndexs).map((e) => {
      dispatch(deleteAnnonce(data[e]._id));
    });
  };

  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Table d'Annonces</h6>
      </div>
      <div class="card-body">
        <CssBaseline />
        <EnhancedTable
          columns={columns}
          data={data}
          addData={setData}
          deleteData={deleteData}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          addDialog={false}
          title="Annonces"
        />
      </div>
    </div>
  );
}

export default AnnoncesList;
