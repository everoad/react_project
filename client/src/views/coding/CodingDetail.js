import React, { Fragment, useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as service from "../../services/board";

import MarkdownText from "../../components/markdown/MarkdownText";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 0, 3, 0),
    width: "100%"
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(2)
  },
  image: {
    marginLeft: "3%",
    width: "94%"
  },
  content: {
    padding: theme.spacing(1)
  }
}));

const initItem = {
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

export default function CodingDetail({ id, auth }) {
  const classes = useStyles();

  const [item, setItem] = useState(initItem);

  useEffect(() => {
    const getBoardItem = async () => {
      const res = await service.getBoardItem("coding", { id });
      setItem(res.data);
    };

    getBoardItem();
  }, [id]);

  return (
    <div className={classes.root}>
      {item.id > 0 && (
        <Fragment>
          <Typography variant="h5" component="h5" className={classes.title}>
            [ {item.type} ] {item.title}
          </Typography>
          <img
            src={
              item.image
                ? `data:image/${item.imageType};base64,${item.image}`
                : "/images/cover-2-lg.png"
            }
            className={classes.image}
            alt={item.imageName}
            title={item.imageName}
          />
          <div className={classes.content}>
            <MarkdownText value={item.description} />
          </div>
        </Fragment>
      )}
    </div>
  );
}
