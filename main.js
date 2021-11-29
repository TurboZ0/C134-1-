hold_image="";
status1= "";
z= [];

function preload() {}

function setup() {
    canvas=createCanvas(700,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
loading_model= ml5.objectDetector("cocossd", modelHasLoaded);
document.getElementById("status").innerHTML="Status: Detecting objects.... Please Wait..";
}
function modelHasLoaded() {
    console.log("Cocossd weird name");
    status1=true;
    
}
function recieve_result(error,result) {
if (error) {
    console.log(error);
}
else {
  //  console.log(result);
    z=result;
}
}

function draw() {
    console.log(z);
    image(video, 0,0, 700,499);
    r=random(255);
    g=random(255);
    b=random(255);
    if (status1 != "") {
        loading_model.detect(video, recieve_result);
     for(var i=0; i < z.length; i++) {
        document.getElementById("status").innerHTML="Status: Objects detected... 1000 years later";
        document.getElementById("number_status").innerHTML="Number of objects detected are" + 
        " from our sources " +z.length;
         percent=floor(z[i].confidence*100);
         fill(r, g, b);
        text(z[i].label + " " + percent + "%", z[i].x, z[i].y);
        noFill();
        stroke(r,g,b);
        
        rect(z[i].x, z[i].y, z[i].width, z[i].height);
     }   

    }
    
}