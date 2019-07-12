package com.northbr.server.vo;

public class ImageVo {

  private String id;
  private byte[] image;
  private String name;
  private int size;
  private String type;
  private String regDtime;

  public String getId() {
    return id;
  }

  public String getRegDtime() {
    return regDtime;
  }

  public void setRegDtime(String regDtime) {
    this.regDtime = regDtime;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public byte[] getImage() {
    return image;
  }

  public void setImage(byte[] image) {
    this.image = image;
  }

  public void setId(String id) {
    this.id = id;
  }

}