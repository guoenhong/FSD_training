package com.example.demo.controller;

import com.example.demo.mapper.UserMapper;
import com.example.demo.pojo.UserInfo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/getUserByUsername")
    public UserInfo getUserById(String username){
        UserInfo user = userMapper.selectByUsername(username);
        return user;

    }
}
