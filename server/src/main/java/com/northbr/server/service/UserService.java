package com.northbr.server.service;

import java.util.Map;

import com.northbr.server.utils.ProcessResult;

public interface UserService {

  public Map<String, String> getProfile() throws Exception;
  
  public ProcessResult editProfile(Map<String, String> params) throws Exception;

}