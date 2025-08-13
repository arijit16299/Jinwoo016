const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "Mah MUD彡",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file",
    category: "admin",
    guide: "{pn} <file name>. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100069254151118"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage(
        "❌ | 𝐒𝐨𝐫𝐫𝐲 𝐛𝐚𝐛𝐲, 𝐨𝐧𝐥𝐲 𝗺𝘆 𝗹𝗼𝗿𝗱 𝗔𝗿𝗶𝗷𝗶𝘁 𝗰𝗮𝗻 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝",
        event.threadID,
        event.messageID
      );
    }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = path.join(__dirname, `${fileName}.js`);
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID, event.messageID);
  }
};
