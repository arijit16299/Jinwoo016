module.exports = {
  config: {
    name: "arijit",
    aliases: ["arijit", "aru"],
    version: "1.0",
    author: "Tokodori_Frtiz", // remodified by cliff
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "auto 🪐",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const triggers = ["arijit", "aru","arjit"];
    if (event.body && triggers.includes(event.body.toLowerCase())) {
      return message.reply({
        body: `
  ➢ 𝐎𝐰𝐧𝐞𝐫 : 𝐀 𝐑 𝐈 𝐉 𝐈 𝐓 👑

 𝐣𝐮𝐬𝐭 𝐬𝐚𝐲 𝐛𝐨𝐭/𝐛𝐛𝐲 𝐟𝐨𝐫 𝐭𝐚𝐥𝐤 𝐭𝐨 𝐌𝐫. 𝐁𝐨𝐭 🤖

 𝐞𝐧𝐣𝐨𝐲 𝐚𝐧𝐝 𝐡𝐚𝐯𝐞 𝐚 𝐟𝐮𝐧 𝐰𝐢𝐭𝐡 𝐦𝐲 𝐛𝐨𝐭
 | (• ◡•)|  
        `,
        attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/pql861.mp4"),
      });
    }
  }
};
