<script>
import bitmap from '../image/bitmap.jpg'
export default {
    name: 'model-card',
    data() {
        return {
            viewType: 'card',
            showCardImage: false,
            wgth: 'wgth',
        }
    },
    props: {
        row: {
            type: Object
        },
        showCheck: {
            type: Boolean,
            default() {
                return false
            }
        },
        isCheck: {
            type: Boolean,
            default() {
                return false
            }
        },
        index: {
            type: Number
        },
        iSelect: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    computed: {
        cardImage() {
            const cardImage = this.$parent.$parent.defaultConfig.cardImage || ''
            const urlField = cardImage.split('.')
            const url = urlField.reduce(function(prv, cru){
                return prv[cru] || {}
            }, this.row)
            return typeof url == 'string' ? url : ''
        },
        parentCardImage() {
            return this.$parent.$parent.defaultConfig.cardImage || ''
        },
        cardIsCustom() {
            return this.$parent.$parent.cardIsCustom
        },
        cardStyle() {
            let params = {
                class: {
                    active: this.iSelect
                },
                style: {}
            }
            const {cardStyle} = this.$parent.$parent.defaultConfig
            if (cardStyle) {
                if (typeof cardStyle == 'string') {
                    params.class[cardStyle] = true
                } else if (typeof cardStyle == 'object') {
                    if (cardStyle.class) params.class[cardStyle.class] = true
                    if (cardStyle.style) params.style = cardStyle.style
                }
            }
            return params
        },
        offCardHoverEffect() {
            return this.$parent.$parent.defaultConfig.offCardHoverEffect || false
        },
        cardColStyle() {
            let params = {
                class: 'el-col-lg-6 el-col-md-8 el-col-sm-12 el-col-xs-24',
                style: 'padding: 0 8px 16px'
            }
            const {cardColStyle} = this.$parent.$parent.defaultConfig
            if (cardColStyle) {
                if (typeof cardColStyle == 'string') {
                    params.class = cardColStyle
                } else if (typeof cardColStyle == 'object') {
                    if (cardColStyle.class) params.class = cardColStyle.class
                    if (cardColStyle.style) params.style = cardColStyle.style
                }
            }
            return params 
        }
    },
    created() {
        const img = new Image();
        img.src = this.cardImage
        const that = this
        console.log(that);
        img.onload = () => {
            this.showCardImage = true
            this.wgth = img.width >= img.height ? 'wgth' : 'hgtw'
        }
        img.onerror = () => {
            this.showCardImage = false
        }
    },
    mounted() {
    },
    methods: {
        cardClick(event) {
            const {type, parentElement: {type: tp}} = event.target
            if ( (type || tp) != 'button') {
                this.$parent.cardClicks = this.$parent.cardClicks.map((e,i) => i == this.index)
                this.$parent.$parent.$emit('card-click', this.index, this.row)
            }
        },
        handleCheckChange(val) {
            this.$parent.handleCheckChange(val, this.index, this.row)
        },
    },
    render(h) {
        console.log(h)
        return (
            <div {...this.cardColStyle} >
                <div class="card" {...this.cardStyle}>
                    {this.showCheck && <el-checkbox class="checkbox" value={this.isCheck} {...{on: {change: this.handleCheckChange}}} ></el-checkbox>}
                    <div class="card-content" {...{on:{'!click':this.cardClick}}}>
                        {
                            this.cardIsCustom ?
                            this.$slots.default.map(e => {
                                e.data._row = this.row
                                return e
                            }) : 
                            [
                                <div class="card-img" >
                                    {
                                        this.parentCardImage ? [
                                            <img src={bitmap} class="card-bitmap" />,
                                            this.showCardImage && <img src={this.cardImage} class={["card-imgUrl", this.wgth]} />
                                        ] : <span class="card-title"></span>
                                    }
                                </div>,
                                <div class="card-row">{
                                    this.$slots.default.map((e, i) => {
                                        console.log(i)
                                        e.data._row = this.row
                                        return e.key != this.parentCardImage && e
                                    })
                                }</div>,
                            ]
                        }
                    </div>
                    {
                        !this.offCardHoverEffect && 
                        [
                            <i class="card-border-animation-top"></i>,
                            <i class="card-border-animation-right"></i>,
                            <i class="card-border-animation-bottom"></i>,
                            <i class="card-border-animation-left"></i>
                        ]
                    }
                </div>
            </div>
        )
    },
}
</script>

<style lang="scss" scoped>
.card{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    &.active{
        .card-border-animation-top{
            right: 0;
            animation: none;
            display: block;
        }
        .card-border-animation-right{
            bottom: 0;
            animation: none;
            display: block;
        }
        .card-border-animation-bottom{
            left: 0;
            animation: none;
            display: block;
        }
        .card-border-animation-left{
            top: 0;
            animation: none;
            display: block;
        }
    }
    &:hover{
        & .card-border-animation-top{
            display: block;
        }
        & .card-border-animation-right{
            display: block;
        }
        & .card-border-animation-bottom{
            display: block;
        }
        & .card-border-animation-left{
            display: block;
        }
    }
    .card-content{
        font-size: 13px;
        display: flex;
        flex-direction: column;
        flex: 1;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        z-index: 2;
    }
    .checkbox{
        position: absolute;
        top: 12px;
        left: 16px;
        z-index: 9;
    }
    .card-bitmap{
        width: 100%;
    }
    .card-row{
        position: relative;
        z-index: 2;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
    .card-cell{
        padding: 2px 0;
        text-align: left;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
    }
    .card-img{
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: center;
        .card-title{
            width: 100%;
            height: 36px;
            background-color: #ccc;
        }
    }
    .card-imgUrl{
        position: absolute;
        &.wgth{
            height: 100%;
        }
        &.hgtw{
            width: 100%;
        }
    }
    .card-border-animation-top{
        position: absolute;
        top: -1px;
        left: 0;
        right: 100%;
        z-index: 3;
        border-top: 4px solid #9ea9f7;
        height: 1px;
        animation: card-border-top linear forwards .4s;
        display: none;
        border-radius: 4px;
    }
    .card-border-animation-right{
        position: absolute;
        top: 0;
        right: -1px;
        bottom: 100%;
        z-index: 3;
        border-right: 4px solid #9ea9f7;
        width: 1px;
        animation: card-border-right linear forwards .4s ;
        display: none;
        border-radius: 4px;
    }
    .card-border-animation-bottom{
        position: absolute;
        left: 100%;
        right: 0;
        bottom: -1px;
        z-index: 3;
        border-bottom: 4px solid #9ea9f7;
        height: 1px;
        animation: card-border-bottom linear forwards .4s;
        display: none;
        border-radius: 4px;
    }
    .card-border-animation-left{
        position: absolute;
        top: 100%;
        left: -1px;
        bottom: 0;
        z-index: 4;
        border-left: 4px solid #9ea9f7;
        width: 1px;
        animation: card-border-left linear forwards .4s;
        display: none;
        border-radius: 4px;
    }
}
@keyframes card-border-top {
    0%{
        right: 100%;
    }
    60%,100%{
        right: 0;
    }
}
@keyframes card-border-right {
    0%{
        bottom: 100%;
    }
    80%,100%{
        bottom: 0;
    }
}
@keyframes card-border-bottom {
    0%{
        left: 100%;
    }
    60%,100%{
        left: 0;
    }
}
@keyframes card-border-left {
    0%{
        top: 100%;
    }
    80%,100%{
        top: 0;
    }
}
</style>