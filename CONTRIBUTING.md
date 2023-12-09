# Contributing

> This is documentation for getting to know the code itself.

## Code Templates

Code Templates are used for repetitive code. All of which can be found under [`./templates`](./templates/).

### Command Templates

Used for creating commands and is found under [`./templates/command_template.js.txt`](./templates/command_template.js.txt).

**Documentation**

```js
const { EmbedBuilder } = require("discord.js");
const app = require("../../../../configs/bot.json");
const colors = require("../../../../configs/colors.json");

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

