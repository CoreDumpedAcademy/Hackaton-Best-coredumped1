import { TurnContext } from 'botbuilder';
export declare class MyBot {
    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    onTurn: (turnContext: TurnContext) => Promise<void>;
}
