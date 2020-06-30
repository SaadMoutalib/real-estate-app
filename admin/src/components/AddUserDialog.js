import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import { clearErrors } from "../actions/errorActions";

const initialUser = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: "Utilisateur",
};

const AddUserDialog = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUser);
  const { addUserHandler } = props;
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (name) => (event) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
    dispatch(clearErrors());
  };

  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMessage(error.msg.message);
    } else {
      setMessage(null);
    }
  }, [error]);

  const handleAdd = (event) => {
    addUserHandler(user);
    setUser(initialUser);

    if (error.id === "REGISTER_SECCESS") {
      dispatch(clearErrors());
      switchState.addMultiple ? setOpen(true) : setOpen(false);
    }
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajouter Utilisateur</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Ajouter un Utilisateur a la base de données
            </DialogContentText>
            {message && <Alert severity="error">{message}</Alert>}

            <TextField
              autoFocus
              margin="dense"
              label="Nom"
              type="text"
              fullWidth
              value={user.firstName}
              onChange={handleChange("firstname")}
              required
            />
            <TextField
              margin="dense"
              label="Prenom"
              type="text"
              fullWidth
              value={user.lastName}
              onChange={handleChange("lastname")}
              required
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={user.email}
              onChange={handleChange("email")}
              required
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              type="password"
              fullWidth
              value={user.password}
              onChange={handleChange("password")}
              required
            />
            <Select
              style={{ paddingTop: "20px" }}
              label="Role"
              fullWidth
              value={user.role}
              onChange={handleChange("role")}
            >
              <option value="Utilisateur">Utilisateur</option>
              <option value="Admin">Admin</option>
            </Select>
          </DialogContent>
          <DialogActions>
            <Tooltip title="Add multiple">
              <Switch
                checked={switchState.addMultiple}
                onChange={handleSwitchChange("addMultiple")}
                value="addMultiple"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Tooltip>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
};

export default AddUserDialog;
