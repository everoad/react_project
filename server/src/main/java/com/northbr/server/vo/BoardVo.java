package com.northbr.server.vo;

public class BoardVo {

  private int id;
  private String title;
  private String description;
  private String category;
  private String type;
  private String regDtime;
  private int imageId;
  private byte[] image;

  public int getId() {
    return id;
  }

  public byte[] getImage() {
    return image;
  }

  public void setImage(byte[] image) {
    this.image = image;
  }

  public int getImageId() {
    return imageId;
  }

  public void setImageId(int imageId) {
    this.imageId = imageId;
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

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setId(int id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return title + ", " + description + ", " + category + ", " + type;
  }
}