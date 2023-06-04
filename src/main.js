import Vue from 'vue'
import App from './App.vue'

//注册两个全局组件:Header、Footer,全局组件写法【定义一次,可以直接在任意地方使用】
//Vue.component(组件的名字,组件)
//组件:实质是VueComponent构造函数,为什么下面Header组件打印并非是VueComponent构造函数,因为Header组件暴露的
//配置项(JS),并非暴露Vue.extend()[返回VueComponent构造函数],用的是简写方式
import Header from '@/components/header';
import Footer from '@/components/footer';
import TypeNav from '@/components/typeNav';

//css样式仍然需要全部引入
// 不管是全部引入还是按需引入 ，css样式还是需要全部引入的
// import TypeNav from './src/components/typeNav';
import 'element-ui/lib/theme-chalk/index.css';

import Pagination from '@/components/pagination';
import HintButton from '@/components/hintButton'
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
Vue.component(HintButton.name, HintButton);

// 底下的写法目前是全部引入
// 完整引入element-ui组件库,可以使用任意UI组件【都是全局组件】
//引入elementUI插件
import ElementUI from 'element-ui';
//引入element样式
import 'element-ui/lib/theme-chalk/index.css';
//安装使用elementUI插件
Vue.use(ElementUI);

// //按需引入
// import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui';
// //element-ui大多数组件，注册为全局组件Vue.component|Vue.use
// Vue.use(Button);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Input)
// //按需引入写法不同的:MessageBox、Message、Loading、Notification
// Vue.prototype.$msgbox = MessageBox;
// //消息提示框
// Vue.prototype.$alert = MessageBox.alert;

// Vue.prototype.$message = Message;
//测试获取数据
// import { reqCategory } from '@/api';
// console.log('入口文件地方',reqCategory());
//注册路由功能
import router from './router';
//注册仓库功能
import store from './store';

//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";

//懒加载
import tu from '@/assets/1.png';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  loading: tu,
});

//表单校验
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`//修改内置规则的message,让确认密码和密码相同},
  },
  attributes: {//给校验的field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})
VeeValidate.Validator.extend("tongyi",{
  validate: (value)=>{
  return value;
  },
  getMessage: (field)=>field +"必须同意",
});
  
//将项目全部请求函数引入进来[分别暴露]
import * as http from '@/api';
import VueRouter from 'vue-router';


Vue.config.productionTip = false
new Vue({
  //配置全局事件总线
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
    Vue.prototype.$http = http;
  },
  // console.log(this);报错
  // 11:11,没用
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,
  render: h => h(App),
}).$mount('#app');
