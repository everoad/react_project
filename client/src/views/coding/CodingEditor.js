import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import * as service from "../../services/data";

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const useStyles = makeStyles(theme => ({
  input: {
    padding: theme.spacing(1, 0, 0, 0)
  },
  textField: {
    marginBottom: theme.spacing(1)
  },
  uploadBtn: {
    margin: theme.spacing(1, 0, 0, 1)
  }
}));

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default function CodingEditor({
  item,
  handleChangeDesc,
  handleChangeImage,
  handleChange,
  defaultData
}) {
  const classes = useStyles();
  const { type, title, description, imageId } = item;

  const [selectedTab, setSelectedTab] = useState("write");

  const handleChangeFile = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const res = await service.uploadFile(formData);
    handleChangeImage(res.data.body[0].id);
  };

  return (
    <div>
      <FormControl variant="outlined" margin="dense">
        <InputLabel htmlFor="textfield-type">분류</InputLabel>
        <Select
          value={type}
          onChange={handleChange}
          input={
            <OutlinedInput labelWidth={10} name="type" id="textfield-type" />
          }
        >
          <MenuItem value={0} disabled selected>
            선택
          </MenuItem>
          {defaultData.type.map((one, i) => (
            <MenuItem key={i} value={one.id}>
              {one.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        color="primary"
        component="label"
        className={classes.uploadBtn}
      >
        Upload Image
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChangeFile}
          name="image"
        />
      </Button>
      <TextField
        margin="dense"
        value={title}
        onChange={handleChange}
        label="제목"
        fullWidth
        variant="outlined"
        name="title"
        autoFocus={true}
        InputLabelProps={{
          shrink: true
        }}
        className={classes.textField}
      />
      <ReactMde
        value={description}
        onChange={handleChangeDesc}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}
