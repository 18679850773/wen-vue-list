<script>
import SetCol from "./set-show-col.vue";
export default {
    name: 'wen-list-header',
    components: { SetCol },
    data() {
        return {
        }
    },
    props: {
    },
    computed: {
        viewType() {
            return this.$parent.defaultConfig.viewType
        },
        slotChildren() {
            return this.$parent.slotChildren
        },
        showHeader() {
            return this.$parent.config.showHeader
        },
        customHeader() {
            return this.$parent.customHeader
        },
        isIndeterminate() {
            return this.$parent.isIndeterminate
        },
        checkAll() {
            return this.$parent.checkAll
        }
    },
    mounted() {
    },
    methods: {
        editAllClick() {
            this.$emit('showEditAll')
        },
        editData(listField) {
            const {saveMemory, modifyAttribute} = this.$parent
            modifyAttribute('defaultConfig.listField', listField)
            saveMemory()
        },
        switchType(type) {
            const {saveMemory, modifyAttribute} = this.$parent
            modifyAttribute('defaultConfig.viewType', type)
            saveMemory()
        },
        handleCheckAllChange(val) {
            this.$parent.checkAll = val
            this.$parent.isIndeterminate = false   
            this.$parent.handleCheckAllChange(val)
        }
    },
    render(h) {
        if (!this.showHeader) return ;
        const {editAllClick, viewType, switchType} = this
        const btns = {
            list: <div>
                <el-tooltip open-delay="600" effect="dark" content="勾选需要展示的项，选中项支持拖拽排序" placement="top-start">
                    <el-button type="primary" icon="el-icon-finished" size="mini" circle {...{on: {click: editAllClick}}}></el-button>
                </el-tooltip>
            </div>,
            card: <div style="align-self: flex-end;">
                {this.$parent.cardAllCheck && 
                    <el-checkbox indeterminate={this.checkAll?false:this.isIndeterminate} value={this.checkAll} {...{on:{change: this.handleCheckAllChange}}}>全选</el-checkbox>}
            </div>
        }
        // <i class={["el-icon-s-data", "header-btn", viewType=='card' && 'select']} {...{on: {click: () => switchType('card')}}}></i>
        const types = (
            <div class="btn-content" >
                <i class={["el-icon-s-unfold", "header-btn", viewType=='list' && 'select']} {...{on: {click: () => switchType('list')}}}></i> 
                <i class={["el-icon-menu", "header-btn", viewType=='card' && 'select']} {...{on: {click: () => switchType('card')}}}></i>
            </div>
        )
        return (
            this.showHeader === true ? 
            <header class="header">
                {btns[viewType]}
                {types}
            </header> : 
            <header class="header">
                {
                    this.showHeader.map(e => {
                        return e == 'btns' ? btns[viewType] : e == 'types' ? types : <div class="header-center">{this.customHeader}</div>
                    })
                }
                
            </header>
        )
    },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  min-height: 28px;
  & .header-center{
    display: flex;
    align-items: center;
    flex: 1;
  }
  & .btn-content{
    align-self: flex-end;
    width: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
  & .header-btn {
      position: relative;
      & .triangle {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border: 6px solid;
        border-color: #303133 transparent transparent transparent;
    }
  }
  
  & .header-btn:hover {
    color: #409eff;
    cursor: pointer;
    &::after{
        content: '列表';
        display: inline-block;
        padding: 4px 12px;
        color: white;
        position: absolute;
        background-color: #303133;
        font-size: 12px;
        line-height: 20px;
        border-radius: 4px;
        top: 100%;
        right: 0;
        width: 32px;
        z-index: 9;
    }
    // &.el-icon-s-data::after{
    //     content: 'card';
    // }
    &.el-icon-menu::after{
        content: '卡片';
        right: 10px;
    }
  }
  & .select {
    color: #409eff;
  }
}
</style>