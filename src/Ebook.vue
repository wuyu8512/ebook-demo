<template>
 <div class="ebook">
  <div style="margin:auto 5%">
   <input type="file" id="input"/>
  </div>
  <title-bar :isTitleShow="isTitleShow" ref="titleBar"></title-bar>
  <div class="read-wrapper">
   <div id="read"></div>
  </div>
  <menu-bar
   :isMenuShow="isMenuShow"
   :fontSizeList="fontSizeList"
   :defaultFontSize="defaultFontSize"
   ref="menuBar"
   @setFontSize="setFontSize"
   :themeList="themeList"
   :defaultTheme="defaultTheme"
   @setTheme="setTheme"
   :bookAvailabel="bookAvailabel"
   @onProgressChange="onProgressChange"
   :nav="nav"
   @jumpTo="jumpTo"
   @hideTitle="hideTitle"
  ></menu-bar>
 </div>
</template>

<script>
    import TitleBar from "./components/TitleBar";
    import MenuBar from "./components/MenuBar";
    import Epub from "../public/epub";
    import imgUrlYello from "@/assets/images/reading__reading_themes_vine_yellow.jpg";
    import imgUrlBlack from "@/assets/images/reading__reading_themes_vine_dark.png";
    const DOWLOAD_URL = ''
    global.ePub = Epub
    var myVue = {};
    export default {
        components: {
            TitleBar,
            MenuBar
        },
        data() {
            return {
                isMenuShow: false,
                isTitleShow: false,
                fontSizeList: [
                    {
                        fontSize: 14
                    },
                    {
                        fontSize: 16
                    },
                    {
                        fontSize: 18
                    },
                    {
                        fontSize: 20
                    },
                    {
                        fontSize: 22
                    },
                    {
                        fontSize: 24
                    },
                    {
                        fontSize: 26
                    }
                ],
                defaultFontSize: 18,
                themeList: [
                    {
                        name: "default",
                        style: {
                            body: {
                                color: "#000",
                                background: "transparent",
                                "word-wrap": "break-word"
                            }
                        },
                        back: `url(${imgUrlYello})`
                    },
                    {
                        name: "light",
                        style: {
                            body: {
                                color: "#000",
                                background: "transparent",
                                "word-wrap": "break-word"
                            }
                        },
                        back: "#d4cdb5"
                    },
                    {
                        name: "dark",
                        style: {
                            body: {
                                color: "#fff",
                                background: "transparent",
                                "word-wrap": "break-word"
                            }
                        },
                        back: `url(${imgUrlBlack})`
                    },
                    {
                        name: "eye",
                        style: {
                            body: {
                                color: "#000",
                                background: "transparent",
                                "word-wrap": "break-word"
                            }
                        },
                        back: "rgb(182, 224, 142)"
                    }
                ],
                defaultTheme: 2,
                bookAvailabel: false,
                nav: {}
            };
        },
        methods: {
            // 解析渲染
            showEpub(book) {
                console.log(book);
                document.getElementById("input").style.display = "none";
                // 生成Book对象
                this.book = book;
                // 生成
                this.rendition = this.book.renderTo("read", {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
                // 注册事件
                const mousewheelevt = /Firefox/i.test(navigator.userAgent)
                    ? "DOMMouseScroll"
                    : "mousewheel";
                this.rendition.hooks.content.register(function (contents) {
                    contents.document.addEventListener(
                        mousewheelevt,
                        e => {
                            console.log(e);
                            if (e.detail) {
                                e.detail > 0 ? this.next() : this.prev();
                            } else {
                                e.deltaY > 0 ? this.next() : this.prev();
                            }
                            myVue.hide();
                        },
                        true
                    );
                });
                this.rendition.on("click", e => {
                    if (myVue.$refs.menuBar.ifShowContent) {
                        this.isMenuShow = false;
                        myVue.$refs.menuBar.hideContent();
                        return;
                    }
                    if (
                        e.target.localName === "a" ||
                        e.target.parentNode.localName === "a"
                    ) {
                        this.hide();
                        return;
                    }
                    if (e.x % window.innerWidth > window.innerWidth * 0.75) {
                        this.rendition.next();
                        console.log("下一页");
                        this.hide();
                    } else if (e.x % window.innerWidth < window.innerWidth * 0.25) {
                        this.rendition.prev();
                        console.log("上一页");
                        this.hide();
                    } else if (
                        e.clientY < window.innerHeight * 0.75 &&
                        e.clientY > window.innerHeight * 0.25
                    ) {
                        if (this.isMenuShow || myVue.$refs.menuBar.ifShowContent) {
                            this.hide();
                        } else this.show();
                        // if (!this.isMenuShow) this.$refs.menuBar.hideSetting()
                    }
                });
                // 得到thems对象
                this.themes = this.rendition.themes;
                // 设置默认字体
                this.setFontSize(this.defaultFontSize);
                // 渲染
                this.rendition.display();
                // 注册主题
                this.registerTheme();
                this.setTheme(this.defaultTheme);
                // 读取locations实现进度条
                this.book.ready
                    .then(() => {
                        // 修改网页title
                        document.title = this.book.package.metadata.title;
                        this.nav = this.book.navigation;
                        return this.book.locations.generate();
                    })
                    .then(() => {
                        this.locations = this.book.locations;
                        this.bookAvailabel = true;
                        this.$refs.titleBar.setText("加载完成");
                        setTimeout(function () {
                            myVue.$refs.titleBar.hide();
                        }, 2000);
                    });
            },
            setFontSize(fontSize) {
                this.defaultFontSize = fontSize;
                if (this.themes) {
                    this.themes.fontSize(fontSize + "px");
                }
            },
            registerTheme() {
                this.themeList.forEach(theme => {
                    this.themes.register(theme.name, theme.style);
                });
            },
            setTheme(index) {
                this.themes.select(this.themeList[index].name);
                document.body.style.background = this.themeList[index].back;
                this.defaultTheme = index;
            },
            onProgressChange(progress) {
                const percentage = progress / 1000;
                const location =
                    percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
                this.rendition.display(location);
            },
            jumpTo(href) {
                this.rendition.display(href);
                this.hide();
            },
            hide() {
                if (myVue.isMenuShow || myVue.$refs.menuBar.ifShowContent) {
                    myVue.isMenuShow = false;
                    myVue.isTitleShow = false;
                    if (!myVue.isMenuShow) myVue.$refs.menuBar.hideSetting();
                }
                if (myVue.bookAvailabel) {
                    myVue.$refs.menuBar.setProgress(
                        parseInt(
                            myVue.locations.percentageFromCfi(
                                myVue.rendition.location.start.cfi
                            ) * 1000
                        )
                    );
                }
            },
            hideTitle() {
                this.isTitleShow = false;
            },
            show() {
                this.isMenuShow = true;
                this.isTitleShow = true;
            }
        },
        mounted() {
            myVue = this;
            inputEvent()
            // test();
        }
    };
    window.addEventListener(
        "resize",
        () => {
            if (myVue.rendition) {
                myVue.rendition.resize(window.innerWidth, window.innerHeight);
                myVue.rendition.settings.width = window.innerWidth;
            }
        },
        false
    );

    // eslint-disable-next-line no-unused-vars
    function show(e) {
        var book = new Epub();
        book.open(e.target.result);
        myVue.showEpub(book);
    }

    // eslint-disable-next-line no-unused-vars
    function test() {
        var book = new Epub(DOWLOAD_URL);
        myVue.showEpub(book);
    }

    // eslint-disable-next-line no-unused-vars
    function inputEvent() {
        var inputElement = document.getElementById("input");
        inputElement.addEventListener(
            "change",
            function (e) {
                var file = e.target.files[0];
                console.log(file);
                if (window.FileReader) {
                    var read = new FileReader();
                    read.onload = show;
                    read.readAsArrayBuffer(file);
                }
            },
            false
        );
    }
</script>

<style lang="scss" scoped>
 @import "assets/styles/global.scss";

 .ebook {
  position: relative;

  .read-wrapper {
   .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;

    .left {
     flex: 0 0 px2rem(100);
    }

    .center {
     flex: 1;
    }

    .right {
     flex: 0 0 px2rem(100);
    }
   }
  }
 }
</style>
