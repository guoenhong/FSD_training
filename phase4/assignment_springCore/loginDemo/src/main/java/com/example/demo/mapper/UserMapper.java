package com.example.demo.mapper;

import com.example.demo.pojo.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select name, username, password from userInfo where username =#{username}")
    UserInfo selectByUsername(String username);

}
