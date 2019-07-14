package com.northbr.server.controller;

import java.util.Map;

import com.northbr.server.service.UserService;
import com.northbr.server.utils.ProcessResult;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  private UserService userService;


  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/profile")
  public Map<String, String> getProfile() throws Exception {
    return userService.getProfile();
  }

  @PostMapping("/profile")
  public ProcessResult editProfile(@RequestBody Map<String, String> params) throws Exception {
    return userService.editProfile(params);
  }
}