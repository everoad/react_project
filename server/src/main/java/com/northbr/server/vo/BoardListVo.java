package com.northbr.server.vo;

import java.util.List;

public class BoardListVo {

  private List<BoardVo> items;
  private int itemCount;

  public BoardListVo(List<BoardVo> items, int itemCount) {
    this.items = items;
    this.itemCount = itemCount;
  }

  public List<BoardVo> getItems() {
    return items;
  }

  public void setItems(List<BoardVo> items) {
    this.items = items;
  }

  public int getItemCount() {
    return itemCount;
  }

  public void setItemCount(int itemCount) {
    this.itemCount = itemCount;
  }

}