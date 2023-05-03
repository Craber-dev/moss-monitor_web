/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dispatcher, Model, ModelAction, ModelStore } from './types';
import { legacy_createStore as createStore } from 'redux'; // 导入 redux 库，使用别名解决兼容性问题
import { Provider, useSelector, useDispatch } from 'react-redux'; // 导入 react-redux 库，提供 Provider 组件
import { getModelByRoute, getModelInitialState, getModelStoreByRoute, updateModelStore } from './utils';

let rootModel: Model;

function RootModelProvider<TState>({ children, model: root }: React.PropsWithChildren<{ model: Model<any> }>) {
  if (!rootModel) {
    rootModel = root;
  }
  // 获取模型的初始状态
  const initialState = getModelInitialState(root);

  // 定义 reducer 函数，用于处理 action 并更新状态
  const rootReducer = (state: ModelStore<TState> = initialState, action: ModelAction): ModelStore<TState> => {
    const { type, route, payload = [] } = action; // 获取 action 中的信息
    const targetModel = getModelByRoute<any, TState>(root, route); // 获取目标模型
    const targetStore = getModelStoreByRoute<TState, any>(state, route); // 获取目标模型对应的状态
    const targetCaseReducer = targetModel.actions?.[type]; // 获取目标 action 对应的 reducer
    if (targetCaseReducer) {
      const newState = targetCaseReducer(targetStore.state, ...payload); // 执行 reducer 函数，获取新的状态
      return updateModelStore(state, newState, route); // 更新状态
    } else {
      return state;
    }
  };

  // 创建 Redux store
  const store = createStore(
    rootReducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // 使用 Provider 组件包裹子组件，并传递 Redux store
  return <Provider store={store}>{ children }</Provider>;
}

// 使用 React.memo 进行优化，避免不必要的渲染
export const ModelProvider = React.memo(RootModelProvider);
/**

useModel 将一个 model 中的状态和操作映射到当前组件中
@template M Model 类型，应该为 Model 类型或其子类型
@param {string} [route] model 的路由，如果不传则默认为 root model
@return {[M['state'], Dispatcher<M['actions']>]} 返回一个数组，第一个元素为 model 的状态，第二个元素为 model 的操作
*/
export function useModel<M extends Model<any>>(route?: string): [M['state'], Dispatcher<M['actions']>] {
  // 获取 useDispatch 和 useSelector hook
  const dispatch = useDispatch();
  const modelStore = useSelector<ModelStore<typeof rootModel>, ModelStore<M['state']>>((state) => {
  // 根据路由获取对应的 modelStore
    return getModelStoreByRoute(state, route);
  });
  // 如果找不到对应的 modelStore，则抛出错误
  if (!modelStore) {
    throw new Error(`Model not found: ${route}`);
  }
  // 获取对应的 model
  const model: Model = getModelByRoute(rootModel, route);
  // 创建一个空的 dispatcher 对象
  const dispatcher = {} as Dispatcher<typeof model.actions>;
  // 如果该 model 有 actions，则为每个 action 创建对应的 dispatcher
  if (model.actions) {
    const actions = model.actions;
    Object.keys(actions).forEach(key => {
      // 创建 dispatcher 函数，并在函数内部调用 dispatch 函数
      dispatcher[key] = (...args: any[]) => dispatch({ type: key, route, payload: args } as ModelAction);
    });
  }
  // 返回该 model 的状态和 dispatcher
  return [modelStore.state, dispatcher];
}
