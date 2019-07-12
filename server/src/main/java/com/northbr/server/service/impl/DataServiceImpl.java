package com.northbr.server.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.northbr.server.mapper.DataMapper;
import com.northbr.server.service.DataService;
import com.northbr.server.utils.ProcessResult;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Service
public class DataServiceImpl implements DataService {

  private DataMapper dataMapper;

  public DataServiceImpl(DataMapper dataMapper) {
    this.dataMapper = dataMapper;
  }

  @Override
  public Map<String, Object> getDefaultData() throws Exception {
    Map<String, Object> resultMap = new HashMap<>();
    resultMap.put("category", dataMapper.selectCategory());
    resultMap.put("type", dataMapper.selectType());
    return resultMap;
  }

  @Override
  public ProcessResult uploadFile(MultipartHttpServletRequest request) throws Exception {
    List<Map<String, Object>> files = new ArrayList<>();

    Iterator<String> itr = request.getFileNames();
    while (itr.hasNext()) {
      String uploadedFile = itr.next();
      MultipartFile file = request.getFile(uploadedFile);
      Map<String, Object> fileInfo = new HashMap<>();
      fileInfo.put("type", file.getContentType());
      fileInfo.put("name", file.getOriginalFilename());
      fileInfo.put("size", file.getSize());
      fileInfo.put("image", file.getBytes());
      files.add(fileInfo);
    }
    if (files.size() > 0) {
      dataMapper.insertImageFile(files);
      return new ProcessResult(ProcessResult.SUCCESS_CODE, null, files);
    } else {
      return new ProcessResult(ProcessResult.FAIL_CODE, "Not exist image file.");
    }

  }

}