/**
 * Created by qiantianbing on 2016/2/3.
 */
;define(['exif'],function(){
    var Iosimage = function(dataURL,callback,max,quality){
        var img = new Image();
        img.onload = function(){
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var nW = this.naturalWidth;
            var nH = this.naturalHeight;
            var type = dataURL.match(/data:(.*);base64/)[1];
            max = max || 1000;
            quality = quality || 1;
            if(max <=1){
                max = 1000;
                quality = max;
            }
            var ratio = Math.floor(Math.max(nW/max,nH/max)) || 1;
            var x=0,y= 0,degree= 0,orientation;
            EXIF.getData(img,function(){
                orientation = EXIF.getTag(img,"Orientation");
                if(orientation == 6){
                    canvas.width = nH/ratio;
                    canvas.height = nW/ratio;
                    x=0; y=-canvas.width;
                    degree = Math.PI/2;
                }
                else if(orientation == 8){
                    canvas.width = nH/ratio;
                    canvas.height = nW/ratio;
                    x = -canvas.height; y = 0;
                    degree = -Math.PI/2;
                }
                else if(orientation == 3){
                    canvas.width = nW/ratio;
                    canvas.height = nH/ratio;
                    x = -canvas.width; y = -canvas.height;
                    degree = Math.PI;
                }
                else{
                    canvas.width = nW/ratio;
                    canvas.height = nH/ratio;
                }
                ctx.rotate(degree);
                ctx.drawImage(img,0,0,nW,nH,x,y,nW/ratio,nH/ratio);
                callback(canvas.toDataURL(type,quality));
            });
        }
        img.src = dataURL;
    }
    return Iosimage;
})