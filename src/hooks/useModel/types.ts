/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from 'redux';

export type Actions<TState> = {
  [key: string]: (state: TState, ...args: any[]) => TState;
};

export type Dispatcher<TActions> = {
  [key in keyof TActions]: (...args: any[]) => void;
};

// 定义一个数据模型的接口
export interface Model<TState = unknown> {
  state: TState; // 模型的状态
  actions: Actions<TState>; // 模型的操作，是一个对象，键为操作的类型，值为一个接收状态和参数的函数，并返回新的状态
  models?: { // 子模型，也是一个对象，键为子模型的名称，值为子模型的数据模型
    [key: string]: Model;
  };
}

// 定义一个模型状态的接口
export type ModelStore<TState = unknown> = {
  state: TState; // 当前模型的状态
  models: { // 子模型的状态，也是一个对象，键为子模型的名称，值为子模型的状态
    [key: string]: ModelStore
  };
};

// 定义一个操作的接口，继承了 Redux 的 Action 接口，并增加了 route 和 payload 字段
export interface ModelAction extends AnyAction {
  type: string; // 操作的类型
  route?: string; // 操作的目标模型路径，可以为空
  payload?: any[]; // 操作所需的参数，可以为空
}
