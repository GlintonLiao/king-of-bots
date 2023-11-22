package com.kob.backend.service.impl.user.bot;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.bot.AddService;
import com.kob.backend.utils.AuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddServiceImpl implements AddService {

    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> addData(Map<String, String> data) {
        User user = AuthUserUtil.getAuthUser();

        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

        Map<String, String> map = new HashMap<>();

        if (title == null || title.length() == 0) {
            map.put("return_message", "Title can't be empty");
            return map;
        }

        if (title.length() > 100) {
            map.put("return_message", "Title exceeds 100 characters");
            return map;
        }

        if (description == null || description.length() == 0) {
            map.put("return_message", "No description.");
        }

        if (description != null && description.length() > 300) {
            map.put("return_message", "Description exceeds 300 characters");
            return map;
        }

        if (content == null || content.length() == 0) {
            map.put("return_message", "Content can't be empty");
            return map;
        }

        if (content.length() > 10000) {
            map.put("return_message", "Content exceeds 10000 characters");
            return map;
        }

        QueryWrapper<Bot> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", user.getId());
        if (botMapper.selectCount(queryWrapper) >= 10) {
            map.put("return_message", "Each player can only create at most 10 bots");
            return map;
        }

        Date now = new Date();
        Bot bot = new Bot(null, user.getId(), title, description, content, now, now);

        botMapper.insert(bot);
        map.put("return_message", "success");
        return map;
    }
}
