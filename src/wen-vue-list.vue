<script>
import WenListHeader from "./model/wen-list-header.vue";
import WenCard from "./model/wen-card.vue";
import TableMethods from './methods/element_table_methods.js'
import SetCol from "./model/set_show_col.vue";
export default {
  name: "wen-vue-list",
  components: { WenListHeader, WenCard, SetCol },
  data() {
    return {
      defaultConfig: {  // 用户记忆操作
        listField: [],    // list模式可视列
        cardField: [],    // card模式展示的列
        showHeader: false,  // 列表头部是否展示
        viewType: 'list', // 列表视图类型:默认list
        notCheckedList: []
      },
      allShowSlot: [],    // 初始化过滤column存储
      typeSlot: [],       // selection/index/expand，可对照element table column 的type属性
      customHeader: false,// 是否存在自定义头部slot
      empty: {},          // 存放element中的slot="empty"相关
      append: {},         // 存放element中的slot="append"相关
      cardAllCheck: false,  // 是否开启多选功能
      isIndeterminate: false, // 全选框的半选状态
      checkAll: false,    // card数据是否全部勾选
      fixedKey: [],        // list模式下固定位置的列
      editAll: false,      // list模式是否展示col弹框
      clickRowId: null,    // list模式，最后一次点击的row的标识
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return null;
      }
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    id: {
      type: String,
      default() {
        return '';
      }
    },
    userId: {
      type: String,
      default() {
        return '';
      }
    },
    version: {
      type: String,
      default() {
        return 'v0.0'
      }
    },
    emptyText: {
      type: String,
      default() {
        return '暂无数据';
      }
    },
    searchText: {
      type: String,
      default() {
        return '请根据相关条件进行查询';
      }
    },
    loadingText: {
      type: String,
      default() {
        return '加载中...';
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    rowClassName: Function,
  },
  created() {
    this.init()
  },
  computed: {
    listField() {
      return this.defaultConfig.listField
    },
    slotChildren() {
      return this.listField.length ? this.listField.map(e => {
        const item = this.allSlot.find(f => e == f._slot.key)
        return item
      }).filter(e => e) : this.allSlot
    },
    copyData() {
      return this.data ? this.data.map(e => e) : null
    },
    handleDate() {
      return this.data ? this.data.map(e => e) : []
    },
    allSlot() {
      const slotChildren = this.allShowSlot.map((e,i) => {
        let item = {
          ...e.data.attrs,
          _slot: e,
        }
        if (e.data.scopedSlots) {
          item.$slots = e.data.scopedSlots
        }
        return item
      })
      return slotChildren;
    },
    operations() {
      return localStorage['operations'] == null ? [] : JSON.parse(localStorage['operations'])
    },
    filterEditSlot() {
      const filterAllSlot = this.allSlot.filter(e => {
        const item = this.defaultConfig.listField.find(l => l == e._slot.key)
        return !item
      })
      return this.defaultConfig.listField.map(e => {
        const item = this.allSlot.find(s => e == s._slot.key)
        return item
      }).concat(filterAllSlot)
    },
    cardIsCustom() {
      const {cardField} = this.defaultConfig
      const [card] = this.allSlot.filter(t => cardField == t._slot.key)
      return typeof cardField == 'string' && card && true
    }
  },
  watch: {
    data(val, oldVal) {
      if (!this.loading) {
        this.empty = this.setTableSlot(val?'empty':'search')
      }
    }
  },
  updated() {
    this.updateCustomHeader()
  },
  mounted() {
    
  },
  methods: {
    // 初始化默认配置
    init() {
      const {_memory, _config} = this.updateCustomHeader()
      let listField = []
      let _allSlot = []; let _typeSlot = [];
      this.$slots.default && this.$slots.default.map((e, i) => {
        const {invalid} = e.componentOptions.propsData
        const {colkey, prop, type, code} = e.data.attrs || {}
        if (invalid === undefined || invalid === false) {
          const _key = colkey || prop || `_key${i}`
          if (type) {
            e.key = type
            _typeSlot.push(e)
          } else if (code) {
            const code_arr = (typeof code == 'string' && code.split(',')) || code || []
            const intersection = this.operations.filter(e => code_arr.includes(e.code))
            if (intersection.length > 0) {
              e.key = _key
              _allSlot.push(e)
              listField.push(_key)
            }
          } else {
            e.key = _key
            _allSlot.push(e)
            listField.push(_key)
          }
          if (e.data.attrs.fixed) {
            this.fixedKey.push(_key)
          }
        }
      })
      if (_memory.listField && this.version != _memory.version) {
        const list = listField.filter(f => !_memory.notCheckedList.includes(f))
        const notCheckedList = _memory.notCheckedList.filter(f => listField.includes(f))
        this.defaultConfig = {..._config, notCheckedList, listField: list}
        this.saveMemory(this.defaultConfig)
      } else {
        listField = _config.listField.length ? _config.listField.filter(v => listField.includes(v)) : listField;
        this.defaultConfig = {..._config, listField }
      }

      this.typeSlot = _typeSlot
      this.allShowSlot = _allSlot
      this.empty = this.setTableSlot(this.copyData?'empty':'search')
      this.append = this.setTableSlot('append')
    },
    updateCustomHeader() {
      const _memory = this.getMemory() || {}
      const _config = {...this.defaultConfig, ...this.config, ..._memory};
      const customHeader = _config.showHeader instanceof Array ? _config.showHeader.find(e => e!='btns'&&e!='types') : false
      if (customHeader) {
        this.customHeader = this.$slots[customHeader] && this.$slots[customHeader][0]
      }
      return {
        _memory, _config
      }
    },
    // 调用该函数，其他组件可修改wen-vue-list.vue中的属性值
    // name【修改的属性名，例如defaultConfig.listField】value【需要替换的值】
    modifyAttribute(name, value) {
      const nameArr = name.split('.')
      nameArr.reduce(function(prv, cru){
        if (cru == nameArr[nameArr.length - 1]) {
          prv[cru] = value
        }
        return prv[cru]
      }, this)
    },
    // 保存用户记忆
    saveMemory(params) {
      if (this.userId) {
        const {listField, viewType, notCheckedList} = params || this.defaultConfig
        const storagekey = [this.userId, this.$route.path, this.id].filter(f => f).join('-')
        localStorage.setItem(storagekey, JSON.stringify({listField, viewType, version: this.version, notCheckedList}))
      }
    },
    sortSlots() {
      let $slots = [].concat(this.typeSlot)
      this.listField.map(e => {
        const item = this.allSlot.find(s => e==s._slot.key)
        if (item) { $slots.push(item._slot) }
      })
      return $slots
    },
    cardSortSlots() {
      let $slots = [];
      const [slot] = this.typeSlot
      if (slot&&slot.data.attrs.type=="selection") {
        this.cardAllCheck = true
        $slots.push(slot)
      }
      const {cardField} = this.defaultConfig
      if (typeof cardField == 'string') {
        const [card] = this.allSlot.filter(t => cardField == t._slot.key)
        if (card) {
          $slots.push(card._slot)
        }
      } else {
        cardField.length ? cardField.map(e => {
          const [card] = this.allSlot.filter(t => e == t._slot.key)
          card && $slots.push(card._slot)
        }) : this.allSlot.map(e => {
          $slots.push(e._slot)
        })
      }
      return $slots
    }, 
    getMemory() {
      const {showHeader} = this.config
      if (showHeader === true || (showHeader instanceof Array && showHeader.includes('btns'))) {
        const storagekey = [this.userId, this.$route.path, this.id].filter(f => f).join('-')
        return JSON.parse(localStorage.getItem(storagekey))
      } else {
        return null
      }
    },
    setTableSlot(name) {
      const [firstEnt] = this.$slots[name] || []
      if (!firstEnt) return {}
      const types = ['empty', 'search']
      const hp = {
        tag: '',
        params: {
          slot: types.includes(name)?'empty':name,
          on: {}
        },
        children: [firstEnt]
      }
      let real = firstEnt && (firstEnt.componentOptions || firstEnt)
      let listenersReal = (firstEnt && firstEnt.componentOptions && firstEnt.componentOptions.listeners) ||{}
      hp.tag = real.tag
      hp.params.on = listenersReal
      return hp
    },
    getListParams() {
      const emptyText = this.copyData?this.emptyText:this.searchText
      return {
        attrs: {...this.$attrs, "empty-text": emptyText},
        props: {
          'row-class-name': this.tableRowClassName
        },
        on: {
          ...this.$listeners,
          'row-click': this.rowClickFunc,
        },
        ref: 'wen-vue-list'
      }
    },
    getRowIdentity(row, rowKey) {
      if (!row) throw new Error('row is required when get row identity');
      if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
          return row[rowKey];
        }
        let key = rowKey.split('.');
        let current = row;
        for (let i = 0; i < key.length; i++) {
          current = current[key[i]];
        }
        return current;
      } else if (typeof rowKey === 'function') {
        return rowKey.call(null, row);
      }
    },
    rowClickFunc(row) {
      if (this.$attrs['highlight-current-row']!= undefined) {
        this.clickRowId = this.getRowIdentity(row, this.$attrs['row-key'])
      }
      this.$emit('row-click', ...arguments)
    },
    tableRowClassName({row, rowIndex}) {
      if (this.rowClassName) {
        return this.rowClassName(...arguments)
      } else {
        return this.clickRowId && this.clickRowId == this.getRowIdentity(row, this.$attrs['row-key']) && 'current-row'
      }
    },
    saveAllClick(listField, notCheckedList) {
        this.editAll = false
        listField && this.editData(listField, notCheckedList)
    },
    showEditAll(){
      this.editAll = true;
    },
    editData(listField, notCheckedList) {
        this.modifyAttribute('defaultConfig.listField', listField)
        this.modifyAttribute('defaultConfig.notCheckedList', notCheckedList)
        this.saveMemory()
    },
    handleCheckAllChange(val) {
      this.$emit('card-allcheck-change', val)
      this.$refs["wen-card"].handleCheckAllChange(val)
    },
    ...TableMethods,  // 导入 element_table_methods 
  },
  render(h) {
    const {viewType} = this.defaultConfig
    this.$el && this.$el.className.indexOf('container') == -1 && (this.$el.className = 'container '+this.$el.className)
    return (
      <div {...{key: this.listField.toString()}}>
        <div style="width: 100%;flex-shrink:0;">
          <wen-list-header {...{on: {showEditAll:this.showEditAll}}} />
          {
            viewType === 'list' &&
            <el-table data={this.handleDate} {...this.getListParams()} >
              {
                this.empty.tag && h('template', {...this.empty.params}, this.empty.children)
              }
              {this.sortSlots()}
              { 
                this.append.tag && h('template', {...this.append.params}, this.append.children)
              }
              <div class="loading" slot="append" v-show={this.loading}>
                {this.$slots.loading ? this.$slots.loading : this.loadingText}
              </div>
            </el-table>
          }
          {
            viewType === 'card' &&
            <wen-card data={this.copyData} ref="wen-card" >
              {this.cardSortSlots()}
            </wen-card>
          }
        </div>
        {viewType=='list' && this.editAll && <set-col {...{on: {saveAllClick: this.saveAllClick}}} />}
      </div>
    )
  },
};
</script>
<style>
.el-table__body-wrapper{
  -ms-overflow-style: auto;
}
</style>
<style lang="scss" scoped>
.container{
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden; 
  padding-bottom: 8px;
}
.loading{
  position: absolute;
  left: 1px;
  right: 1px;
  bottom: 1px;
  top: 0;
  background-color: white;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>