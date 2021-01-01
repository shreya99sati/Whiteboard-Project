//to create createbox for image and sticky
function createbox()
{
    const stickypad= document.createElement("div") ;
    const navbar=document.createElement("div") ;
    const writingpad=document.createElement("div") ;
    const minimize=document.createElement("div") ;
    const close=document.createElement("div") ;
    //there are 3 steps for dom 1-createlement,2-set property,3-append in tree
    //stylling add 
    stickypad.setAttribute("class","sticky-pad") ;
    navbar.setAttribute("class","nav") ;
    writingpad.setAttribute("class","writing-pad") ;
    close.setAttribute("class","close") ;
    minimize.setAttribute("class","minimize") ;
    //step 3 append in tree
    navbar.appendChild(minimize) ;
    navbar.appendChild(close) ;
    stickypad.appendChild(navbar) ;
    stickypad.appendChild(writingpad) ;
    //add whole sticky to body
    // document.body.appendChild(stickypad) ;
    close.addEventListener("click",function()
    {
        stickypad.remove() ;

    }) ;
    let isminimized=false ;
    minimize.addEventListener("click",function()
    {
        isminimized==false?(writingpad.style.display="none"):(writingpad.style.display="block") ;
        isminimized=!isminimized ;

    }) ;
    

    //functions to add move to sicky pad 
    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    navbar.addEventListener("mousedown",function(e)
    {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;

    }) ;
    navbar.addEventListener("mousemove", function(e) {
        if (isStickyDown == true) {
          let finalX = e.clientX;
          let finalY = e.clientY;
    
          let diffX = finalX - initialX;
          let diffY = finalY - initialY;
          let { top, left } = stickypad.getBoundingClientRect();
    
          stickypad.style.top = top + diffY + "px";
          stickypad.style.left = left + diffX + "px";   
          initialX = finalX;
          initialY = finalY;
        }
      });
      navbar.addEventListener("mouseup", function() {
        isStickyDown = false;
      });
      // pointer => moved off sticky
      navbar.addEventListener("mouseleave", function() {
        isStickyDown = false;
      });
      document.body.appendChild(stickypad) ;
      return writingpad ;
    
}




//utilities funtion to handle tool change
let Activetool="pencil" ;
const penciloptions=document.querySelector(".tool-options.pencil") ;
const eraseroptions=document.querySelector(".tool-options.eraser") ;
const tools=document.querySelectorAll(".tool") ;
const inputs = document.querySelectorAll("input[type=range]");

function handleToolChange(tool)
{
    if(tool=="pencil")
    {
        if(Activetool=="pencil")
      {
        penciloptions.classList.toggle("show") ;

        }
     else
     {
        Activetool="pencil" ;
        eraseroptions.classList.remove("show") ;
        tools[1].classList.remove("active") ;
        tools[0].classList.add("active") ;
        ctx.strokeStyle="blue" ;
        ctx.lineWidth = inputs[0].value;
      ctx.globalCompositeOperation = "source-over";

     }

    }
    else if(tool=="eraser")
    {
        if(Activetool=="eraser")
        {
            eraseroptions.classList.toggle("show");
        }
        else
        {
            Activetool="eraser" ;
            // console.log(tool[1].classList);
            penciloptions.classList.remove("show") ;
        tools[0].classList.remove("active") ;
        tools[1].classList.add("active") ;
       
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = inputs[0].value;
  


        }


    }
    else if(tool=='sticky')
    {
        createsticky() ;

    }
    
}
//********undo stack -- */
let undoStack=[] ;
let redoStack=[] ;
function undomaker()
{
  if(undoStack.length>0)
  {
    redoStack.push(undoStack.pop()) ;
    redraw() ;
    return true ;
   
  }
  
    return false ;
  
  

}
function redomaker()
{
  if(redoStack.length>0)
  {
    undoStack.push(redoStack.pop()) ;
    redraw() ;
    return true;
  }
  return false;
   
  
}


// utility fn to handle handleHamburger icon
let isActive = true;
function handleHamburger() {
  if (isActive == true) {
    hamburger.classList.remove("is-active");
    toolPanel.classList.remove("add-animation");
  } else {
    hamburger.classList.add("is-active");
    toolPanel.classList.add("add-animation");
  }

  isActive = !isActive;
}



