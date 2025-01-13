import { type Command } from './command';

type CommandHandlersMap<ReturnType> = Record<
	string,
	{
		command: Command<any>;
		result: ReturnType;
	}
>;

type CommandHandler<TCommand extends Command<any>, TResult> = (
	command: TCommand,
) => Promise<TResult>;

export class CommandBus<ReturnType> {
	constructor(
		private handlers: {
			[K in keyof CommandHandlersMap<ReturnType>]: CommandHandler<
				CommandHandlersMap<ReturnType>[K]['command'],
				CommandHandlersMap<ReturnType>[K]['result']
			>;
		},
	) {}

	async execute<CommandName extends keyof CommandHandlersMap<ReturnType>>(
		command: CommandHandlersMap<ReturnType>[CommandName]['command'],
	) {
		const commandName = command.constructor.name;

		const handler = this.handlers[commandName];

		if (!handler) {
			throw new Error(`No handler found for command '${commandName}'.`);
		}

		return await handler(command);
	}
}
