### 前端vue2基线工程

#### 1. 部分基于vue-element-admin
#### 2. 整合基于后端openapi接口定义的apiClient自动ts代码生成
* 执行 ./make_api_client.js 生成api接口客户端样板代码
* 使用新的接口调用对象：import { apiClient } from '@/utils/request'
* 兼容旧接口调用对象：import { request } from '@/utils/request'

#### 3. 状态管理全部采用pinia，不再使用vuex，已重写优化用户、路由等关键逻辑
#### 4. 作为新项目的代码基线，持续沉淀和积累可复用的框架逻辑
#### 5. 本工程主要为满足业务优先的开发需要，根据团队时间和精力后续应转向vue3+ts+vite技术栈