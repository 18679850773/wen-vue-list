<script>
import Card from './card'
export default {
    name: 'wen-card',
    components: {Card},
    data() {
        return {
            cardField: [],
            isChecks: [],
            cardClicks: [],
            selectedData: []
        }
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        cardData() {
            this.clearSelection()
            return this.data && this.data.length?this.data.map(e=>e):[]
        },
    },
    created() {
        this.$parent.checkAll = false
        const {cardAllCheck} = this.$parent
        const [selection, ...cardFieldCopy] = this.$slots.default
        console.log(selection);
        this.cardField = cardAllCheck ? [...cardFieldCopy] : [...this.$slots.default]
        this.isChecks = Array.from({length: this.cardData.length},() => false)
        this.cardClicks = [...this.isChecks]
    },
    mounted() {
    },
    methods: {
        handleCheckChange(val, index, row) {
            let selectedData = [...this.selectedData]
            const {checkAll, isIndeterminate} = this.$parent
            console.log(isIndeterminate)
            if (checkAll) {
                this.$parent.isIndeterminate = true
                this.$parent.checkAll = false
                selectedData = this.cardData.filter(e => JSON.stringify(e) != JSON.stringify(row))
            } else {
                let checkCountTrue = this.isChecks.filter(e => e).length
                let checkCountFalse = this.isChecks.filter(e => !e).length
                if (val) {
                    this.$parent.checkAll = checkCountFalse == 1
                    this.$parent.isIndeterminate = checkCountFalse != 1
                    selectedData.push(row)
                } else {
                    this.$parent.isIndeterminate = checkCountTrue != 1
                    this.$parent.checkAll = false
                    selectedData = selectedData.filter(e => JSON.stringify(e) != JSON.stringify(row))
                }
            }
            this.selectedData = selectedData
            this.isChecks = this.isChecks.map((e,i) => i==index?val:e)
            this.$parent.$emit('card-check-change', val, row, index, selectedData)
        },
        clearSelection() {
            this.handleCheckAllChange(false)
        },
        toggleAllSelection() {
            this.handleCheckAllChange(!this.$parent.checkAll)
        },
        handleCheckAllChange(val) {
            this.$parent.isIndeterminate = false
            this.$parent.checkAll = val
            this.isChecks = Array.from({length: this.data && this.data.length?this.data.length:0},() => val)
        }
    },
    render(h) {
        return (
            <div class="wen-card-container">
                <div class="wen-card">
                    {
                        this.cardData.map((e, index) => {
                            const params = {
                                props:{
                                    row:e,
                                    showCheck:this.$parent.cardAllCheck,
                                    isCheck:this.isChecks[index],
                                    iSelect: this.cardClicks[index],
                                    index,
                                },
                                key: JSON.stringify(e)
                            }
                            return h('card', params, this.cardField)
                        })
                    }
                </div>
            </div>
        )
    },
}
</script>

<style lang="scss" scoped>
.wen-card{
    display: flex;
    flex-wrap: wrap;
}
</style>