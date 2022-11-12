---
title: About
---

<div class="text-center">
  <!-- You can use Vue components inside markdown -->
  <div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h3>About this Project</h3>
</div>

[King of Bots](https://github.com/glintonliao/king-of-bots) is an AI battle platform supporting PvP and PvE features. It was made by SpringBoot, Vite. With **file-based routing**, **components auto importing**, **markdown support**, I18n, PWA and uses **UnoCSS** for styling and icons.

```ts
// project init
onMounted(() => {
  pk.opponentUsername = 'My Opponent'
  pk.opponentPhoto = '/anonymous.png'

  pk.loser = 'none'
  re.isRecording = false

  const socket = new WebSocket(socketUrl)
  socket.onopen = () => {
    pk.socket = socket
  }

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data)
    if (data.event === 'start-matching') {
      pk.opponentUsername = data.opponent_username
      pk.opponentPhoto = data.opponent_photo
      setTimeout(() => {
        pk.status = 'playing'
      }, 200)
      pk.updateGame(data.game)
    }
    else if (data.event === 'move') {
      const game = pk.gameObj
      const [snake0, snake1] = game.snakes
      snake0.setDirection(data.a_direction)
      snake1.setDirection(data.b_direction)
    }
    else if (data.event === 'result') {
      const game = pk.gameObj
      const [snake0, snake1] = game.snakes

      if (data.loser === 'all' || data.loser === 'A')
        snake0.status = 'die'

      if (data.loser === 'all' || data.loser === 'B')
        snake1.status = 'die'

      pk.loser = data.loser
    }
  }
})
```

## Bot Running Micro Service

```java
@Override
public void run() {
    UUID uuid = UUID.randomUUID();
    String uid = uuid.toString().substring(0, 8);

    Supplier<Integer> botInterface = Reflect.compile(
            "com.kob.botrunningsystem.utils.Bot" + uid,
            addUid(bot.getBotCode(), uid)
    ).create().get();

    // read code from file
    File file = new File("input.txt");
    try (PrintWriter fout = new PrintWriter(file)) {
        fout.println(bot.getInput());
        fout.flush();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }

    Integer direction = botInterface.get();
    System.out.println("move-direction: " + bot.getUserId() + " " + direction);

    MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
    data.add("user_id", bot.getUserId().toString());
    data.add("direction", direction.toString());

    restTemplate.postForObject(receiveBotMoveUrl, data, String.class);
}
```

Hope you Enjoy this project!
