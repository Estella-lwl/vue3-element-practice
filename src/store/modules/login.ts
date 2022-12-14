import { Module } from "vuex"; // 为了与TS结合使用，使用vuex4时需要从vuex中引入Modules。
import { ILoginState } from "./types";
import { IRootStore } from "../types";
import { loginRequest } from "@/api/login/login";
import { IAccount } from "@/api/login/types";

// 划分模块后，每个模块中Module都要有两个泛型，分别代表：当前模块和根模块的state类型。
const loginModule: Module<ILoginState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {}
    };
  },
  getters: {},
  mutations: {
    saveToken(state, token: string) {
      state.token = token;
    }
  },
  actions: {
    // action中的函数接收两个参数：上下文、value。
    // accountLoginAction({ commit }, payload: any) {
    //   console.log("执行accountLoginAction", payload);
    //   // 1. 登录逻辑，发送请求：
    //   const loginRequest = loginRequest();
    // }

    /* 使用async的方式： */
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log("执行accountLoginAction", payload);
      // 1. 登录逻辑，发送请求：
      const loginData = await loginRequest(payload);
      console.log("===========", loginData);

      const { id, token } = loginData.data;
      console.log("拿到的id和token", id, token);

      // 调用commit操作savaToken：
      commit("saveToken", token);

      // 2. 请求用户信息：
    }
  }
};

export default loginModule;
