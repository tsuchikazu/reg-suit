import * as inquirer from "inquirer";
import { CoreConfig, Logger } from "./core-interface";

export type PluginLogger = Logger;

export interface KeyGenerator {
  getExpectedKey(): Promise<string>;
  getActualKey(): Promise<string>;
}

export interface PublishResult {
  reportUrl: string;
}

export interface Publisher {
  fetch(key: string): Promise<any>;
  publish(key: string): Promise<PublishResult>;
}

export interface Notifier {
  notify(result: any): void;
}

export interface PluginCreateOptions<T> {
  coreConfig: CoreConfig;
  logger: Logger;
  noEmit: boolean;
  options: T;
}

export interface Plugin<T> {
  init(config: PluginCreateOptions<T>): void; 
}

export type PreparerQuestions = inquirer.Questions;

export interface PluginPreparer<S, T> {
  inquire(): PreparerQuestions;
  prepare(option: PluginCreateOptions<S>): Promise<T>;
}

export interface KeyGeneratorPlugin<T> extends KeyGenerator, Plugin<T> { }
export interface PublisherPlugin<T> extends Publisher, Plugin<T> { }
export interface NotifierPlugin<T> extends Notifier, Plugin<T> { }

export interface KeyGeneratorPluginHolder<S, T> {
  preparer?: PluginPreparer<S, T>;
  keyGenerator: KeyGeneratorPlugin<T>;
}

export interface PublisherPluginHolder<S, T> {
  preparer?: PluginPreparer<S, T>;
  publisher: PublisherPlugin<T>;
}

export type KeyGeneratorPluginFactory = <S, T>() => KeyGeneratorPluginHolder<S, T>;
export type PublisherPluginFactory = <S, T>() => PublisherPluginHolder<S, T>;