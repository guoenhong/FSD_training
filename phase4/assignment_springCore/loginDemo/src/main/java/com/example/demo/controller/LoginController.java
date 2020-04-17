package com.example.demo.controller;

import com.example.demo.mapper.UserMapper;
import com.example.demo.pojo.UserInfo;
import com.example.demo.utils.CodeUtil;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class LoginController {
    @Autowired
    private UserMapper userMapper;


    @RequestMapping("/login")
    public String login(Model model){
        model.addAttribute("userInfo",new UserInfo());
        return "login";
    }

    @RequestMapping("/getUser")
    public String getUser(UserInfo loginUser,Model model,HttpServletRequest req){
        if(loginUser.getUsername()!=null){
            boolean verifyCode = CodeUtil.checkVerifyCode(req);
            if(verifyCode){
                UserInfo user = userMapper.selectByUsername(loginUser.getUsername());
                if(user.getPassword().equals(loginUser.getPassword())){
                    model.addAttribute("userInfo",user);
                    return "loginSuccess";
                }else{
                    model.addAttribute("errMsg","username or password not correct, pls check.");
                    return "login";
                }
            }else{
                model.addAttribute("errMsg","captcha code wrong");
                return "login";
            }
        }else{
            return "login";
        }


    }


    @RequestMapping("/getAllUser")
    public List<UserInfo> getAllUser(String username){
        List<UserInfo> users = userMapper.selectAll();
        return users;

    }
    @RequestMapping("/register")
    public String register(Model model){
        model.addAttribute("userInfo",new UserInfo());
        return "register";
    }

    @RequestMapping("/addUser")
    public String addUser(UserInfo newUser, HttpServletRequest req, Model model){
        if(newUser.getUsername()!=null){
            boolean verifyCode = CodeUtil.checkVerifyCode(req);
            String errMsg="";
            if(verifyCode){
                UserInfo userInfo = userMapper.selectByUsername(newUser.getUsername());
                if(userInfo==null){
                    try{
                        userMapper.addUser(newUser.getName(),newUser.getEmail(),newUser.getUsername(),newUser.getPassword());
                        return "login";
                    }catch(Exception ex){
                        errMsg="add failed, pls try again";
                        model.addAttribute("errMsg",errMsg);
                        return "register";
                    }

                }else{
                    errMsg="username has been existed, pls change another";
                    model.addAttribute("errMsg",errMsg);
                    return "register";
                }


            }else{
                errMsg="captcha code wrong";
                model.addAttribute("errMsg",errMsg);
                return "register";
            }

        }else{
            return "register";
        }


    }

    @RequestMapping("/update")
    public String update(UserInfo userInfo, Model model){
        if(userInfo.getUsername()!=null){
            UserInfo findUser = userMapper.selectByUsername(userInfo.getUsername());
            model.addAttribute("userInfo",findUser);
        }
        return "update";
    }

    @RequestMapping("/admin")
    public String update(){

        return "admin";
    }

    @RequestMapping("/updateUser")
    public String updateUser(UserInfo user, HttpServletRequest req, Model model) {
        String msg = "";
        if (user.getUsername() != null) {

            boolean verifyCode = CodeUtil.checkVerifyCode(req);
            String errMsg = "";
            if (verifyCode) {
                UserInfo userInfo = userMapper.selectByUsername(user.getUsername());
                if (userInfo != null) {
                    try {
                        userMapper.updateUser(user.getName(), user.getEmail(), user.getUsername(), user.getPassword());

                        return "login";
                    } catch (Exception ex) {
                        errMsg = "update failed, pls try again";
                        model.addAttribute("errMsg", errMsg);
                        return "update";
                    }

                } else {
                    errMsg = "username not existed, pls check";
                    model.addAttribute("errMsg", errMsg);
                    return "update";
                }


            } else {
                errMsg = "captcha code wrong";
                model.addAttribute("errMsg", errMsg);
                return "update";
            }
        }else{
            return "update";
        }
    }
}
