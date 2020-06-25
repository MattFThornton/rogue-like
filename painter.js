const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#443737";
ctx.clearRect(0, 0, canvas.width, canvas.height);
let rects = [];
let mode = 1;
function remove(mouseEvent){
    var obj = canvas;
    var obj_left = 0;
    var obj_top = 0;
    var xpos;
    var ypos;
    while (obj.offsetParent)
    {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
    }
    if (mouseEvent)
    {
    //FireFox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
    }
    else
    {
    //IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
    }
    xpos -= obj_left;
    ypos -= obj_top;
    let o;
    ctx.fillStyle = "#272121";
    for (o of rects){
        if (xpos < o[0] + 22.5 && xpos > o[0] - 22.5 && ypos < o[1] + 22.5 && ypos > o[1] - 22.5) {
            ctx.fillRect(o[0]-22.5, o[1]-22.5, 45, 45);
            o[2] = 0;
        }
    }
    //ctx.fillRect(xpos-22.5, ypos-22.5, 45, 45);
    paintMap();
}
function paint(mouseEvent){
    var obj = canvas;
    var obj_left = 0;
    var obj_top = 0;
    var xpos;
    var ypos;
    while (obj.offsetParent)
    {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
    }
    if (mouseEvent)
    {
    //FireFox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
    }
    else
    {
    //IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
    }
    xpos -= obj_left;
    ypos -= obj_top;
    let o;
    if (mode === 1){
        ctx.fillStyle = "#443737";
    } else{
        ctx.fillStyle = "#ff0000";
    }
    for (o of rects){
        if (xpos < o[0] + 22.5 && xpos > o[0] - 22.5 && ypos < o[1] + 22.5 && ypos > o[1] - 22.5) {
            ctx.fillRect(o[0]-22.5, o[1]-22.5, 45, 45);
            o[2] = mode;
        }
    }
    //ctx.fillRect(xpos-22.5, ypos-22.5, 45, 45);
    paintMap();
}
document.getElementById("canvas").onclick = paint;
document.getElementById("canvas").ondblclick = remove;
function paintMap(){
        //x = 860;
    //y = 360;
    for (n of data[0].walls){
        ctx.fillStyle = "#443737";
        ctx.fillRect(n[0]+860, n[1]+360, 45, 45);
    }
    i = 0;
    while(i<17){
        ctx.beginPath();
        ctx.moveTo(500+i*45,0);
        ctx.lineTo(500+i*45,720);
        ctx.stroke(); 
        i++;
    }
    i = 0;
    while(i<17){
        ctx.beginPath();
        ctx.moveTo(500,0+i*45);
        ctx.lineTo(1220,0+i*45);
        ctx.stroke(); 
        i++;
    }
    if (rects.length < 1){
        n = 0;
        while (n < 16){
            i=0;
            while (i<16){
                rects.push([522.5+(45*i),22.5+(45*n),0]);
                i++;
            }
            n++;
        }
    }
    centerx = 860;
    centery = 360;
    document.getElementById("output").value = ' {walls:[';
    //ctx.fillRect(centerx-22.5, centery-22.5, 45, 45);
    let walls = [];
    for (x of rects){
        if (x[2] === 1){
            t = x[0] - centerx - 22.5;
            y = x[1] - centery - 22.5;
            walls.push([t,y]);
            document.getElementById("output").value += `[${t},${y}],`;
        }
    }
    //let str = document.getElementById("output").value;
    //document.getElementById("output").value = str.substring(0, str.length - 5);
    document.getElementById("output").value += ' ],spawns:[';
    for (x of rects){
        if (x[2] === 2){
            t = x[0] - centerx - 22.5;
            y = x[1] - centery - 22.5;
            walls.push([t,y]);
            document.getElementById("output").value += `[${t},${y}],`;
        }
    }
    document.getElementById("output").value += ']},';
}
function modeSet(input){
return mode = input;
}
function copy() {
    var copyText = document.getElementById("output");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
paintMap();