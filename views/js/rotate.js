var rotate = {
    direction:'vertical',
    changeDirection:function (direction) { //改变横竖屏
        if (direction == 'vertical') {
            this.direction = 'horizontal';
            // Toast('为了更好的体验，建议关掉手机自动旋转功能');
            window.onresize = this.detectOrient;
            this.detectOrient();
        } else {
            this.direction = 'vertical';
            window.onresize = this.detectOrient;
            this.detectOrient();
        }
    },
    detectOrient:function () { //手机横竖屏旋转
        var width = document.documentElement.clientWidth,
        height =  document.documentElement.clientHeight,
        $wrapper =  document.getElementById("weight_trendList"),
        style = "";
        var h = $wrapper.innerHeight
        var w = $wrapper.innerWidth
        if(height>width){ //系统竖屏
            if( this.direction =='vertical' ){  //表格竖屏
                style += "width:" + w + "px;";  // 注意旋转后的宽高切换
                style += "height:" + h + "px;";
                style += "-webkit-transform: rotate(0deg); transform: rotate(0deg);";
                style += "-webkit-transform-origin: 0 0;";
                style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
                $wrapper.className = 'rotate'
            }else{ //表格横屏
                style += "width:" + height+ "px;";
                style += "height:" + width + "px;";
                style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
                // 注意旋转中点的处理
                style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
                style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
                $wrapper.className = 'horizontal-fixed'
            }
            $wrapper.style.cssText = style;
        }else{ //系统横屏时表格旋转0deg
            style += "width:" + width+ "px;";
            style += "height:" + height + "px;";
            style += "-webkit-transform: rotate(0deg); transform: rotate(0deg);";
            // 注意旋转中点的处理
            style += "-webkit-transform-origin: " + width / 2 + "px " + width / 2 + "px;";
            style += "transform-origin: " + width / 2 + "px " + width / 2 + "px;";
            $wrapper.className = 'horizontal-fixed'
            $wrapper.style.cssText = style;
        }
    },
}