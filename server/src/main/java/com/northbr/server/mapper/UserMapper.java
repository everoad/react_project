package com.northbr.server.mapper;

import java.util.Map;

import com.northbr.server.vo.UserVo;

public interface UserMapper {

  public UserVo selectUser(String username);

  public Map<String, String> selectProfile();

  public int updateProfile(Map<String, String> params);

}
