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