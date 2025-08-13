const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "accept",
    aliases: ['acp'],
    version: "1.0",
    author: "Arijit",
    countDown: 8,
    role: 2,
    shortDescription: "Accept/Delete friend requests",
    longDescription: "Accept or delete friend requests by replying to the bot",
    category: "Utility"
  },

  onReply: async function ({ message, Reply, event, api, commandName }) {
    const { author, listRequest, messageID, unsendTimeout } = Reply;
    if (author !== event.senderID) return;

    const args = event.body.trim().toLowerCase().split(/\s+/);

    // Cancel auto-unsend timer since user replied
    clearTimeout(unsendTimeout);

    const form = {
      av: api.getCurrentUserID(),
      fb_api_caller_class: "RelayModern",
      variables: {
        input: {
          source: "friends_tab",
          actor_id: api.getCurrentUserID(),
          client_mutation_id: Math.round(Math.random() * 19).toString()
        },
        scale: 3,
        refresh_num: 0
      }
    };

    const success = [];
    const failed = [];

    if (args[0] === "add") {
      form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
      form.doc_id = "3147613905362928";
    }
    else if (args[0] === "del") {
      form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
      form.doc_id = "4108254489275063";
    }
    else {
      return api.sendMessage(
        "❌ | Please select `<add | del> <target number | all>`",
        event.threadID,
        event.messageID
      );
    }

    let targetIDs = args.slice(1);

    if (args[1] === "all") {
      targetIDs = [];
      for (let i = 1; i <= listRequest.length; i++) targetIDs.push(i);
    }

    const newTargetIDs = [];
    const promiseFriends = [];

    for (const stt of targetIDs) {
      const u = listRequest[parseInt(stt) - 1];
      if (!u) {
        failed.push(`Can't find number ${stt} in the list`);
        continue;
      }
      form.variables.input.friend_requester_id = u.node.id;
      form.variables = JSON.stringify(form.variables);
      newTargetIDs.push(u);
      promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
      form.variables = JSON.parse(form.variables);
    }

    for (let i = 0; i < newTargetIDs.length; i++) {
      try {
        const friendRequest = await promiseFriends[i];
        const parsed = JSON.parse(friendRequest);
        if (parsed.errors) {
          failed.push(newTargetIDs[i].node.name);
        } else {
          success.push(newTargetIDs[i].node.name);
        }
      } catch {
        failed.push(newTargetIDs[i].node.name);
      }
    }

    let msg = "";
    if (success.length > 0) {
      msg += `✅ | ${args[0] === 'add' ? 'Friend request accepted' : 'Friend request deleted'} for ${success.length} people:\n${success.join("\n")}\n`;
    }
    if (failed.length > 0) {
      msg += `\n⚠️ | ${failed.length} failed:\n${failed.join("\n")}`;
    }

    if (msg.trim().length > 0) {
      api.sendMessage(msg, event.threadID, event.messageID);
    } else {
      api.unsendMessage(messageID);
      api.sendMessage("❌ | Invalid selection or no matching friend requests found.", event.threadID);
    }

    api.unsendMessage(messageID); // Remove original request list after processing
  },

  onStart: async function ({ event, api, commandName }) {
    try {
      const form = {
        av: api.getCurrentUserID(),
        fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
        fb_api_caller_class: "RelayModern",
        doc_id: "4499164963466303",
        variables: JSON.stringify({ input: { scale: 3 } })
      };

      const res = await api.httpPost("https://www.facebook.com/api/graphql/", form);
      const parsed = JSON.parse(res);
      const listRequest = parsed.data.viewer.friending_possibilities.edges;

      if (!listRequest || listRequest.length === 0) {
        return api.sendMessage("📭 | No pending friend requests found.", event.threadID);
      }

      let msg = "📋 | Friend Requests:\n";
      let i = 0;
      for (const user of listRequest) {
        i++;
        msg += `\n${i}. Name: ${user.node.name}\n   ID: ${user.node.id}\n   Url: ${user.node.url.replace("www.facebook", "fb")}\n   Time: ${moment(user.time * 1000).tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss")}\n`;
      }

      msg += `\n\nReply with: <add | del> <number | all>`;

      api.sendMessage(msg, event.threadID, (e, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          messageID: info.messageID,
          listRequest,
          author: event.senderID,
          unsendTimeout: setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, this.config.countDown * 1000)
        });
      }, event.messageID);

    } catch (err) {
      api.sendMessage("❌ | Error fetching friend requests.", event.threadID);
    }
  }
};
