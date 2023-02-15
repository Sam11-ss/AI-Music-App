harry_potter="";
peter_pan="";
leftWristY= 0;
leftWristX=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist = 0;
harry_potter_status="";
peter_pan_status="";
scoreRightWrist = 0;


function preload(){
    harry_potter=loadSound("music.mp3");
    peter_pan=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function gotPoses(results){
if(results.length > 0){
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("Score of left wrist is "+scoreLeftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left wrist x is = " + leftWristX + "Left wrist Y is = " + leftWristY);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right wrist x is = " + rightWristX + "Right wrist Y is = " + rightWristY);
}
}
function modelLoaded(){
    console.log("Posenet is initialised.")
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    harry_potter_status = harry_potter.isPlaying()
    peter_pan_status = peter_pan.isPlaying()

    if (scoreLeftWrist > 0.1){
        circle(leftWristX, leftWristY, 20);
        harry_potter.stop();
       if(peter_pan_status == false){
        peter_pan.play();
        document.getElementById("song").innerHTML="Playing Peter Pan."
       }
    }
    if (scoreRightWrist > 0.1){
        circle(rightWristX, rightWristY, 20);
        peter_pan.stop();
       if(harry_potter_status == false){
        harry_potter.play();
        document.getElementById("song").innerHTML="Playing Harry Potter."
       }
    }
}