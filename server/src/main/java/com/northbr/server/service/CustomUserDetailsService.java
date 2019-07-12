package com.northbr.server.service;

import java.util.Arrays;
import java.util.List;

import com.northbr.server.vo.UserVo;
import com.northbr.server.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  private UserMapper userMapper;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserVo user = userMapper.selectUser(username);

    if (user == null) {
      throw new UsernameNotFoundException("Not found member by username.");
    }

    List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ADMIN"));
    user.setAuthorities(authorities);
    return user;
  }

}
