package com.northbr.server.service;

import java.util.Map;

import com.northbr.server.utils.ProcessResult;

import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface DataService {

  public Map<String, Object> getDefaultData() throws Exception;

  public ProcessResult uploadFile(MultipartHttpServletRequest request) throws Exception;
}