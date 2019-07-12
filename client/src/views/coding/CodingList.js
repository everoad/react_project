import React, { Fragment, useState, useEffect } from "react";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Container from "@material-ui/core/Container";

import FullScreenDialog from "../../components/dialog/FullScreenDialog";
import DefaultDialog from "../../components/dialog/DefaultDialog";
import GridList from "../../components/gridList/GridList";
import CodingDetail from "./CodingDetail";
import CodingEditor from "./CodingEditor";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import * as service from "../../services/board";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  header: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between"
  }
}));

const initSelectedItem = {
  id: -1,
  title: "",
  description: "",
  regDtime: "",
  category: 1,
  type: 0,
  imageId: -1,
  image: ""
};

const initSearch = {
  type: 0,
  page: 0
};

function CodingList({ auth, defaultData }) {
  const classes = useStyles();

  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(initSelectedItem);

  const [search, setSearch] = useState(initSearch);

  const [item, setItem] = useState({
    items: [],
    itemCount: 0
  });

  useEffect(() => {
    getCodingItems();
  }, [search.type]);

  const getCodingItems = async () => {
    const res = await service.getBoardItems("coding", search);
    setItem(res.data);
  };

  const handleClickItem = item => {
    setSelectedItem(item);
    handleDetailOpen();
  };

  const handleClickEdit = () => {
    setSelectedItem(initSelectedItem);
    handleEditOpen();
  };

  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose = () => setDetailOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleClickSave = async () => {
    const res = await service.addBoardItem(selectedItem);
    getCodingItems();
    handleEditClose();
  };

  const handleChangeDesc = value => {
    setSelectedItem({
      ...selectedItem,
      description: value
    });
  };

  const handleChangeImage = value => {
    setSelectedItem({
      ...selectedItem,
      imageId: value
    });
  };

  const handleChange = e => {
    setSelectedItem({
      ...selectedItem,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeSearch = async e => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  const editDialogButtons = [{ text: "저장", handler: handleClickSave }];

  return (
    <Fragment>
      <div className={classes.header}>
        <FormControl variant="outlined" margin="dense">
          <InputLabel htmlFor="select-type">분류</InputLabel>
          <Select
            value={search.type}
            onChange={handleChangeSearch}
            input={
              <OutlinedInput labelWidth={10} name="type" id="select-type" />
            }
          >
            <MenuItem value={0} selected>
              전체
            </MenuItem>
            {defaultData.type.map((one, i) => (
              <MenuItem key={i} value={one.id}>
                {one.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {auth.loggingIn && (
          <IconButton onClick={handleClickEdit}>
            <CreateIcon color="primary" />
          </IconButton>
        )}
      </div>
      <GridList data={item} handleClickItem={handleClickItem} />

      <FullScreenDialog open={detailOpen} handleClose={handleDetailClose}>
        <Container maxWidth="md">
          <CodingDetail id={selectedItem.id} />
        </Container>
      </FullScreenDialog>

      <DefaultDialog
        open={editOpen}
        handleClose={handleEditClose}
        title={selectedItem.id < 0 ? "추가" : "수정"}
        buttons={editDialogButtons}
      >
        <CodingEditor
          item={selectedItem}
          handleChangeDesc={handleChangeDesc}
          handleChangeImage={handleChangeImage}
          handleChange={handleChange}
          defaultData={defaultData}
        />
      </DefaultDialog>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication,
  defaultData: state.defaultData
});

export default connect(mapStateToProps)(CodingList);
