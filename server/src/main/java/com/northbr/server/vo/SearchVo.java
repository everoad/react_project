package com.northbr.server.vo;

public class SearchVo {

  private String category;
  private String type;
  private int length;
  private int offset;

  public String getCategory() {
    return category;
  }

  public int getOffset() {
    return offset;
  }

  public void setOffset(int offset) {
    this.offset = offset;
  }

  public int getLength() {
    return length;
  }

  public void setLength(int length) {
    this.length = length;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public void setCategory(String category) {
    this.category = category;
  }

}