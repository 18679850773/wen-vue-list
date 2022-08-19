import WenVueList from './wen-vue-list.vue';
import WenVueListColumn from './wen-vue-list-column.vue'

const seed = {
  install: function(Vue){
        Vue.component(WenVueList.name, WenVueList);
        Vue.component(WenVueListColumn.name, WenVueListColumn);
  } 
}
export default seed