"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
class MyBot {
    constructor() {
        /**
         * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
         *
         * @param {TurnContext} context on turn context object.
         */
        this.onTurn = (turnContext) => __awaiter(this, void 0, void 0, function* () {
            // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
            if (turnContext.activity.type === botbuilder_1.ActivityTypes.Message) {
                yield turnContext.sendActivity(`You said '${turnContext.activity.text}'`);
            }
            else {
                // Generic handler for all other activity types.
                yield turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
            }
        });
    }
}
exports.MyBot = MyBot;
//# sourceMappingURL=bot.js.map