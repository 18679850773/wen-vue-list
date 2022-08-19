# wen-vue-list

## 功能介绍
多功能列表组件
- 支持2种模式切换，list、card。
- list模式：
    - element table、table-column功能，[element table文档](https://element.eleme.cn/#/zh-CN/component/table)
    - 支持可视列编辑
    - 支持用户记忆（目前可记忆的功能：列替换、可视化编辑，切换模式）
    - 支持header展示/隐藏/自定义
    - 支持coltype类型设定
    - 支持列的隐藏展示
- card模式：
    - 列表展示为卡片形态
    - 支持自定义展示图片
    - 支持全选、多选功能
    - 支持卡片点击事件
    - 支持coltype类型设定
    - 支持column完全自定义展示card
    - 支持cardStyle行内样式修改
    
## 使用方法
- template结构

``` xml
<wen-vue-list :data="list" border :loading="loading" :config="config" @select-all="testSelect" id="rtyui" ref="multipleTable"
    @card-click="cardClick" @card-check-change="cardCheckChange" @card-allcheck-change="cardAllcheckChange">
    <!-- slot="empty" 数据为null、undefined时展示的提示，默认是“请根据相关条件进行查询” -->
    <p slot="empty">请点击查询按钮</p>
    <!-- slot="search" 数据为空数组时展示的提示，默认是“暂无数据” -->
    <p slot="search">数据为空哦</p>
    <!-- slot="loading" 数据加载中的提示，默认是“加载中...” -->
    <p slot="loading">loading！！！</p>

    <template slot="clear">
        <el-button @click="clear">clear</el-button>
    </template>
    <wen-vue-list-column
        type="selection"
        align="center"
        width="45">
    </wen-vue-list-column>
    <wen-vue-list-column width="100" label="" colkey="age" >
        <template slot="header" >
            <div>header sssss</div>
        </template>
    <template v-slot="slotProp">
        <div class="test">
            {{slotProp.row.age.x}}
            <span>ababa</span>
        </div>
    </template>
    </wen-vue-list-column>
    <wen-vue-list-column label="头像" colkey="url.img" >
        <template v-slot="slotProp">
            <div class="img">
                <img :src="slotProp.row.url.img" style="max-width:100px;max-height:100px;" />
            </div>
        </template>
    </wen-vue-list-column>
    <wen-vue-list-column prop="sex.x" label="sex" sortable align="center" header-align="right" ></wen-vue-list-column>
    <wen-vue-list-column prop="weight" label="3体重" ></wen-vue-list-column>
    <wen-vue-list-column prop="address" label="4地址" align="right" ></wen-vue-list-column>
    <wen-vue-list-column prop="marriage" label="5婚否" ></wen-vue-list-column>
    
    <wen-vue-list-column prop="friend" label="6朋友" align="right" ></wen-vue-list-column>
    <wen-vue-list-column prop="abs" label="7不知道" align="left" ></wen-vue-list-column>
    <wen-vue-list-column prop="parent" label="8无解" align="center" ></wen-vue-list-column>

    <wen-vue-list-column width="100" align="right">
        <template v-slot="slotProp">
            <div class="test">
                {{slotProp.row.name}}
            </div>
        </template>
    </wen-vue-list-column>
    <wen-vue-list-column coltype="list" colkey="coltype">
        <template v-slot="slotProp">
            coltype功能测试
        </template>
    </wen-vue-list-column>
    <wen-vue-list-column coltype="card" colkey="cardIsCustom">
        <template v-slot="slotProp">
            全部自定义模板测试
        </template>
    </wen-vue-list-column>
    <wen-vue-list-column prop="name" label="操作" nolabel>
        <template v-slot="slotProp">
            <div>
                <el-button type="text" @click="chakan(slotProp.row)">查看</el-button>
                <el-button type="text" @click="clear">删除</el-button>
            </div>
        </template>
    </wen-vue-list-column>
</wen-vue-list>
```

- 数据及config配置

``` js
data() {
    return {
        loading: false,
        list: [
            {
                id: '123',
                name: '测试男1',                   
                sex: {x:'男11'},                     
                age: {
                    d: 30,
                    x: 18
                },
                weight: 55.5,
                address: '北京市朝阳区',
                education: '大专',
                nativePlace: '苏州',
                marriage: '已婚',
                birth: '是',
                spouseName: 'ashis',
                record: '',
                company: '北京市某某公司',
                friend: '张萨满',
                parent: 'SASDHWHDS',
                brother: '阿斯蒂,十点的飞机,大幅高开',
                abs: '好汉跟我走，眼泪往下流'
            },
            {
                id: '124',
                name: '测试男2',                   
                sex: {x:'男'},                     
                age: {
                    d: 32,
                    x: 16
                },
                weight: 56,
                address: '北京市朝阳区ASDJKNASD',
                education: '博士后',
                nativePlace: '云南',
                marriage: '未婚',
                birth: '是',
                spouseName: '一个大美女',
                record: '犬瘟热法国',
                company: '',
                friend: '张萨满22',
                parent: 'ASODIFSOIDF',
                brother: '沙瓦蒂卡',
                abs: '好汉跟我走，眼泪往下流，玛！！！1'
            }
        ],
        config: {
            viewType: 'card',   // 初始化展示模式list或card，默认为list
            listField: ['id', 'marriage', 'age', 'url.img', 'address', 'name'], // 初始化list模式展示的列
            showHeader: true || ['btns', 'types'],  // 列表头部展示
            cardField: 'cardIsCustom' || ['age', 'sex.x', 'weight', 'address', 'name'], // 初始化card模式展示的列
            cardImage: 'url.img',   // card模式下展示图片的字段
            cardStyle: {    // card模式的行内样式
                class: '',
                style: {
                    'backgroundColor': 'aqua',
                    'fontSize': '10px'
                }
            },
            cardColStyle: "el-col-lg-6 el-col-md-8 el-col-sm-12 el-col-xs-12",
            offCardHoverEffect: true
        },
    }
},
methods: {
    testSelect() {
        console.log('test:checkbox')
    },
    clear() {
        console.log('clear')
        // this.$refs.multipleTable.clearSelection();
    }
},
```

## 接口说明

## WEN-VUE-LIST Attributes 
`注意：`原el-table的功能都可以正常使用

Property | Type | Default | Values | Comments
 :-- |:--: |:--: |:--:|:--
config | Object | — — | 见config配置|config配置
user-id | String | — — | 通常都是用户的身份id标识 | 当组件需要开启记忆功能时，需要配置userId值【记忆功能必填项，与version同时使用】
id | String | — — | 自定义的字符串 | 当同一个页面有多个列表组件的时候，且需要开启记忆功能，需要给组件自定义id值用于区分，id与version无关，项目中tabel的代码修改，id一般不需要改变，`注意：id的改变会导致用户无法获取之前存储的配置记忆`
version | String | undefined | 自定义升级版本的字符串 | 用户记忆功能，用户点击过保存按钮，才开启记忆功能，之后如果 新增列、删除列、修改prop值（或colkey）、调整代码中column的顺序，都需要变动version【记忆功能必填项，该属性与user-id同时使用】
loading | Boolean | false | true、false | list模式生效，如果需要加载中这个状态，你可能还需要配置loading-text或slot="loading"，loading属性只负责是否展示加载状态，获取到数据后或接口报错时，请设置成false
loading-text | String | — — | 自定义的字符串 | list模式生效，可以自定义加载中的提示文案
search-text | String | — — | 自定义的字符串 | list模式生效，可以自定义数据为null、undefined的提示文案
empty-text | String | — — | 自定义的字符串 | list模式生效，可以自定义数据为[]的提示文案


# WEN-VUE-LIST Events
Property | Type | Default | Parameter | Comments
 :-- |:--: |:--: |:--:|:--
card-click | Function | — — | (index, row) | card形态卡片的点击回调
card-check-change | Function | — — | (val, row, index, data) | card形态卡片的勾选回调，参数data：已经选中的数据
card-allcheck-change | Function | — — | (val) | card形态卡片的全选回调，val：true/false

# WEN-VUE-LIST Methods 
Property | Parameter | Comments
 :-- |:--:|:--
clearSelection | - - | 清除所有选中的多选框
toggleAllSelection | - - | 切换所有行的选中状态

## Config配置
Property | Type | Default | Pattern | Values | Comments
 :-- |:--: |:--: |:--:|:--|:--
viewType | String | list | - - | 'list'、'card' | 初始化列表展示模式，默认为list
listField | Array | — — | 可使用模式list | column的prop或colkey | 初始化展示的可视列，列的展示顺序与该Array的顺序有关，如果为空，则展示所有的 wen-vue-list-column
showHeader| Boolean/Array | false | list | true,false,['btns', slotName, 'types'] | 组件头部的展示情况，Array：['btns', slotName, 'types']顺序可自定义，其中'btns'和'types'为固定字符串，如果Array中存在，则表示开启相应的功能，slotName为自定义模板的slot值。
showHeader| Boolean/Array | false | card | true,false,[slotName, 'types'] | 组件头部的展示情况，Array：[slotName, 'types']顺序可自定义，其中'types'为固定字符串，如果Array中存在，则表示开启相应的功能，slotName为自定义模板的slot值。
cardField | String/Array | — — | card | column的prop或colkey | card需要展示的字段，元素值同listField，如果为String类型，则表示card卡片完全自定义模板及样式，且只有prop为String的column有效，除此，你还需要在该column上设置属性coltype="card"
cardImage | String | — — | card | 卡片的图片字段名 | card可以自定义展示的图片，只需要配置字段名称就可以了（比如：'url'、'images.src'）,需要注意的是：cardImage跟column无关，哪怕column是图片展示列，card模式下，是否展示图片只跟cardImage有关
cardStyle | String/Object | — — | card | 卡片自定义class名称、重写行内样式 | 如果属性有-，请使用驼峰写法，cardStyle属性值如果是String类型,则追加class名，如果为Object，则可以重写class和style，比如{class:'', style: ''}，目前只支持class和style的重写【`提醒：`如非必要，请勿修改height相关设置，默认为100%，如果需要写margin属性，你可能需要重置height】
offCardHoverEffect | Boolean | false | card | true、false | card模式生效，关闭边框特效【包括鼠标悬浮及点击】
cardColStyle | String/Object | — — | card | 卡片自定义class名称、重写行内样式 | cardColStyle如果为String，则覆盖原始class【el-col-lg-6 el-col-md-8 el-col-sm-12 el-col-xs-24】写法请参照element的`layout布局`，cardColStyle如果为Object，则可以重写class和style，比如{class:'', style: ''}，目前只支持class和style的重写

`showHeader为Array注意事项：`header部分为flex布局，通常btns居左，types居右，slotName占中间剩余空间，当然，你也可以用Array自定义改变顺序
- btns：[列替换、可视化列编辑] 按钮组
- types：模式切换按钮组
- slotName：自定义部分，需在wen-vue-list标签内部自定义template模板，并且指定slot值，slotName为模板的slot值

## WEN-VUE-LIST-COLUMN Attributes
`注意：`原el-table-column的功能都可以正常使用

Property | Type | Default | Values | Comments
 :-- |:--: |:--: |:--:|:--
invalid | Boolean | false |  | 如果invalid存在，该列失效，如果要做隐藏展示功能，可以用这个属性
colkey | String | — — | 自定义`唯一`的字符串 | 自定义的key 
code | String/Array | — — | 权限code编码 | 操作列权限控制（该列的所有权限code），可以是“,”分隔的字符串或字符串数组
label | String | — — | 任何字符串 | list模式下表头的展示名称，需要特别注意的是，如果label的值为空，该列只纯展示，没有编辑及替换操作功能
nolabel | Boolean | false | true、false | 该属性只在card模式下启作用，如果存在该属性，表示不展示label值，默认如果label有值，都会展示
coltype | String | 'all' | 'list'、'card' | coltype标识column在什么模式下可见，默认在所有模式下都展示，有些特殊的需求是要将column设定为特定的模式才能正常展示的。比如：config.cardField的值为String时，请设置coltype='card'，否则在list模式下该column也会展示出来，这不是很科学
null-format | Boolean | true | false、true | 字段值是否需要nullFormat处理，默认开启。<br/>nullFormat处理：如果字段值为[undefined, null, "", NaN]其中之一，则展示成--<br/> 处理的前提：<br/>1、default作用域插槽`不存在`；<br/>2、必须存在prop属性；<br/>3、null-format属性为true；

- `colkey说明：`为了实现列替换和可视化列编辑功能，每一列需要一个固定的key值，colkey为自定义的key值优先级最高，如果colkey没有设置，则会将列的prop值做为列的key值，如果colkey和prop都不存在，则组件内部会根据下标自动生成一个key值，格式为_key${index}，colkey > prop > _key${index}