<template>  
<div class="example">
    <el-button @click="changeData([])">更改数据</el-button>
    <el-button @click="changeData2">更改数据2</el-button>
    <!-- <el-list user-id="chenxiaowen" :data="list" border :loading="loading" :config="config" class="card-list" @select-all="testSelect" id="wunai" version="v2" ref="multipleTable"
      @card-click="cardClick" highlight-current-row row-key="age.d"
      :row-class-name="tableRowClassName2" @row-click="rowclick2" 
      @card-check-change="cardCheckChange" @card-allcheck-change="cardAllcheckChange">
      <p slot="empty">ppppp</p>
      <i slot="loading" class="el-icon-loading"></i>
      <span slot="search" style="color: red">请点击查询按钮</span>
      <el-button slot="clear" @click="clear1">{{clearText1}}</el-button>
      <el-list-column
        type="selection"
        align="center"
        width="45">
      </el-list-column>
      <el-list-column width="100" label="" colkey="age" >
        <template slot="header" >
          <div>
            header sssss
          </div>
        </template>
        <template v-slot="slotProp">
          <div class="test">
             {{slotProp.row.age.x}}
            <span>ababa</span>
          </div>
        </template>
      </el-list-column>
      <el-list-column label="头像" colkey="url" >
        <template v-slot="slotProp">
          <div class="img">
             <img :src="slotProp.row.url" style="max-width:100px;max-height:100px;" />
          </div>
        </template>
      </el-list-column>
      <el-list-column prop="sex" label="sex" align="center" header-align="right" ></el-list-column>
      <el-list-column colkey="weightxxx" prop="weight" label="3体重" ></el-list-column>
      <el-list-column prop="address" label="4地址" align="right" ></el-list-column>
      <el-list-column prop="marriage" label="5婚否" ></el-list-column>
      
      
      <el-list-column prop="friend" label="6朋友" align="right" ></el-list-column>
      <el-list-column prop="7wocao" label="7wocao" align="left" ></el-list-column>
      <el-list-column prop="parent" label="8无解" align="center" invalid></el-list-column>

      <el-list-column width="100" align="right" >
        <template v-slot="slotProp">
          <div class="test">
            {{slotProp.row.name}}
          </div>
        </template>
      </el-list-column>
      <el-list-column coltype="list" colkey="coltype">
        <template v-slot="slotProp">
          coltype功能测试
        </template>
      </el-list-column>
      <el-list-column coltype="card" colkey="cardIsCustom">
        <template v-slot="slotProp">
          <p>全部自定义模板测试</p>
          <p>体重：{{slotProp.row.weight}}</p>
          <el-button type="text" @click="yesOrNo(slotProp)">click</el-button>
        </template>
      </el-list-column>
      <el-list-column colkey="name" fixed="right" width="200px">
        <p slot="header">操作</p>
        <template v-slot="slotProp">
          <div><el-button type="text" @click="chakan(slotProp)">{{clearText}}</el-button>
          <el-button type="text" @click="clear(slotProp.row)">删除</el-button>
          <el-button type="text" @click="yesOrNo(slotProp)">{{slotProp.row.weight}}</el-button>
          </div>
        </template>
      </el-list-column>
    </el-list> -->
  </div>
</template>

<script>
export default {
  name: 'example',
  components: {
  },
  data() {
    return {
      list: null,
      config: {
        // viewType: 'card',
        // listField: ['id', 'marriage','ssg','parent', 'address'],
        showHeader: ['btns', 'clear', 'types'],
        cardField: ['age', 'sex.x', 'weightxxx', 'address'],
        cardImage: 'url.img',
        cardStyle: "lastCard afijei",
        // cardColStyle: {
        //   class: '',
        //   style: ''
        // },
        // offCardHoverEffect: true
      },
      clearText: 'clear',
      clearText1: "清除数据",
      loading: false
    }
  },
  mounted() {
  },
  methods: {
    changeData2() {
      this.changeData([
          {
            id: '003',
            name: '003小文',                   
            sex: '男11',                     
            age: {
              d: 30,
              x: 18
            },
            weight: 55.5,
            address: '003北京市朝阳区来广营',
            education: '大专',
            nativePlace: '江西南昌',
            marriage: '已婚',
            birth: '是',
            spouseName: 'ashis11',
            record: '',
            company: '北京市某某公司',
            friend: '张萨满',
            parent: 'SASDHWHDS',
            brother: '阿斯蒂,十点的飞机,大幅高开',
            abs: '好汉跟我走，眼泪往下流',
            url: ''
          },
          {
            id: '004',
            name: '004小文',                   
            sex: '男11',                     
            age: {
              d: 31,
              x: 18
            },
            weight: 55.5,
            address: '004北京市朝阳区来广营',
            education: '大专',
            nativePlace: '江西南昌',
            marriage: '已婚',
            birth: '是',
            spouseName: 'ashis',
            record: '',
            company: '北京市某某公司',
            friend: '张萨满',
            parent: 'SASDHWHDS',
            brother: '阿斯蒂,十点的飞机,大幅高开',
            abs: '好汉跟我走，眼泪往下流',
            url: ''
          },
          {
            id: '003',
            name: '003小文',                   
            sex: '男11',                     
            age: {
              d: 32,
              x: 18
            },
            weight: 55.5,
            address: '003北京市朝阳区来广营',
            education: '大专',
            nativePlace: '江西南昌',
            marriage: '已婚',
            birth: '是',
            spouseName: 'ashis11',
            record: '',
            company: '北京市某某公司',
            friend: '张萨满',
            parent: 'SASDHWHDS',
            brother: '阿斯蒂,十点的飞机,大幅高开',
            abs: '好汉跟我走，眼泪往下流',
            url: ''
          },
          {
            id: '004',
            name: '004小文',                   
            sex: '男11',                     
            age: {
              d: 33,
              x: 18
            },
            weight: 55.5,
            address: '004北京市朝阳区来广营',
            education: '大专',
            nativePlace: '江西南昌',
            marriage: '已婚',
            birth: '是',
            spouseName: 'ashis',
            record: '',
            company: '北京市某某公司',
            friend: '张萨满',
            parent: 'SASDHWHDS',
            brother: '阿斯蒂,十点的飞机,大幅高开',
            abs: '好汉跟我走，眼泪往下流',
            url: ''
          },
        ])
    },
    changeData(list=[]) {
      this.loading = true
      setTimeout(() => {
        console.log(list)
        this.list = list
        this.loading = false
      }, 3000);
    },
    testSelect() {
      console.log('test:checkbox')
    },
    clear1(e) {
      console.log('clear')
      this.list = null
      this.clearText1 = '123'
    },
    clear: function(row) {
      console.log('clear')
      this.clearText = '123'
      this.$refs.multipleTable.toggleAllSelection();
    },
    cardClick(index, row) {
      console.log(index, row)
    },
    cardCheckChange(val, row, index, data) {
      console.log(val, row, index, data)
    },
    cardAllcheckChange(val) {
      console.log(val)
    },
    chakan({row}) {
      this.$refs.multipleTable.toggleRowSelection(row, true)
      console.log(21345, row)
    },
    yesOrNo(detail,) {
      let { row, $index } = detail;

      const personInfo = this.list.find((e,i) => i == $index);
      personInfo.weight = 1
      // if (this.isTagging) {
      //   personInfo.taggingResult = result;
      // } else {
      //   personInfo.checkResult = result;
      // }
      this.$set(this.list, $index, personInfo);
      console.log(row, $index)
    },
    // tableRowClassName2(row) {
    //   console.log(111, row)
    //   return 'test'
    // },
    rowclick2(row, column, event) {
      console.log(row, event)
    }
  },
}
</script>

<style lang="scss" scoped>
.example {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.rightdiv{
  flex: 1;
}
.wenshao{
  height: 300px;
}
.zidingyi {
  height: 100px;
}
.test{
  color: red
}
// .card-list{
//   /deep/.card:last-child{
//     // display: none;
//     flex: unset;
//     width: 30%;
//   }
// }
// /deep/ .card i{
//   animation: none !important; 
// }
// /deep/ .active i{
//   display: none !important;
// }
</style>
