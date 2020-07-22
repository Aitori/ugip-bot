# Hi, heres some instructions on command format!

1. Import what you need at the top, usually from collections.
2. Export an object using module.exports.

Follow the format of this object!

```
{
  name: 'insert name of command here',
  description: 'provide a helpful descriptoin of commands here',
  aliases: ['provide', 'several', 'aliases'];
  usage: '[provide guiders on how to use the command]',
  cooldown: 0 provide a cooldown,
  execute(parameters) {
    command function goes here
  },
};
```