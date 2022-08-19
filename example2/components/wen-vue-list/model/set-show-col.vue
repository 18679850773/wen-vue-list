<script>
export default {
    name: 'set-col',
    data() {
        return {
            checkList: []
        }
    },
    created() {
        this.checkList = this.listField.filter(e => !this.fixedKey.includes(e))
    },
    computed: {
        isEdit() {
            return this.$parent.editAll
        },
        listField() {
            return this.$parent.defaultConfig.listField
        },
        allSlot() {
            return this.$parent.allSlot
        },
        fixedKey() {
            return this.$parent.fixedKey
        },
        sourceSlot() {
            return this.$parent.filterEditSlot.filter(e => e&&e.label)
        },
        filtSourceTrue() {
            return this.checkList.map(e => this.sourceSlot.find(s => e == s._slot.key)).filter(e => e&&e.label)
        },
        filtSourceFalse() {
            return this.sourceSlot.filter(e => !this.checkList.includes(e._slot.key))
        }
    },
    props: {

    },
    mounted() {
    },
    methods: {
        saveCol() {
            if (this.checkList.length) {
                this.$emit('saveAllClick', [...this.checkList, ...this.fixedKey], this.filtSourceFalse.map(e => e._slot.key))
            } else {
                this.$message.warning('最少勾选展示一列！');
            }
        },
        changeCol(state, {target:{value}}) {
            if (state) {
                this.checkList.push(value)
            } else {
                this.checkList = this.checkList.filter(e => e!=value)
            }
        },
        close() {
            this.$emit('saveAllClick')
        },
        resetCol() {
            this.checkList = []
        },
        handleSort(event) {
            const {newIndex, oldIndex} = event
            const {_checkList} = this
            let checkList = []
            _checkList.forEach((e, i) => {
                if (newIndex == i) {
                    if (oldIndex > newIndex) {
                        checkList.push(_checkList[oldIndex])
                        checkList.push(e)
                    } else {
                        checkList.push(e)
                        checkList.push(_checkList[oldIndex])
                    }
                } else if (oldIndex == i) {
                    console.log(123)
                } else {
                    checkList.push(e)
                }
            })
            this.checkList = checkList
            console.log(checkList)
        },
        dragstart(event) {
            this._checkList = JSON.parse(JSON.stringify(this.checkList))
            event.dataTransfer.effectAllowed = "move";
            event.target.style.opacity = '0.3';
            this.handKey = event.target.id
            this.handIndex = this._checkList.findIndex(f => f==event.target.id)
        },
        dragleave(event) {
            if (this.handKey != event.target.id) {
                const newIndex = this._checkList.findIndex(f => f==event.target.id)
                const oldIndex = this.handIndex
                
                if (newIndex != -1) {
                    clearTimeout(this.stopTimeout)
                    this.handleSort({newIndex, oldIndex})
                    const self = this
                    this.stopTimeout = setTimeout(() => {
                        self.handIndex = newIndex
                        self._checkList = JSON.parse(JSON.stringify(this.checkList))
                    }, 300);
                }
            }
        },
        dragend(event) {
            const newIndex = this._checkList.findIndex(f => f==event.target.id)
            const oldIndex = this.handIndex
            console.log(newIndex, oldIndex)
            event.target.style.opacity = '1';
        }
    },
    render(h) {
        console.log(h)
        return (
                <div class="set-show-col" ref="set-col" {...{
                    directives: [
                        {
                            name: 'Outclick',
                            value: this.close,
                            expression: 'close',
                        }
                    ]
                }} >
                    <el-button class="close-btn" icon="el-icon-close" circle size="small" {...{on:{click:this.close}}} ></el-button>
                    <h4>请勾选需要展示的列</h4>
                    <div class="checkbox-group" >
                        <transition-group {...{on: {drop: this.drop}, nativeOn: { dragend: this.dragend}}} name="flip-checkbox" style="display: flex;flex-wrap: wrap;width:100%;">
                            {
                                this.filtSourceTrue.map((e,i) => {
                                    return  <el-checkbox
                                            id={e._slot.key}
                                            draggable
                                            key={e._slot.key}
                                            class={[e.type == 'br'?'br':'',this.handleIndex==i?'clone':'']}
                                            label={e._slot.key} border
                                            {...{on:{change:this.changeCol}, nativeOn: {dragstart: this.dragstart, dragleave:  this.dragleave}}}
                                            value={this.checkList.includes(e._slot.key)}
                                        >
                                            {e.label}
                                        </el-checkbox>
                                })
                            }
                        </transition-group>
                        <div class="br" v-show={this.filtSourceTrue.length && this.filtSourceFalse.length} />
                        {
                            this.filtSourceFalse.map((e,i) => {
                                return <el-checkbox 
                                        draggable={false}
                                        key={e._slot.key}
                                        class={i==0?'first':''}
                                        label={e._slot.key} border
                                        {...{on:{change:this.changeCol}}}
                                        value={this.checkList.includes(e._slot.key)}
                                    >
                                        {e.label}
                                    </el-checkbox>
                            })
                        }
                    </div>
                    <div >
                        <el-button type="primary" size="small" round {...{on:{click:this.saveCol}}} >保存</el-button>
                        <el-button size="small" round {...{on:{click:this.resetCol}}} >清空</el-button>
                    </div>
                </div>
        )
    },
}
</script>

<style lang="scss" scoped>
.set-show-col{
    width: 98%;
    min-height: 240px;
    // position: absolute;
    // top: 95px;
    // left: 1%;
    background-color: white;
    box-shadow: 0 0 10px #ccc;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    padding: 20px 0;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;

    flex-shrink: 0;
    transform: translateX(-101%);
    margin-top: 95px;
    align-self: flex-start;
}
.el-checkbox.is-bordered{
    margin-bottom: 15px;
    margin-left: 0px;
    margin-right: 20px;
}
.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 50px 0 50px;
    white-space: pre-wrap;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    min-height: 150px;
}
.close-btn{
    position: absolute;
    right: 20px;
    top: 20px;
}
.flip-checkbox-move {
  transition: transform .5s;
}
.flip-checkbox-enter-active, .flip-checkbox-leave-active {
  opacity: 0;
}
.flip-checkbox-enter, .flip-checkbox-leave-to {
  opacity: 0;
}
.flip-checkbox-leave-active{
    // transform: scale(.3);
    // transition: transform .001s;
}
.br{
    width: 100%;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 15px;
}
.first{
    margin-left: 0 !important;
}

</style>