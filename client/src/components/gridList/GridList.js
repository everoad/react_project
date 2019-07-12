import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./GridList.css";

import GridItem from "./GridItem";
import Pagination from "./Pagination";

const useStyles = makeStyles(theme => ({
  list: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  noData: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "150px",
    textAlign: "center",
    fontSize: "15px",
    color: theme.palette.primary.main
  }
}));

export default function GridList({
  getItems,
  search,
  refresh,
  handleClickItem,
  handleClickEdit,
  handleClickDelete
}) {
  const classes = useStyles();

  const [state, setState] = useState({
    page: 0,
    length: 15
  });

  const [data, setData] = useState({
    items: [],
    itemCount: 0
  });

  useEffect(() => {
    const init = async () => {
      const params = {
        start: state.page * state.length,
        length: state.length,
        ...search
      };
      const d = await getItems(params);
      setData(d);
    };

    init();
  }, [refresh, state, search, getItems]);

  const handleClickPageIndex = value => {
    setState({
      ...state,
      page: value
    });
  };

  return (
    <div>
      {data.items.length === 0 ? (
        <div className={classes.noData}>
          <div>데이터가 없습니다.</div>
        </div>
      ) : (
        <ReactCSSTransitionGroup
          component="div"
          className={classes.list}
          transitionName="list-item"
          transitionAppear={true}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppearTimeout={500}
        >
          {data.items.map((item, i) => (
            <GridItem
              key={i}
              item={item}
              handleClickItem={handleClickItem}
              handleClickDelete={handleClickDelete}
              handleClickEdit={handleClickEdit}
            />
          ))}
        </ReactCSSTransitionGroup>
      )}

      <Pagination
        itemCount={data.itemCount}
        {...state}
        handleClickPageIndex={handleClickPageIndex}
      />
    </div>
  );
}
