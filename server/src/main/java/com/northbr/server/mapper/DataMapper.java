package com.northbr.server.mapper;

import java.util.List;
import java.util.Map;

public interface DataMapper {

  public List<Map<String, Object>> selectCategory();

  public List<Map<String, Object>> selectType();

  public int insertImageFile(List<Map<String, Object>> files);
}