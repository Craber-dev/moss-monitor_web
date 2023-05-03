import { Model, ModelStore } from './types';
import { produce } from 'immer';

/**
 * 获取模型的初始状态。
 * @param model 模型
 * @returns 返回模型的初始状态。
 */
export function getModelInitialState<TState>(model: Model<TState>): ModelStore<TState> {
  const store: ModelStore<TState> = {
    state: model.state,
    models: {}
  };
  // 如果有子模型，递归地获取子模型的初始状态。
  if (model.models) {
    Object.keys(model.models).forEach(key => {
      if (model.models?.[key]) {
        store.models[key] = getModelInitialState(model.models?.[key]);
      }
    });
  }
  return store;
}

/**
 * 根据路由获取模型的状态。
 * @param root 根模型的状态
 * @param route 路由字符串，用 "." 分隔模型的名称
 * @returns 返回目标模型的状态。
 */
export function getModelStoreByRoute<TState, RState>(root: ModelStore<RState>, route?: string): ModelStore<TState> | ModelStore<RState> {
  if (!route) {
    return root;
  }
  const routes = route.split('.');
  const target = findModelStore(root, routes) as ModelStore<TState>;
  if (target) {
    return target;
  } else {
    throw new Error(`Store not found: ${route}`);
  }
}

/**
 * 根据给定的状态，更新目标模型的状态。
 * @param root 根模型的状态
 * @param newState 新的状态
 * @param route 路由字符串，用 "." 分隔模型的名称
 * @returns 返回更新后的状态。
 */
export function updateModelStore<TState = unknown>(root: ModelStore<TState>, newState: TState, route?: string): ModelStore<TState> {
  return produce(root, (draftState: ModelStore<TState>) => {
    const targetState = getModelStoreByRoute(draftState, route);
    if (targetState) {
      targetState.state = newState;
    } else {
      throw new Error(`Failed to update state: Model not found: ${route}`);
    }
  });
}

/**
 * 根据路由获取目标模型。
 * @param root 根模型
 * @param route 路由字符串，用 "." 分隔模型的名称
 * @returns 返回目标模型。
 */
export function getModelByRoute<TState, RState>(root: Model<RState>, route?: string): Model<TState> | Model<RState> {
  if (!route) {
    return root;
  }
  const routes = route.split('.');
  const target = findModel<TState>(root, routes);
  if (target) {
    return target;
  } else {
    throw new Error(`Model not found: ${route}`);
  }
}

// 递归寻找对应的Model Store
function findModelStore<TState>(store: ModelStore, routes: string[]): ModelStore<TState> | undefined {
  const [current, ...rest] = routes;
  if (store.models?.[current]) {
    if (rest.length) {
      return findModelStore(store.models[current], rest);
    }
    else {
      return store.models?.[current] as ModelStore<TState>;
    }
  } else {
    return undefined;
  }
}

// 递归寻找对应的Model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findModel<TState>(model: Model<any>, routes: string[]): Model<TState> | undefined {
  const [current, ...rest] = routes;
  if (model.models?.[current]) {
    if (rest.length) {
      return findModel(model.models[current], rest);
    }
    else {
      return model.models?.[current] as Model<TState>;
    }
  } else {
    return undefined;
  }
}
