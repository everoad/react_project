package com.northbr.server.service.impl;

import java.util.Map;

import com.northbr.server.mapper.UserMapper;
import com.northbr.server.service.UserService;
import com.northbr.server.utils.ProcessResult;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private UserMapper userMapper;

  public UserServiceImpl(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @Override
  public Map<String, String> getProfile() throws Exception {
    return userMapper.selectProfile();
  }

  @Override
  public ProcessResult editProfile(Map<String, String> params) throws Exception {
    int result = userMapper.updateProfile(params);
    return new ProcessResult(result > 0 ? ProcessResult.SUCCESS_CODE : ProcessResult.FAIL_CODE);
  }


}