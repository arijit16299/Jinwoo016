module.exports = {
  config: {
    name: "ownermention",
    version: "1.3",
    author: "Arijit",
    countDown: 3,
    role: 0,
    shortDescription: "Reply when owner is mentioned",
    longDescription: "Automatically replies if the bot owner is mentioned in a message with random fun responses.",
    category: "auto 🪐"
  },

  onStart: async function () {
    console.log("✅ ownermention command loaded!");
  },

  handleEvent: async function ({ event, api }) {
    try {
      const ownerID = "100069254151118"; // Your UID here

      if (!event.mentions || Object.keys(event.mentions).length === 0) return;

      const mentionedIDs = Object.keys(event.mentions);
      if (mentionedIDs.includes(ownerID)) {

        const replies = [
          "👋 𝐇𝐞𝐲 𝐛𝐚𝐛𝐲! Boss akhon busy ache 😼 ja bolar amake bolo~ ❤",
          "🐱 বস এখন মশা মারার মিশনে আছে, পরে কথা বলবে 😹",
          "📢 Boss ke disturb koro na bby 😼 ami ekhane achi tomar jonno~ 💖",
          "Boss এখন ঘুমাচ্ছে জেগে উঠলে রেগে যাবে বেবি~ 🥺😴",
          "আপনি আমার Boss aru কে mention করেছেন,আমাকে বলতে পারেন আমি আপনার সাহায্যের জন্য এখানে আছি 😼"
        ];

        const replyMessage = replies[Math.floor(Math.random() * replies.length)];

        return api.sendMessage(replyMessage, event.threadID, event.messageID);
      }
    } catch (err) {
      console.error("❌ Error in ownermention:", err);
    }
  }
};
