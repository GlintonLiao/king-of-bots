<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/glintonliao/king-of-bots">
    <img src="https://user-images.githubusercontent.com/37015336/197306751-03e09775-91c4-403c-ad9a-79077521f4e5.jpg" alt="Logo" width="80" height="80">
  </a>
  
  <h3 align="center">King of Bots</h3>

  <p align="center">
    An AI battle platform supports PvE and PvP system
    <br />
    <a href="https://www.titongpaolu.run/">Website</a>
    ·
    <a href="https://github.com/glintonliao/titongpaolu-site/issues">Report Bug</a>
    ·
    <a href="https://github.com/glintonliao/titongpaolu-site/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

[King of Bots](https://kingofbots.netlify.app/) is a snake game that supports matching with other players. You can play by yourself, or use code blocks to determine how bots move.

To play the game, first you need to create an account. You will have 1500 initial points.

After each game, the recording will be avalible at [Game Record](https://kingofbots.netlify.app/record/) page. In addition, the points will update according to the result, and you can see the rankings at [Rankings](https://kingofbots.netlify.app/ranklist/) page.

## Tech Stacks

-   Front-end:
    -   Vue.js
        -   TypeScript
        -   Composition API
    -   Vue-Router
    -   VueUse
    -   UnoCSS
    -   Pinia
    -   Vite SSG
    -   I18n
    -   pnpm
    -   Vite
    -   Netlify
-   Back-end:
    -   SpringBoot & Java
    -   MyBatis-Plus
    -   SpringCloud
    -   Lombok
    -   Docker

## Gameplay

#### Game Map

The game map is generated at the backend, because we need to sync two users' maps.

After setting width, height, and the count of wall blocks, we can generate a grid, and randomly picking walls.

```java
private boolean draw() {  // draw game map
    for (int i = 0; i < this.rows; i ++ ) {
        for (int j = 0; j < this.cols; j ++ ) {
            g[i][j] = 0;
        }
    }

    for (int r = 0; r < this.rows; r ++ ) {
        g[r][0] = g[r][this.cols - 1] = 1;
    }
    for (int c = 0; c < this.cols; c ++ ) {
        g[0][c] = g[this.rows - 1][c] = 1;
    }

    Random random = new Random();
    for (int i = 0; i < this.inner_walls_count / 2; i ++ ) {
        for (int j = 0; j < 1000; j ++ ) {
            int r = random.nextInt(this.rows);
            int c = random.nextInt(this.cols);

            if (g[r][c] == 1 || g[this.rows - 1 - r][this.cols - 1 - c] == 1)
                continue;
            if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)
                continue;

            g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = 1;
            break;
        }
    }

    return check_connectivity(this.rows - 2, 1, 1, this.cols - 2);
}
```

#### Snake Drawing

Using `Websocket` connection to synchronize two users' game states.

The backend server will calculate next game state, and send back the result to both of the client side.

```java
@OnMessage
public void onMessage(String message, Session session) {
    System.out.println("received message!");
    JSONObject data = JSONObject.parseObject(message);
    String event = data.getString("event");
    if ("start-matching".equals(event)) {
        startMatching(data.getInteger("bot_id"));
    } else if ("stop-matching".equals(event)){
        stopMatching();
    } else if ("move".equals(event)) {
        move(data.getInteger("direction"));
    }
}
```

#### Game Recording

The client will set a request to the server, fetch the corresponding game state, which is a stirng, representing each move for two players, and shows at the frontend

```ts
function openRecordPage(id: number) {
  for (const record of records.value) {
    if (record.record.id === id) {
      re.isRecording = true
      pk.updateGame({
        map: stringTo2D(record.record.map),
        a_id: record.record.aid,
        a_sx: record.record.asx,
        a_sy: record.record.asy,
        b_id: record.record.bid,
        b_sx: record.record.bsx,
        b_sy: record.record.bsy,
      })
      re.updateSteps({
        a_steps: record.record.asteps,
        b_steps: record.record.bsteps,
      })
      re.recordLoser = record.record.loser
      router.push(`/recording/${encodeURIComponent(id)}`)
      break
    }
  }
}

async function pullPage(page: number) {
  currentPage = page
  try {
    const response = await fetch(`https://app3920.acapp.acwing.com.cn/api/record/getlist/?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const data = await response.json()
    records.value = data.records
    totalRecords = data.record_count
    updatePage()
  }
  catch (err) {
    console.warn(err)
  }
}
```

## Backend Core Service

#### User Account

#### User Bots

## Matching System MicroService

## Bot Running System MicroService

## Run on Your Local Machine

First, clone the project source code from your terminal:

```bash
git clone git@github.com:GlintonLiao/king-of-bots.git
cd king-of-bots
```

Second, install the dependencies and run:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3333](http://localhost:3000) with your browser to see the result.
