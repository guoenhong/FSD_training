package com.example.demo.service.impl;

import com.example.demo.mapper.UserMapper;
import com.example.demo.pojo.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo user = userMapper.selectByUsername(username);
        List<String> roles = new ArrayList<>();
        if (username=="admin"){
            roles.add("ROLE_ADMIN");
            roles.add("ROLE_LOGGIN");

        }else{
            roles.add("ROLE_LOGGIN");
        }
        user.setRoles(roles);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (String role : user.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role));
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(user.getPassword());
        System.out.println(encoder.encode(user.getPassword()));
        return new User(user.getUsername(),encoder.encode(user.getPassword()),grantedAuthorities);
    }
}
