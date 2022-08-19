<script>
import Card from './model/card.vue'
export default {
    name: 'wen-vue-list-column',
    components: {Card},
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        viewType() {
            return this.$parent.viewType || 'list'
        },
        listField() {
            return this.$parent.$parent.defaultConfig.listField || []
        },
        cardIsCustom() {
            return this.$parent.cardIsCustom
        },
        cardIndex() {
            return this.$parent.index
        },
        card_self() {
            return this.$parent.$parent.$parent
        },
        cardField() {
            return this.$parent.$parent.$parent.defaultConfig.cardField
        }
    },
    props: {
        nolabel: {
            type: Boolean,
            default() {
                return false
            }
        },
        coltype: {
            type: String,
            default() {
                return 'all'
            }
        },
        invalid: {
            type: Boolean,
            default() {
                return false
            }
        },
        nullFormat: {   // 列数据是否需要执行nullFormat过滤
            type: Boolean,
            default() {
                return true
            }
        }
    },
    mounted() {
    },
    methods: {
        nullFormatFun(data) {
            const type = [undefined, null, "", NaN]
            return type.includes(data) ? '--' : data
        },
        getList() {
            const {slotChildren, allSlot, editAllSave} = this.$parent.$parent
            const {default: def, header: hdr} = this.$scopedSlots
            const params = {
                attrs: {...this.$attrs},
                scopedSlots: {}
            }
            params.attrs.align = this.$attrs.align || "center"

            if (editAllSave) {
                params.key = new Date().valueOf()
                if (this.listField[this.listField.length - 1] == this.$vnode.key) {
                    this.$parent.$parent.editAllSave = false
                }
            }
            if (hdr) {
                params.scopedSlots.header = props => {
                    return hdr(props)
                }
            } else if (this.$attrs.fixed == 'right') {
                params.scopedSlots.header = props => {
                    return this.$attrs["item-label"] || '操作'
                }
            }
            if (def) {
                params.scopedSlots.default = props => {
                    return def(props)
                }
            } else if (this.$attrs.prop && this.nullFormat) {
                params.scopedSlots.default = props => {
                    return this.nullFormatFun(props.row[this.$attrs.prop])
                }
            }
            return params
        },
        getCard() {
            let children = [!this.nolabel && this.$attrs.label && <label class="card-label">{this.$attrs.label}：</label>]
            const {data:{_row}} = this.$vnode
            const def = this.$scopedSlots.default
            if (def) {
                children.push(def({row: _row, $index: this.cardIndex, _self: this.card_self}))
            } else {
                const _nodekey = this.$attrs.prop
                if (_nodekey && _nodekey.indexOf('.') > -1) {
                    const keyArr = _nodekey.split('.')
                    const ka = keyArr.reduce(function(prv, cru){
                        return prv[cru]
                    }, _row)
                    children.push(ka)
                } else {
                    children.push(_row[_nodekey])
                }
            }
            return children
        }
    },
    
    render(h, cxt) {
        if (this.viewType == 'list') {
            return this.coltype != 'card' && h('el-table-column', this.getList())
        } else if (this.viewType == 'card') {
            let params = {}
            if (!this.cardIsCustom) {
                params = {attrs: {class: "card-cell"}}
            }
            return this.coltype != 'list' && h('div', params, this.getCard())
        }
    }
}
</script>

<style lang="scss" scoped>
.card-label{
    font-weight: bold;
}
</style>