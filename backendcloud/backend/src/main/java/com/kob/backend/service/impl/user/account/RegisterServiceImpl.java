package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String, String> map = new HashMap<>();
        if (username == null) {
            map.put("return_message", "Username can't be empty");
            return map;
        }
        if (password == null) {
            map.put("return_message", "Password can't be emtpy");
            return map;
        }

        // remove blank space
        username = username.trim();
        if (username.length() == 0) {
            map.put("return_message", "Username can't be empty");
            return map;
        }

        if (password.length() == 0 || confirmedPassword.length() == 0) {
            map.put("return_message", "Password can't be empty");
            return map;
        }

        if (username.length() > 100) {
            map.put("return_message", "Username length can't exceed 100");
            return map;
        }

        if (password.length() > 100 || confirmedPassword.length() > 100) {
            map.put("return_message", "Password length can't exceed 100");
            return map;
        }

        if (!password.equals(confirmedPassword)) {
            map.put("return_message", "The password entered twice does not match");
            return map;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<User> users = userMapper.selectList(queryWrapper);
        if (!users.isEmpty()) {
            map.put("return_message", "Username already taken");
            return map;
        }

        String encodedPassword = passwordEncoder.encode(password);
        String photo = "https://cdn.acwing.com/media/user/profile/photo/147182_lg_77da68d6fb.png";
        User user = new User(null, username, encodedPassword, photo, 1500);
        userMapper.insert(user);

        map.put("return_message", "success");
        return map;
    }
}
