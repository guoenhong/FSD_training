package com.example.demo.mapper;

import com.example.demo.pojo.UserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("select name, email, username, password from userInfo where username =#{username}")
    UserInfo selectByUsername(String username);

    @Select("select name, email,username, password from userInfo")
    List<UserInfo> selectAll();

    @Insert("insert into userInfo(name,email, username,password) values(#{name},#{email},#{username},#{password})")
    int addUser(String name,String email, String username,String password);

    @Update("update userInfo set name=#{name},email=#{email},password=#{password} where username=#{username}")
    int updateUser(String name, String email,String username, String password);
}
