# Code Documentation

> This is documentation for getting to know the code itself.

## Ugh! Another error...

Here are some common causes of some errors that you may encounter while modifying the bot that are caused by YOU.

### `TypeError: Cannot read properties of undefined (reading 'name') at load (pkg/jackmeng/handlers/cmd.js:14:35)`

This error is caused by a command file that does not have the required `config` field filled out. See [Code_Template:Commands](#commands).

> [!TIP]
>
> **Fix**
>
> Make sure you fill out the `config` field such that the command file looks something like this:
>
> ```js
> module.exports = {
>  config: {
>    name: "my_command",
>    category: "Fun Commands",
>    description: "",
>    usage: "",
>    aliases: [``],
>  },
>  run: async (bot, msg, args) => {
>    //...
>  },
> };
> ```


## Code Templates

Code Templates are used for repetitive code. All of which can be found under [`./templates`](./templates/).

### Commands

Used for creating commands and is found under [`./templates/command_template.js.txt`](./templates/command_template.js.txt).

**Documentation**

```js
module.exports = {
  config: {
    name: "",
    category: "",
    description: "",
    usage: "",
    aliases: [``],
  },
  run: async (bot, msg, args) => {},
};
```

`config`:
* `name` - the command's name which is used for actually calling the command
* `category` - where this command is located (note, this is not bound to the folder, but generally should be for conventions)
* `description` - **optional**, a short and sweet description of this command
* `usage` - **optional**, a demonstration on how this command can be used
* `aliases` - any other `name`'s that also relate to this command

> [!WARNING]
> You must have all of the **non-optional fields filled out** or else you will get an error when trying to run the bot!

<details>

<summary>
<strong>Example Usage</strong>
</summary>

Source: [`./pkg/jackmeng/commands/utils/ping.js`](./pkg/jackmeng/commands/utils/ping.js)

```js
const { EmbedBuilder, messageLink } = require("discord.js");
const colors = require("../../../../configs/colors.json");
const app = require("../../../../configs/bot.json");
const ping = require("latenz");

module.exports = {
  config: {
    name: "ping",
    category: "Utility",
    description: "Perform a latency test",
    usage: app.strings.arguments_null,
    aliases: [],
  },
  run: async (bot, msg, args) => {
    msg.channel.send("Playing ping pong... :ping_pong:").then((m) => {
      let client = Date.now() - msg.createdTimestamp;
      let api = Math.round(bot.ws.ping);
      m.edit(
        (client <= app.internals.green_ping
          ? ":green_circle:"
          : client > app.internals.green_ping &&
            client <= app.internals.yellow_ping
          ? ":yellow_circle:"
          : ":red_circle:") +
          " **Client Latency:** " +
          client +
          "ms" +
          "\n" +
          (api <= app.internals.green_ping
            ? ":green_circle:"
            : api > app.internals.green_ping && api <= app.internals.yellow_ping
            ? ":yellow_circle:"
            : ":red_circle:") +
          " **API Latency:** " +
          api +
          "ms\n"
      );
      msg.channel
        .send("Playing ping pong with Bessie... :ping_pong:")
        .then((x) => {
          const l = new ping();
          l.measure("usaco.org").then((xr) => {
            let result = parseInt(xr[0].time);
            let response = parseInt(xr[2].time);
            x.edit(
              (result <= app.internals.green_ping
                ? ":green_circle:"
                : result > app.internals.green_ping &&
                  result <= app.internals.yellow_ping
                ? ":yellow_circle:"
                : ":red_circle:") +
                " **USACO Gateway [DNS_LOOKUP]:** " +
                result +
                "ms\n" +
                (response <= app.internals.green_ping
                  ? ":green_circle:"
                  : response > app.internals.green_ping &&
                    response <= app.internals.yellow_ping
                  ? ":yellow_circle:"
                  : ":red_circle:") +
                " **USACO Gateway [HOST_RESPONSE]:** " +
                response +
                "ms"
            );
          });
        });
    });
  },
};
```

</details>
