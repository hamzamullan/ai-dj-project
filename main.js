song = "";
scoreleftwrist = 0;

function preload(){
    song = loadSound("hip-hop-rock-beats-118000.mp3");
}

LeftwristX = ""
LeftwritstY = ""

scorerightwrist = 0;

RightwristX = ""
RightwristY = ""

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet( video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log(' PoseNet is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist = " + scoreleftwrist + "scorerightwrist = " + scorerightwrist);
        
       RightwristX = results[0].pose.rightWrist.x;
       RightwristY = results[0].pose.rightWrist.y;
       console.log( "rightWristX = " + RightwristX + "rightWristY = " + RightwristY);

       LeftwristX = results[0].pose.leftWrist.x;
       LeftwristY = results[0].pose.leftWrist.y;
       console.log( "leftWristX = " + LeftwristX + "leftWristY = " + LeftwristY);
    }
}

function draw(){
    image( video , 0 , 0  , 600 , 500 );

    fill("#FF0000");
    stroke("FF0000");

    if(scorerightwrist > 0.2){
        circle(RightwristX,RightwristY,20);
    
        if(RightwristY > 0 && RightwristY <= 100){
            document.getElementById("volume").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
         else if(RightwristY  > 100 && RightwristY <= 200){
            document.getElementById("volume").innerHTML = "speed = 1x";
            song.rate(1);
            }
        else if(RightwristY > 200 && RightwristY <= 300){
            document.getElementById("volume").innerHTML = "speed = 2x";
            song.rate(2);
                }
        else if(RightwristY > 300 && RightwristY <= 400){
            document.getElementById("volume").innerHTML = "speed = 2.5x"; 
            song.rate(2.5);
                    }
    }
    
    if(scoreleftwrist>0.2){

    circle(LeftwristX,LeftwritstY,20);
    InNumberLeftWristY = Number(LeftwristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}