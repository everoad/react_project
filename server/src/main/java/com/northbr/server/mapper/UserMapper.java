package com.northbr.server.mapper;

import com.northbr.server.vo.UserVo;

public interface UserMapper {

  public UserVo selectUser(String username);

}
