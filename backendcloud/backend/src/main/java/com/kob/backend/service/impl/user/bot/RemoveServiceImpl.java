package com.kob.backend.service.impl.user.bot;

import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.bot.RemoveService;
import com.kob.backend.utils.AuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RemoveServiceImpl implements RemoveService {

    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> remove(Map<String, String> data) {
        User user = AuthUserUtil.getAuthUser();

        int botId = Integer.parseInt(data.get("bot_id"));
        Bot bot = botMapper.selectById(botId);
        Map<String, String> map = new HashMap<>();

        if (bot == null) {
            map.put("return_message", "Bot is not exist or has been deleted");
            return map;
        }

        if (!bot.getUserId().equals(user.getId())) {
            map.put("return_message", "No authorization to delete the bot");
            return map;
        }

        botMapper.deleteById(botId);

        map.put("return_message", "success");
        return map;
    }
}
