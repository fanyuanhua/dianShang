<template>
  <div class="list-container">


    <!--banner轮播-->
    <div class="swiper-container" ref="mySwiper">
      <!-- swiper-wrapper里面每一个slider即为一张图片 -->
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          2233
          <img width="100%" height="100%" src="../../assets/1.png" alt="">
        </div>
        <div class="swiper-slide">
          2233
        </div>
        <div class="swiper-slide">
          2233
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <div id="echart" style="width:200px;height:200px"></div>



  </div>
</template>
  
<script>

//swiper使用步骤:
//第一步:引入依赖包、样式
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import * as echarts from 'echarts';

export default {
  name: "",
  mounted() {
    // var mySwiper = new Swiper(document.querySelector(".swiper-container"), {
    //     // this.$ref.mySwiper
    //     //设置轮播图方线
    //     // direction: "horizontal",
    //     //开启循环模式
    //     loop: true,
    //     // 如果需要分页器
    //     pagination: {
    //       el: ".swiper-pagination",
    //       //分页器类型
    //       type: "bullets",
    //       //点击分页器，切换轮播
    //       clickable: true,
    //     },
    //     //自动轮播
    //     // autoplay: {
    //     //   delay: 1000,
    //     //   //新版本的写法：目前是5版本
    //     //   // pauseOnMouseEnter: true,
    //     //   //如果设置为true，当切换到最后一个slide时停止自动切换
    //     //   stopOnLastSlide: true,
    //     //   //用户操作swiper之后，是否禁止autoplay
    //     //   disableOnInteraction: false,
    //     // },
    //     // 如果需要前进后退按钮
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     //切换效果
    //     // effect: "cube",
    //   });

    //   //1:swiper插件,对外暴露一个Swiper构造函数
    //   //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
    //   //鼠标进入停止轮播
    // //   mySwiper.el.onmouseover = function () {
    // //     mySwiper.autoplay.stop();
    // //   };
    // //   //鼠标离开开始轮播
    // //   mySwiper.el.onmouseout = function () {
    // //     mySwiper.autoplay.start();
    // //   };
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      effect: 'coverflow',

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        type: "bullets",
        //点击分页器，切换轮播
        clickable: true,
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })

    var chartDom = document.getElementById('echart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: 'Basic Radar Chart'
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);

  }
}
</script>
  
<style scoped lang="less">
.swiper-container {
  width: 600px;
  height: 300px;
}
</style>
  