import Vue from 'vue'
import App from './App.vue'

import { Button, Table, TableColumn, Tooltip } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

import WenList from '../components/wen-vue-list'
Vue.use(WenList);

Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Tooltip.name, Tooltip);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
