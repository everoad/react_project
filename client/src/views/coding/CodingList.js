import React, { Fragment, useState } from "react";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

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
  },
  searchInput: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.common.white
  }
}));

const initSelectedItem = {
  id: -1,
  title: "",
  description: "",
  regDtime: "",
  category: "",
  categoryId: 1,
  type: "",
  typeId: 0,
  imageId: -1,
  image: "",
  imageName: "",
  imageSize: 0,
  imageType: ""
};

const initSearch = {
  typeId: 0,
  keyword: ""
};

function CodingList({ auth, defaultData }) {
  const classes = useStyles();

  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(initSelectedItem);

  const [search, setSearch] = useState(initSearch);

  const [refresh, setRefresh] = useState(false);

  const getCodingItems = async params => {
    const res = await service.getBoardItems("coding", params);
    return res.data;
  };

  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose = () => setDetailOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleClickItem = item => {
    setSelectedItem(item);
    handleDetailOpen();
  };

  const handleClickEdit = (item = initSelectedItem) => {
    setSelectedItem(item);
    handleEditOpen();
  };

  const handleClickSave = async () => {
    if (selectedItem.id < 0) {
      await service.addBoardItem(selectedItem);
    } else {
      await service.editBoardItem(selectedItem);
    }
    setRefresh(!refresh);
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

  const handleChangeSearch = e => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  const handleKeyPressKeyword = e => {
    if (e.charCode === 13) {
      handleChangeSearch(e);
    }
  };

  const handleClickDelete = async item => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await service.removeBoardItem(item);
      setRefresh(!refresh);
    }
  };

  const editDialogButtons = [{ text: "저장", handler: handleClickSave }];

  return (
    <Fragment>
      <div className={classes.header}>
        <div>
          <FormControl
            variant="outlined"
            margin="dense"
            className={classes.searchInput}
          >
            <InputLabel htmlFor="select-type">분류</InputLabel>
            <Select
              value={search.typeId}
              onChange={handleChangeSearch}
              input={
                <OutlinedInput labelWidth={34} name="typeId" id="select-type" />
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
          <TextField
            className={classes.searchInput}
            onKeyPress={handleKeyPressKeyword}
            label="검색"
            name="keyword"
            variant="outlined"
            margin="dense"
            placeholder="Search.."
            autoFocus={true}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>

        {auth.loggingIn && (
          <IconButton onClick={() => handleClickEdit()}>
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        )}
      </div>
      <GridList
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        handleClickItem={handleClickItem}
        getItems={getCodingItems}
        search={search}
        refresh={refresh}
      />

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
