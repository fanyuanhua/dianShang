<template>
  <div>
    <!-- 首页路由组件 -->
    <!-- 商品分类子组件 -->
    <typeNav></typeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like ref="like"></Like>
    <!-- 
       Floor标签,通过v-for动态生成
       父子组件通信:props

       问题:VC[Home]身上的floorList这个属性的属性值有几种情况?

       仓库floorList:起始值 空数组
       仓库floorList:不是空数组,代表服务器数据回来了。v-for渲染子组件完毕。给组件的props,就是两个对象
    
    -->
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :floor="floor"
    ></Floor>
    <Brand></Brand>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button @click="up">anmiu</el-button>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
//局部组件:引入、注册、使用
//全局组件：只需要在入口文件定义一次,直接使用
import ListContainer from "./listContainer";
import Recommend from "./recommend";
import Rank from "./rank";
import Like from "./like";
import Floor from "./floor";
import Brand from "./brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  data(){
    return {
      value1: '',
      imageUrl: ''
    }
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  //组件挂载完毕钩子
  mounted() {
    this.$store.dispatch("getFloorList");
    console.log(this);
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }), 
    // ...mapState(['floorList']),
  },
  methods:{
    up(){
      this.a={a:1}
      this.b=this.a//把a的地址给b
      this.b.a=2
      this.b={b:3}//把这个对象的地址给b
      console.log(this.b,this.a);
      this.$router.push('/ceshi')
      
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
  
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
