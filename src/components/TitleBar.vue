<template>
<transition name="slide-down">
  <div class="title-wrapper" v-show="isTitleShow">
    <div class="left">
      <span class="icon-back icon"></span>
    </div>
    <transition name="fade">
    <p class="text" ref="titleText"  v-show="textShow">书籍加载中...</p>
    </transition>
    <div class="right">
      <div class="icon-wrapper">
        <span class="icon-cart icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-person icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-more icon"></span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    isTitleShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      textShow: true
    }
  },
  methods: {
    setText (text) {
      this.$refs.titleText.textContent = text
    },
    hide () {
      this.textShow = false
    }

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global.scss";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(48);
  display: flex;
  background: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba($color: #000000, $alpha: 0.15);

  .text {
    width: 100%;
    @include center;
    font-size: px2rem(12);
  }

  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    flex: 1;

    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }

  }
}
</style>
