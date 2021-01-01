/*upload image */
const uploadimg=document.querySelector(".upload-img") ;
const fileinput=document.querySelector(".input-img") ;
uploadimg.addEventListener("click",function(e){
    e.preventDefault();
    fileinput.click() ;
    fileinput.addEventListener("change",function(e){
        const writingpad=createbox() ;
        const img=document.createElement("img") ;
        let src=URL.createObjectURL(e.target.files[0]) ;
        img.src=src ;
        img.setAttribute("class","uploadedImgStyle") ;
        writingpad.appendChild(img) ;
        img.onload=function(){
            URL.revokeObjectURL(img.src);

        };


    });
});
///download image/////
const downloadTool = document.querySelector(".download-tool");
downloadTool.addEventListener("click", function(e) {
  const a=document.createElement("a");
  a.download="file.png";
a.href=board.toDataURL("image/png");
a.click();
a.remove()
});


