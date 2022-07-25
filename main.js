nose_x=0;
nose_y=0;

right_eye_x=0;
right_eye_y=0;

left_eye_x=0;
left_eye_y=0;

mid_x=0;
mid_y=0;

function preload(){
clown_nose=loadImage("Clown_nose.png");
sunglasses=loadImage("Sunglasses.png");
hat=loadImage("Hat.png");
}

function setup(){
    canvas=createCanvas(300, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
    
}

function modelLoaded(){
    console.log("poseNet is loaded");
}

function gotPoses(results)
{
    if(results.length>0){
        console.log(results);
        nose_x=results[0].pose.nose.x;
        nose_y=results[0].pose.nose.y;
        right_eye_x=results[0].pose.rightEye.x;
        right_eye_y=results[0].pose.rightEye.y;
        left_eye_x=results[0].pose.leftEye.x;
        left_eye_y=results[0].pose.leftEye.y;
        mid_x=(left_eye_x + right_eye_x)/2;
        mid_y=(left_eye_y + right_eye_y)/2;
        console.log("nose x=" + results[0].pose.nose.x);
        console.log("nose y=" + results[0].pose.nose.y);
        console.log("left_eye x=" + results[0].pose.leftEye.x);
        console.log("left_eye y=" +results[0].pose.leftEye.y);
        console.log("right_eye x=" +results[0].pose.rightEye.x);
        console.log("right_eye y=" +results[0].pose.rightEye.y);
    }
}

function draw(){
    image(video, 0, 0, 300, 300);
    image(clown_nose, nose_x-12, nose_y-10, 25, 25);
    image(sunglasses, mid_x-40, mid_y-20, 80, 50);
    image(hat, nose_x-90, nose_y-150, 150, 100);
}

function take_img(){
    save("filterSelfie.png");
}