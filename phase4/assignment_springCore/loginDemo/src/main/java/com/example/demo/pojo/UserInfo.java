package com.example.demo.pojo;

import lombok.Data;

import java.util.List;

@Data
public class UserInfo {
    private String name;
    private String email;
    private String username;
    private String password;
    private List<String> roles;

}
