package com.northbr.server.controller;

import java.util.Map;

import com.northbr.server.service.DataService;
import com.northbr.server.utils.ProcessResult;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
public class DataController {

  private DataService dataService;

  public DataController(DataService dataService) {
    this.dataService = dataService;
  }

  @GetMapping("/data/default")
  public Map<String, Object> getDefaultData() throws Exception {
    return dataService.getDefaultData();
  }

  @PostMapping("/data/upload")
  public ProcessResult uploadFile(MultipartHttpServletRequest request) throws Exception {
    return dataService.uploadFile(request);
  }
}