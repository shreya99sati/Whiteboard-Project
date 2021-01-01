

function handleLocaltoolChange(tool)
{
    handleToolChange(tool) ;
    if (tool != "sticky");
    socket.emit("toolchange", tool);

}
function handlecolorchange(color)
{
    ctx.strokeStyle=color ;
    socket.emit("color", color);
    

}
function sizeChange(value) {
    ctx.lineWidth = value;
    socket.emit("size", value);
}
const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function() {
   handleHamburger() 

  socket.emit("hamburger");
});