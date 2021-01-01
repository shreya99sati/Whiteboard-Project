

//server to all other members 
socket.on("onmd",function(point){
    
    const {X,Y,color,width}=point ;
    ctx.lineWidth=width ;
    ctx.strokeStyle=color ;
    ctx.beginPath() ;
    ctx.moveTo(X,Y) ;
    undoStack.push(point);

}) ;     
socket.on("onmv", function(point) {
    const { X, Y, color, width } = point;
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineTo(X, Y);
    ctx.stroke();
    undoStack.push(point);
  });
  socket.on("onsize", function(size) {
    ctx.lineWidth = size;
  });
  socket.on("oncolor", function(color) {
    ctx.strokeStyle = color;
  });
  socket.on("ontoolchange", function(tool) {
    handleToolChange(tool) ;
  });
  socket.on("onhamburger", function() {
    handleHamburger();
  });
  socket.on("onundo", function() {
    undomaker();
  });
  socket.on("onredo", function() {
    redomaker();
  });