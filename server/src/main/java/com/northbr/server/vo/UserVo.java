package com.northbr.server.vo;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserVo implements UserDetails {

  private static final long serialVersionUID = 1L;
  private String username;
  private String userId;
  private String password;
  private String userNm;
  private List<GrantedAuthority> authorities;

  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * @return the userId
   */
  public String getUserId() {
    return userId;
  }

  /**
   * @param userId the userId to set
   */
  public void setUserId(String userId) {
    this.userId = userId;
  }

  /**
   * @return the userNm
   */
  public String getUserNm() {
    return userNm;
  }

  /**
   * @param userNm the userNm to set
   */
  public void setUserNm(String userNm) {
    this.userNm = userNm;
  }

  public void setAuthorities(List<GrantedAuthority> authorities) {
    this.authorities = authorities;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.authorities;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
