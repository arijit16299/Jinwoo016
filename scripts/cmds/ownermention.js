module.exports = {
  config: {
    name: "ownermention",
    version: "1.5",
    author: "Arijit",
    countDown: 3,
    role: 0,
    shortDescription: "Reply when owner is mentioned",
    longDescription: "Automatically replies if the bot owner is mentioned in a message with random fun responses, even without admin access.",
    category: "auto 🪐"
  },

  onStart: async function () {
    console.log("✅ ownermention command loaded!");
  },

  handleEvent: async function ({ event, api }) {
    try {
      const ownerIDs = ["100069254151118"]; // Multiple UIDs allowed
      const ownerNames = ["Arijit", "Boss"]; // Add more nicknames

      const text = (event.body || "").toLowerCase().trim();

      let isMention = false;

      // 1️⃣ Check if UID is officially mentioned
      if (event.mentions && ownerIDs.some(id => Object.keys(event.mentions).includes(id))) {
        isMention = true;
      }

      // 2️⃣ Check if message contains owner name or UID text
      if (!isMention) {
        for (let name of ownerNames) {
          if (text.includes(name.toLowerCase()) || ownerIDs.some(id => text.includes(id))) {
            isMention = true;
            break;
          }
        }
      }

      if (!isMention) return;

      const replies = [
        "👋 𝐇𝐞𝐲 𝐛𝐚𝐛𝐲! Boss akhon busy ache 😼 ja bolar amake bolo~ ❤",
        "🐱 বস এখন মশা মারার মিশনে আছে, পরে কথা বলবে 😹",
        "📢 Boss ke disturb koro na bby 😼 ami ekhane achi tomar jonno~ 💖",
        "Boss এখন ঘুমাচ্ছে জেগে উঠলে রেগে যাবে বেবি~ 🥺😴",
        "আপনি আমার Boss কে mention করেছেন, আমাকেই বলেন আমি আপনার সাহায্যের জন্য এখানে আছি 😼"
      ];

      const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];
      return api.sendMessage(pickRandom(replies), event.threadID, event.messageID);

    } catch (err) {
      console.error("❌ Error in ownermention:", err);
    }
  }
};
