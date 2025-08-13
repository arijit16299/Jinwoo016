const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "〔 𝐌𝐫.𝐁𝐨𝐭 🤖 〕";
/**
* @author NTKhang
* @author: do not delete it
* @message if you delete or edit it you will get a global ban
*/

module.exports = {
	config: {
		name: "help",
		version: "1.21",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Xem cách sử dụng của các lệnh",
			en: "View command usage"
		},
		category: "info",
		guide: {
			vi: "   {pn} [để trống | <số trang> | <tên lệnh>]"
				+ "\n   {pn} <command name> [-u | usage | -g | guide]: chỉ hiển thị phần hướng dẫn sử dụng lệnh"
				+ "\n   {pn} <command name> [-i | info]: chỉ hiển thị phần thông tin về lệnh"
				+ "\n   {pn} <command name> [-r | role]: chỉ hiển thị phần quyền hạn của lệnh"
				+ "\n   {pn} <command name> [-a | alias]: chỉ hiển thị phần tên viết tắt của lệnh",
			en: "{pn} [empty | <page number> | <command name>]"
				+ "\n   {pn} <command name> [-u | usage | -g | guide]: only show command usage"
				+ "\n   {pn} <command name> [-i | info]: only show command info"
				+ "\n   {pn} <command name> [-r | role]: only show command role"
				+ "\n   {pn} <command name> [-a | alias]: only show command alias"
		},
		priority: 1
	},

	langs: {
		vi: {
			help: "╭─────────────⭓"
				+ "\n%1"
				+ "\n├─────⭔"
				+ "\n|Trang [ %2/%3 ]"
				+ "\n│ Hiện tại bot có %4 lệnh có thể sử dụng"
				+ "\n│ » Gõ %5help <số trang> để xem danh sách các lệnh"
				+ "\n│ » Gõ %5help để xem chi tiết cách sử dụng lệnh đó"
				+ "\n├────────⭔"
				+ "\n│ %6"
				+ "\n╰─────────────⭓",
			help2: "%1├───────⭔"
				+ "\n│ » Hiện tại bot có %2 lệnh có thể sử dụng"
				+ "\n│ » Gõ %3help <tên lệnh> để xem chi tiết cách sử dụng lệnh đó"
				+ "\n│ %4"
				+ "\n╰─────────────⭓",
			commandNotFound: "Lệnh \"%1\" không tồn tại",
			getInfoCommand: "╭── NAME ────⭓"
				+ "\n│ %1"
				+ "\n├── INFO"
				+ "\n│ Mô tả: %2"
				+ "\n│ Các tên gọi khác: %3"
				+ "\n│ Các tên gọi khác trong nhóm bạn: %4"
				+ "\n│ Version: %5"
				+ "\n│ Role: %6"
				+ "\n│ Thời gian mỗi lần dùng lệnh: %7s"
				+ "\n│ Author: %8"
				+ "\n├── USAGE"
				+ "\n│%9"
				+ "\n├── NOTES"
				+ "\n│ Nội dung bên trong <XXXXX> là có thể thay đổi"
				+ "\n│ Nội dung bên trong [a|b|c] là a hoặc b hoặc c"
				+ "\n╰──────⭔",
			onlyInfo: "╭── INFO ────⭓"
				+ "\n│ Tên lệnh: %1"
				+ "\n│ Mô tả: %2"
				+ "\n│ Các tên gọi khác: %3"
				+ "\n│ Các tên gọi khác trong nhóm bạn: %4"
				+ "\n│ Version: %5"
				+ "\n│ Role: %6"
				+ "\n│ Thời gian mỗi lần dùng lệnh: %7s"
				+ "\n│ Author: %8"
				+ "\n╰─────────────⭓",
			onlyUsage: "╭── USAGE ────⭓"
				+ "\n│%1"
				+ "\n╰─────────────⭓",
			onlyAlias: "╭── ALIAS ────⭓"
				+ "\n│ Các tên gọi khác: %1"
				+ "\n│ Các tên gọi khác trong nhóm bạn: %2"
				+ "\n╰─────────────⭓",
			onlyRole: "╭── ROLE ────⭓"
				+ "\n│%1"
				+ "\n╰─────────────⭓",
			doNotHave: "Không có",
			roleText0: "0 (Tất cả người dùng)",
			roleText1: "1 (Quản trị viên nhóm)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, tất cả người dùng)",
			roleText1setRole: "1 (set role, quản trị viên nhóm)",
			pageNotFound: "Trang %1 không tồn tại"
		},
		en: {
			help: "╔═════════════❒"
				+ "\n%1"
				+ "\n╠═════❒"
				+ "\n║ 𝗣𝗮𝗴𝗲🐱 《 %2/%3 》"
				+ "\n║ 𝗖𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆, 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗵𝗮𝘀 %4 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝘁𝗵𝗮𝘁 𝗰𝗮𝗻 𝗯𝗲 𝘂𝘀𝗲𝗱"
				+ "\n║ ➠ 𝗧𝘆𝗽𝗲 %5𝗵𝗲𝗹𝗽 〈𝗽𝗮𝗴𝗲〉 𝘁𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗹𝗶𝘀𝘁"
				+ "\n║ ➠ 𝗧𝘆𝗽𝗲 %5𝗵𝗲𝗹𝗽 𝘁𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗱𝗲𝘁𝗮𝗶𝗹𝘀 𝗼𝗳 𝗵𝗼𝘄 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗮𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱"
				+ "\n╠════════❒"
				+ "\n║ %6"
				+ "\n╚═════════════❒",
			help2: "%1╠═══════❒"
				+ "\n║ » 𝗖𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆, 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗵𝗮𝘀 %2 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝘁𝗵𝗮𝘁 𝗰𝗮𝗻 𝗯𝗲 𝘂𝘀𝗲𝗱"
				+ "\n║ » 𝐓𝐲𝐩𝐞 %3𝐡𝐞𝐥𝐩 <𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐧𝐚𝐦𝐞> 𝐭𝐨 𝐯𝐢𝐞𝐰 𝐭𝐡𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬 𝐨𝐟 𝐡𝐨𝐰 𝐭𝐨 𝐮𝐬𝐞 𝐭𝐡𝐚𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝"
				+ "\n║ %4"
				+ "\n╚═════════════❒",
			commandNotFound: "𝐂𝐨𝐦𝐦𝐚𝐧𝐝 \"%1\" 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐞𝐱𝐢𝐬𝐭",
			getInfoCommand: "╔══ ℕ𝔸𝕄𝔼 ════❒"
				+ "\n║ %1"
				+ "\n╠══ 𝕀ℕ𝔽𝕆"
				+ "\n║ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: %2"
				+ "\n║ 𝐎𝐭𝐡𝐞𝐫 𝐧𝐚𝐦𝐞𝐬: %3"
				+ "\n║ 𝐎𝐭𝐡𝐞𝐫 𝐧𝐚𝐦𝐞𝐬 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩: %4"
				+ "\n║ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: %5"
				+ "\n║ 𝐑𝐨𝐥𝐞: %6"
				+ "\n║ 𝐓𝐢𝐦𝐞 𝐩𝐞𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝: %7s"
				+ "\n║ 𝐀𝐮𝐭𝐡𝐨𝐫: %8"
				+ "\n╠══ USAGE"
				+ "\n║%9"
				+ "\n╠══ NOTES"
				+ "\n║ The content inside <XXXXX> can be changed"
				+ "\n║ The content inside [a|b|c] is a or b or c"
				+ "\n╚══════❒",
			onlyInfo: "╔══ 𝕀ℕ𝔽𝕆 ════❒"
				+ "\n║ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐧𝐚𝐦𝐞: %1"
				+ "\n║ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: %2"
				+ "\n║ 𝐎𝐭𝐡𝐞𝐫 𝐧𝐚𝐦𝐞𝐬: %3"
				+ "\n║ 𝐎𝐭𝐡𝐞𝐫 𝐧𝐚𝐦𝐞𝐬 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩: %4"
				+ "\n║ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: %5"
				+ "\n║ 𝐑𝐨𝐥𝐞: %6"
				+ "\n║ 𝐓𝐢𝐦𝐞 𝐩𝐞𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝: %7s"
				+ "\n║ 𝐀𝐮𝐭𝐡𝐨𝐫: %8"
				+ "\n╚═════════════❒",
			onlyUsage: "╔══ 𝕌𝕊𝔸𝔾𝔼 ════❒"
				+ "\n║%1"
				+ "\n╚═════════════❒",
			onlyAlias: "╔══ 𝔸𝕃𝕀𝔸𝕊 ════❒"
				+ "\n║ 𝐎𝐭𝐡𝐞𝐫 𝐧𝐚𝐦𝐞𝐬: %1"
				+ "\n║ 𝐎𝐭𝐡𝐞𝐫 𝐧𝐚𝐦𝐞𝐬 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩: %2"
				+ "\n╚═════════════❒",
			onlyRole: "╔═══ ℝ𝕆𝕃𝔼 ════❒"
				+ "\n║%1"
				+ "\n╚═════════════❒",
			doNotHave: "Do not have",
			roleText0: "0 (All users)",
			roleText1: "1 (Group administrators)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, all users)",
			roleText1setRole: "1 (set role, group administrators)",
			pageNotFound: "Page %1 does not exist"
		}
	},

	onStart: async function ({ message, args, event, threadsData, getLang, role, globalData }) {
		const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
		let customLang = {};
		const pathCustomLang = path.normalize(`${process.cwd()}/languages/cmds/${langCode}.js`);
		if (fs.existsSync(pathCustomLang))
			customLang = require(pathCustomLang);

		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);
		let sortHelp = threadData.settings.sortHelp || "name";
		if (!["category", "name"].includes(sortHelp))
			sortHelp = "name";
		const commandName = (args[0] || "").toLowerCase();
		let command = commands.get(commandName) || commands.get(aliases.get(commandName));
		const aliasesData = threadData.data.aliases || {
			// uid: ["userid", "id"]
		};
		if (!command) {
			for (const cmdName in aliasesData) {
				if (aliasesData[cmdName].includes(commandName)) {
					command = commands.get(cmdName);
					break;
				}
			}
		}

		if (!command) {
			const globalAliasesData = await globalData.get('setalias', 'data', []);
			// [{
			// 	commandName: "uid",
			// 	aliases: ["uid", "id]
			// }]
			for (const item of globalAliasesData) {
				if (item.aliases.includes(commandName)) {
					command = commands.get(item.commandName);
					break;
				}
			}
		}

		// ———————————————— LIST ALL COMMAND ——————————————— //
		if (!command && !args[0] || !isNaN(args[0])) {
			const arrayInfo = [];
			let msg = "";
			if (sortHelp == "name") {
				const page = parseInt(args[0]) || 1;
				const numberOfOnePage = 30;
				for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue;
					let describe = name;
					let description;
					const descriptionCustomLang = customLang[name]?.description;
					if (descriptionCustomLang != undefined)
						description = checkLangObject(descriptionCustomLang, langCode);
					else if (value.config.description)
						description = checkLangObject(value.config.description, langCode);
					if (description)
						describe += `: ${cropContent(description.charAt(0).toUpperCase() + description.slice(1), 50)}`;
					arrayInfo.push({
						data: describe,
						priority: value.priority || 0
					});
				}

				arrayInfo.sort((a, b) => a.data - b.data); // sort by name
				arrayInfo.sort((a, b) => a.priority > b.priority ? -1 : 1); // sort by priority
				const { allPage, totalPage } = global.utils.splitPage(arrayInfo, numberOfOnePage);
				if (page < 1 || page > totalPage)
					return message.reply(getLang("pageNotFound", page));

				const returnArray = allPage[page - 1] || [];
				const startNumber = (page - 1) * numberOfOnePage + 1;
				msg += (returnArray || []).reduce((text, item, index) => text += `🐱➳ ${index + startNumber}${index + startNumber < 10 ? " " : ""}. ${item.data}\n`, '').slice(0, -1);
				await message.reply(getLang("help", msg, page, totalPage, commands.size, prefix, doNotDelete));
			}
			else if (sortHelp == "category") {
				for (const [, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue; // if role of command > role of user => skip
					const indexCategory = arrayInfo.findIndex(item => (item.category || "NO CATEGORY") == (value.config.category?.toLowerCase() || "NO CATEGORY"));

					if (indexCategory != -1)
						arrayInfo[indexCategory].names.push(value.config.name);
					else
						arrayInfo.push({
							category: value.config.category.toLowerCase(),
							names: [value.config.name]
						});
				}
				arrayInfo.sort((a, b) => (a.category < b.category ? -1 : 1));
				arrayInfo.forEach((data, index) => {
					const categoryUpcase = `${index == 0 ? `╔` : `╠`}═══ ${data.category.toUpperCase()} ${index == 0 ? "❒" : "❒"}`;
					data.names = data.names.sort().map(item => item = `🐱➳ ${item}`);
					msg += `${categoryUpcase}\n${data.names.join("\n")}\n`;
				});
				message.reply(getLang("help2", msg, commands.size, prefix, doNotDelete));
			}
		}
		// ———————————— COMMAND DOES NOT EXIST ———————————— //
		else if (!command && args[0]) {
			return message.reply(getLang("commandNotFound", args[0]));
		}
		// ————————————————— INFO COMMAND ————————————————— //
		else {
			const formSendMessage = {};
			const configCommand = command.config;

			let guide = configCommand.guide?.[langCode] || configCommand.guide?.["en"];
			if (guide == undefined)
				guide = customLang[configCommand.name]?.guide?.[langCode] || customLang[configCommand.name]?.guide?.["en"];

			guide = guide || {
				body: ""
			};
			if (typeof guide == "string")
				guide = { body: guide };
			const guideBody = guide.body
				.replace(/\{prefix\}|\{p\}/g, prefix)
				.replace(/\{name\}|\{n\}/g, configCommand.name)
				.replace(/\{pn\}/g, prefix + configCommand.name);

			const aliasesString = configCommand.aliases ? configCommand.aliases.join(", ") : getLang("doNotHave");
			const aliasesThisGroup = threadData.data.aliases ? (threadData.data.aliases[configCommand.name] || []).join(", ") : getLang("doNotHave");

			let roleOfCommand = configCommand.role;
			let roleIsSet = false;
			if (threadData.data.setRole?.[configCommand.name]) {
				roleOfCommand = threadData.data.setRole[configCommand.name];
				roleIsSet = true;
			}

			const roleText = roleOfCommand == 0 ?
				(roleIsSet ? getLang("roleText0setRole") : getLang("roleText0")) :
				roleOfCommand == 1 ?
					(roleIsSet ? getLang("roleText1setRole") : getLang("roleText1")) :
					getLang("roleText2");

			const author = configCommand.author;
			const descriptionCustomLang = customLang[configCommand.name]?.description;
			let description = checkLangObject(configCommand.description, langCode);
			if (description == undefined)
				if (descriptionCustomLang != undefined)
					description = checkLangObject(descriptionCustomLang, langCode);
				else
					description = getLang("doNotHave");

			let sendWithAttachment = true; // check subcommand need send with attachment or not

			if (args[1]?.match(/^-g|guide|-u|usage$/)) {
				formSendMessage.body = getLang("onlyUsage", guideBody.split("\n").join("\n║"));
				sendWithAttachment = true;
			}
			else if (args[1]?.match(/^-a|alias|aliase|aliases$/))
				formSendMessage.body = getLang("onlyAlias", aliasesString, aliasesThisGroup);
			else if (args[1]?.match(/^-r|role$/))
				formSendMessage.body = getLang("onlyRole", roleText);
			else if (args[1]?.match(/^-i|info$/))
				formSendMessage.body = getLang(
					"onlyInfo",
					configCommand.name,
					description,
					aliasesString,
					aliasesThisGroup,
					configCommand.version,
					roleText,
					configCommand.countDown || 1,
					author || ""
				);
			else {
				formSendMessage.body = getLang(
					"getInfoCommand",
					configCommand.name,
					description,
					aliasesString,
					aliasesThisGroup,
					configCommand.version,
					roleText,
					configCommand.countDown || 1,
					author || "",
					guideBody.split("\n").join("\n║")
				);
				sendWithAttachment = true;
			}

			if (sendWithAttachment && guide.attachment) {
				if (typeof guide.attachment == "object" && !Array.isArray(guide.attachment)) {
					const promises = [];
					formSendMessage.attachment = [];

					for (const keyPathFile in guide.attachment) {
						const pathFile = path.normalize(keyPathFile);

						if (!fs.existsSync(pathFile)) {
							const cutDirPath = path.dirname(pathFile).split(path.sep);
							for (let i = 0; i < cutDirPath.length; i++) {
								const pathCheck = `${cutDirPath.slice(0, i + 1).join(path.sep)}${path.sep}`; // create path
								if (!fs.existsSync(pathCheck))
									fs.mkdirSync(pathCheck); // create folder
							}
							const getFilePromise = axios.get(guide.attachment[keyPathFile], { responseType: 'arraybuffer' })
								.then(response => {
									fs.writeFileSync(pathFile, Buffer.from(response.data));
								});

							promises.push({
								pathFile,
								getFilePromise
							});
						}
						else {
							promises.push({
								pathFile,
								getFilePromise: Promise.resolve()
							});
						}
					}

					await Promise.all(promises.map(item => item.getFilePromise));
					for (const item of promises)
						formSendMessage.attachment.push(fs.createReadStream(item.pathFile));
				}
			}

			return message.reply(formSendMessage);
		}
	}
};

function checkLangObject(data, langCode) {
	if (typeof data == "string")
		return data;
	if (typeof data == "object" && !Array.isArray(data))
		return data[langCode] || data.en || undefined;
	return undefined;
}

function cropContent(content, max) {
	if (content.length > max) {
		content = content.slice(0, max - 3);
		content = content + "...";
	}
	return content;
}
