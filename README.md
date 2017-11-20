#Exif.js

A JavaScript library for reading EXIF meta data from JPEG image files.
>引入exif.js
<script src="js/exif.js"></script>
    <script type="text/javascript">
     //上传图片 
     // document.write(document.compatMode == "CSS1Compat" ? "当前处于标准模式" : "当前处于混杂模式");
      $("#markimg").change(function(){
        // var objUrl = getObjectURL(this.files[0]);
        //     console.log("objUrl = "+objUrl) ;
        // if (objUrl) {
        //   $("#addpic").attr("src", objUrl);
        //   $(".add").hide();
        //   $(".addsteptwo").show();
        //   }
        var file = this.files[0];
            var orientation;
            if(window.FileReader){//使用fileReader以base64编码保存图片
                var fr=new FileReader();
                fr.onload=function(e){
                  var dataURL=this.result;
                  var img = new Image();
                  console.log(img.width)
                  img.onload = function(){
                      EXIF.getData(img,function(){
                       orientation = EXIF.getTag(img,"Orientation");
                        // console.log(orientation);
                      });
                      console.log(orientation);
                      switch(orientation) {
                            case 1:
                                break;
                            case 6:
                                console.log(orientation);
                                $("#addpic").css("transform","rotate(90deg)");
                                $("#addpic").css("-webkit-transform","rotate(90deg)");
                                break;
                            case 3:
                                 $("#addpic").css("transform","rotate(180deg)");
                                 $("#addpic").css("-webkit-transform","rotate(180deg)");
                                break;
                            case 8:
                                 $("#addpic").css("transform","rotate(270deg)");
                                 $("#addpic").css("-webkit-transform","rotate(270deg)");
                                break;
                            case undefined:
                                break;
                            default:
                                break;
                        }
                  }
                  img.src=dataURL;
                  $("#addpic").attr("src", dataURL);
                  $(".add").hide();
                  $(".addsteptwo").show();
                }
                fr.readAsDataURL(file);
            }
        });
    
    
    
    
    
 ```
    $('#file').change(function(){
	var fileInput=document.getElementById("file").files;
	if (fileInput[0]==undefined) {
		$('.upload-btn').css('display','block');
		$('.file-img-bg img').css('display','block');
		$('.file-img-bg p').css('display','block');
		$('#img-show').css('display','none');
		$('.file-img-xz').css('display','none');
	}else{
		var file_url=window.URL.createObjectURL(fileInput[0]);
		$('.file-img-bg img').css('display','none');
		$('.file-img-bg p').css('display','none');
		$('.file-img-xz').attr('style','');

		if (!selectFileImage()) {
			$('.file-img-xz').css('background','url('+file_url+') no-repeat center center').css('background-size','100%').css('display','block');
		}else{
			$('.file-img-xz').css('background','url('+file_url+') no-repeat center center').css('background-size','100%').css('display','block');
		}
		
		
	}
	
})

    function selectFileImage() {  
    var file = document.getElementById("file").files['0'];  
    //图片方向角 added by lzk  
    var Orientation = null;  
      
    if (file) {   
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式  
        if (!rFilter.test(file.type)) {
            return;  
        }  
        //获取照片方向角属性，用户旋转控制  
        EXIF.getData(file, function() {  
            EXIF.getAllTags(this);     
            Orientation = EXIF.getTag(this, 'Orientation');  
        });  
          
        var oReader = new FileReader();  
        oReader.onload = function(e) {  
            //var blob = URL.createObjectURL(file);  
            //_compress(blob, file, basePath);  
            var image = new Image();  
            image.src = e.target.result;  
            image.onload = function() {  
                var expectWidth = this.naturalWidth;  
                var expectHeight = this.naturalHeight;  
                  
                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {  
                    expectWidth = 800;  
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;  
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {  
                    expectHeight = 1200;  
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;  
                }  
                var canvas = document.createElement("canvas");  
                var ctx = canvas.getContext("2d");  
                canvas.width = expectWidth;  
                canvas.height = expectHeight;  
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);  
                var base64 = null;  
                //修复ios  
                if (navigator.userAgent.match(/iphone/i)) {  
                    //如果方向角不为1，都需要进行旋转 added by lzk  
                    if(Orientation != "" && Orientation != 1){   
                        switch(Orientation){  
                            case 6://需要顺时针（向左）90度旋转  
                                setCss3(document.getElementById('file-img-xz'),{transform:"rotate(90deg)","transform-origin":"50% 50%"});
                                $('#file-img-xz').css('background-size','120%');
                                break;  
                            case 8://需要逆时针（向右）90度旋转   
                                setCss3(document.getElementById('file-img-xz'),{transform:"rotate(-90deg)","transform-origin":"50% 50%"});  
                                $('#file-img-xz').css('background-size','120%');
                                break;  
                            case 3://需要180度旋转  
                                setCss3(document.getElementById('file-img-xz'),{transform:"rotate(180deg)","transform-origin":"50% 50%"});
                                break;  
                        }         
                    }  
                    return true;  
                }else{   
                    if(Orientation != "" && Orientation != 1){   
                        switch(Orientation){  
                            case 6://需要顺时针（向左）90度旋转   
                                setCss3(document.getElementById('file-img-xz'),{transform:"rotate(90deg)","transform-origin":"50% 50%"}); 
                                break;  
                            case 8://需要逆时针（向右）90度旋转  
                                setCss3(document.getElementById('file-img-xz'),{transform:"rotate(-90deg)","transform-origin":"50% 50%"});  
                                break;  
                            case 3://需要180度旋转  
                                setCss3(document.getElementById('file-img-xz'),{transform:"rotate(180deg)","transform-origin":"50% 50%"});
                                break;  
                        }         
                    }  
                    return true;   
                }  
                
            };  
        };  
        oReader.readAsDataURL(file);  
    }  
} 

function setCss3(obj,objAttr){
    //循环属性对象
    for(var i in objAttr){
        var newi=i;
        //判断是否存在transform-origin这样格式的属性
        if(newi.indexOf("-")>0){
            var num=newi.indexOf("-");
            newi=newi.replace(newi.substr(num,2),newi.substr(num+1,1).toUpperCase());
        }
        //考虑到css3的兼容性问题,所以这些属性都必须加前缀才行
        obj.style[newi]=objAttr[i];
        newi=newi.replace(newi.charAt(0),newi.charAt(0).toUpperCase());
        obj.style[newi]=objAttr[i];
        obj.style["webkit"+newi]=objAttr[i];
        obj.style["moz"+newi]=objAttr[i];
        obj.style["o"+newi]=objAttr[i];
        obj.style["ms"+newi]=objAttr[i];
    }
}


  $('.form button').click(function(){
	var fileInput=document.getElementById("file").files;
	if (fileInput[0]==undefined) {
		alert('请先选择一张图片');
		return false;
	}
	if (! /^image/.test(fileInput[0]['type'])) {
        alert('文件格式错误，请重新选择图片');
        return false;
    } 

    /*if (fileInput[0].size > 1024 * 1024 * 5) {
        alert('图片过大， 最大为 5 M');
        return false;
    }*/
    $('#preloader').css('display','block');
    lrz(fileInput[0], {width: 303})
    .then(function (rst) {

        $.ajax({
            type: "POST",

```
