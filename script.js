// https://nerdparadise.com/programming/javascriptmouseposition
// info on mouse position
// enemy color ff0000
// player color ff4d00
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let x = 0;
let y = 0;
let pchange = [0,0];
let xypos = [-50000,-500000]
//set colors
const wall = "#443737";
const player = "#ff4d00";
const enemy = "#ff0000";

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 87) {
        //y+=-45;
        pchange[1] = -45;
        //2mapUpdate();
    }
    if (event.isComposing || event.keyCode === 83) {
        //y+=45;
        pchange[1] = 45;
        //mapUpdate();
    }
    if (event.isComposing || event.keyCode === 65) {
        //x+=-45;
        pchange[0] = -45;
        //mapUpdate();
    }
    if (event.isComposing || event.keyCode === 68) {
        //x+=45;
        pchange[0] = 45;
        //mapUpdate();
    }
    
  });
  function aim(mouseEvent){
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
    //ctx.fillRect(xpos-22.5, ypos-22.5, 45, 45);
    xypos = [xpos,ypos]
    return xypos

}
document.getElementById("canvas").onmousemove = aim;
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
function makeRoom(cx,cy,index){
    //x = 860;
    //y = 360;
    ctx.fillStyle = wall;
    for (n of data[0].walls){ //creates outer walls
        ctx.fillRect(n[0]+cx, n[1]+cy, 45, 45);
        mapWalls.push([n[0]+cx,n[1]+cy])
    }
    for (n of data[index].walls){ // creates inner walls
        ctx.fillRect(n[0]+cx, n[1]+cy, 45, 45);
        mapWalls.push([n[0]+cx,n[1]+cy])
    }
    ctx.fillStyle = enemy;
    for (n of data[index].spawns){ 
        ctx.fillRect(n[0]+cx, n[1]+cy, 45, 45);
        mapEnemies.push([n[0]+cx,n[1]+cy])
    }
}
function mapInit(){
    ctx.fillStyle = player;
    ctx.fillRect(860, 360, 45, 45);
    roomnum = 6;
    cx = 860;
    cy = 360;
    roomCenters = [[cx,cy]];
    c = 0;
    mapWalls = [];
    mapEnemies = [];
    mapOpenings = [[0,0,0,0]];
    makeRoom(cx,cy,0);
    i = 0;
    while (i < roomnum){
        inc = Math.floor(Math.random() * 4); 
        let change = [0,0]
        if (inc === 0){ //move right
            //cx += 675; 
            change[0] = 675;
        } else if (inc === 1){ //move down
            //cy += -675; 
            change[1] = -675;
        } else if (inc === 2){ //move left
            //cx += -675; 
            change[0] = -675;
        } else if (inc === 3){ //move up
            //cy += 675; 
            change[1] = 675;
        }
        let flag = 0;
        for (m of roomCenters){
            if (cx+change[0] === m[0] && cy+change[1] === m[1]){
                flag = 1;
            }
        }
        if (flag === 0){
            cx += change[0];
            cy += change[1];
            roomCenters.push([cx,cy]);
            mapOpenings.push([0,0,0,0]);
            ctx.fillStyle = wall;
            index = getRandom(5,data.length-1)
            makeRoom(cx,cy,index);
            i++;
        }
    } 
    for (g of roomCenters){ //inspired by YandereDev
        sides = [[g[0]-675,g[1]],[g[0],g[1]-675],[g[0]+675,g[1]],[g[0],g[1]+675]];
        i=0;
        for (m of roomCenters){
            if(m !== g){
                c = 0;
                for (j of sides){
                    if (m[0] === j[0] && m[1] === j[1]){
                        mapOpenings[i][c] = 1;
                    }
                    c++;
                }
            }
            i++;
        }
    }
    i = 0;
    for (g of mapOpenings){
        coords = roomCenters[i];
        c = 0;
        for(m of g){
            c++;
            if (m !== 1){
                ctx.fillStyle = wall;
                for (n of data[c].walls){ //creates outer walls
                    ctx.fillRect(n[0]+coords[0], n[1]+coords[1], 45, 45);
                    mapWalls.push([n[0]+coords[0],n[1]+coords[1]])
                }
            }
        }
        i++;
    }
    return mapWalls;
}
function mapUpdate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player;
    ctx.fillRect(860, 360, 45, 45);
    ctx.fillStyle = wall;   
    if (pchange[0] !== 0 || pchange[1] !== 0){ 
        for (o of mapWalls){
            if(o[0] === 860+x+pchange[0] && o[1] === 360+y+pchange[1]){
                pchange = [0,0]
            }
        }
        x += pchange[0];
        y += pchange[1];
        pchange = [0,0];
    }
    for (o of mapWalls){
        ctx.fillRect(o[0] - x, o[1] - y, 45, 45);
    }
    ctx.fillStyle = enemy;
    for (o of mapEnemies){
        ctx.fillRect(o[0] - x, o[1] - y, 45, 45);
    }
    ctx.fillStyle = 'white';
    for (o of mdata[0]){
        ctx.fillRect(o[0] + xypos[0]-2.5, o[1] + xypos[1] -2.5, 5, 5);
    }
}

ctx.clearRect(0, 0, canvas.width, canvas.height);

mapInit();
setInterval(mapUpdate, 16.7)