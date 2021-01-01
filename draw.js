

let board=document.querySelector(".board") ;
board.height=window.innerHeight ;
board.width=window.innerWidth ;
//now  canvasrenderingcontext2d object used to draw on canvas=>tool

let ctx=board.getContext('2d') ;
ctx.strokeStyle = "blue";
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3; 

let ismousedown=false ;
board.addEventListener("mousedown",function(e)
{
    ismousedown=true ;
    let x=e.clientX ;
    let y=e.clientY-getbound() ;
    ctx.beginPath() ;
    ctx.moveTo(x,y) ;
    //storing points  for undo functions
    let point={
        X:e.clientX ,
        Y:e.clientY-getbound() ,
        identifier:"mousedown",
        color:ctx.strokeStyle,
        width:ctx.lineWidth

    } 
    undoStack.push(point) ;
    socket.emit("mousedown",point) ;


}) ;
board.addEventListener("mousemove",function(e)
{
   
    let x=e.clientX ;
    let y=e.clientY-getbound() ;
    if(ismousedown)
    {
        ctx.lineTo(x,y) ;
        ctx.stroke() ;
        let point={
            X:e.clientX ,
            Y:e.clientY-getbound(),
            identifier:"mousemove",
            color:ctx.strokeStyle,
            width:ctx.lineWidth
    
        } 
        undoStack.push(point) ;
        socket.emit("mousemove",point) ;



    }
});
 board.addEventListener("mouseup",function(e)
 {
     ismousedown=false ;

 }) ;

 board.addEventListener("mouseleave",function(e)
 {
     ismousedown=false ;

 }) ;


 const undo=document.querySelector(".undo") ; 
 const redo=document.querySelector(".redo") ;

 let interval=null ;
 undo.addEventListener("mousedown", function() {
     interval=setInterval(function() {

        if(undomaker()) socket.emit("undo") ;
     },50);

  });
  undo.addEventListener("mouseup", function() {
    clearInterval(interval);
  });

  redo.addEventListener("mousedown", function() {
   
    interval=setInterval(function() {
        if(redomaker()) socket.emit("redo") ;
     },50);

});
redo.addEventListener("mouseup", function() {
    clearInterval(interval);
  });
  
  function redraw()
{
  ctx.clearRect(0, 0, board.width, board.height);
  for(let i=0;i<undoStack.length;i++)
  {
    let{X,Y,identifier,color,width}=undoStack[i] ;
    ctx.strokeStyle=color ;
    ctx.lineWidth=width ;
    if (identifier == "mousedown") {
      ctx.beginPath();
      ctx.moveTo(X, Y);
    } else if (identifier == "mousemove") {
      ctx.lineTo(X, Y);
      ctx.stroke();
    }


  }
}

 function getbound()
 {
     let obj=board.getBoundingClientRect() ;
     return obj.top;

 }


