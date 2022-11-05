package com.kob.backend.service.impl.user.bot;

import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.bot.UpdateService;
import com.kob.backend.utils.AuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UpdateServiceImpl implements UpdateService {

    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> update(Map<String, String> data) {
        User user = AuthUserUtil.getAuthUser();

        int botId = Integer.parseInt(data.get("bot_id"));
        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

        Map<String, String> map = new HashMap<>();

        if (title == null || title.length() == 0) {
            map.put("return_message", "Title can't be empty");
            return map;
        }

        if (title.length() >  100) {
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

        Bot bot = botMapper.selectById(botId);

        if (bot == null) {
            map.put("return_message", "Bot is not exist or has been deleted");
            return map;
        }

        if (!bot.getUserId().equals(user.getId())) {
            map.put("return_message", "No authorization to update the bot");
            return map;
        }

        Bot newBot = new Bot(
                bot.getId(),
                user.getId(),
                title,
                description,
                content,
                bot.getCreateTime(),
                new Date()
        );

        botMapper.updateById(newBot);
        map.put("return_message", "success");
        return map;
    }
}
