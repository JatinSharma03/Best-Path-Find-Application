// importent ters for input
let initialVertex = 0;
let finalVertex = 0;
let invalidBoxes = [];
let greenBox = [];
let yellowBox = [];
let redBox = [];



// Default 
let gameBox = document.getElementById('gameBox');
let gameContainer;

for(let i = 0; i < 10; i++){
    gameBox.innerHTML += `
    <div class="row boxContainer" id="gameContainer${i}"></div>
    `;
    for(j = 0; j < 10; j++){
        gameContainer = document.getElementById(`gameContainer${i}`);
        gameContainer.innerHTML += `
          <div class="col fs-2 text-center box" id="${(i*10)+j}" onclick="boxClick(this.id)"></div>
        `;
    }
}

let task = document.getElementById('task');
task.innerHTML = `Select The Starting Node (Your Current Position) By Clicking On Any One Of The Above Box.`;

// on clicking Box
let idBox;
let step = 'start';

function boxClick(id){
    idBox = document.getElementById(id);

    if(step == 'start'){ 
        idBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width:90%; height:90%" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
      </svg>`;
        task.innerHTML = `Select The Ending Node (Your Destination Position) By Clicking On Any One Of The Above Box, Except Starting Position. <button type="button" class="btn btn-info fw-bolder" onclick="restartFunction()">Restart</button>`;
        idBox.removeAttribute('onclick');
        step = 'end';

        initialVertex = id;
    }

    else if(step == 'end'){
        idBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width:90%; height:90%" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
      </svg>`;
        task.innerHTML = `Select the Restricted Area For Movement (remove the Path Boxes) By Clicking On The Above Boxes. <button type="button" class="btn btn-info fw-bolder" onclick="restartFunction()">Restart</button>`;
        idBox.removeAttribute('onclick');
        step = 'invalid';

        finalVertex = id;
    }

    else if(step == 'invalid'){
        idBox.classList.remove('box');
        idBox.classList.add('nonclickInvalidBox');
        invalidBoxes.push(id);
        idBox.removeAttribute('onclick');

        if(invalidBoxes.length == 1){
        task.innerHTML = `You Can Select As Many Restricted Boxes As You Want. Click 'Next' After Choosing all the Restricted Areas  <button type="button" class="btn btn-light fw-bolder " onclick="nextFunction()">Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right  fw-bolder" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg></button>`;
        }
        else{
            task.innerHTML = `Now You Cannot Travel In Selected Boxes. Click 'Next' After Choosing all the Restricted Areas  <button type="button" class="btn btn-light fw-bolder " onclick="nextFunction()">Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right  fw-bolder" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg></button>`;
        }
    }

    else if(step == 'level1Roughness'){
        idBox.classList.add('bg-success');

        greenBox.push(id);
        idBox.removeAttribute('onclick');
    }

    else if(step == 'level2Roughness'){
        idBox.classList.add('bg-warning');

        yellowBox.push(id);
        idBox.removeAttribute('onclick');
    }

    else if(step == 'level3Roughness'){
        idBox.classList.add('bg-danger');

        redBox.push(id);
        idBox.removeAttribute('onclick');
    }

}


// function to run after selecting starting, ending and restricted box
function nextFunction(){
    task.innerHTML = `<button type="button" class="btn btn-light fw-bolder" onclick="gotoInvalid()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>  back</button> <button type="button" class="btn btn-primary fw-bolder" onclick="searchpath()">Find Best Path</button>   <button type="button" class="btn btn-secondary" onclick="roughMakingFunction()">Options For Making Path Rough</button>`;
    step = '';
    Array.from(document.getElementsByClassName('box')).forEach(function(element){
        element.classList.add('nonclickBox');
        element.classList.remove('box');
    });
}

// make path rough
function roughMakingFunction(){
    task.innerHTML = `<button type="button" class="btn btn-primary fw-bolder" onclick="searchpath()">Find Best Path</button>  <br>
    <button type="button" class="btn btn-success m-1" id="level1" onclick="roughness(this.id)">Level 1 Roughness (2)</button><button type="button" class="btn btn-warning m-1" id="level2" onclick="roughness(this.id)">Level 2 Roughness (5)</button><button type="button" class="btn btn-danger m-1" id="level3" onclick="roughness(this.id)">Level 3 Roughness (10)</button>`;

    gameBox.classList.add('gameBoxSmall');
}

function roughness(roughId){
    let roughNumber = 0;
    let roughStatus = '';
    if(roughId == 'level1'){
        roughNumber = 2;
        roughStatus = 'little';

        step = 'level1Roughness';
    }
    else if(roughId == 'level2'){
        roughNumber = 5;
        roughStatus = 'Average';

        step = 'level2Roughness';
    }
    else if(roughId == 'level3'){
        roughNumber = 10;
        roughStatus = 'Extreme';

        step = 'level3Roughness';
    }

    task.innerHTML = `<button type="button" class="btn btn-primary fw-bolder" onclick="searchpath()">Find Best Path</button> <br> You Can Select The Boxes As Much As You Want to Increase Their Weight To "${roughNumber}" (Make it ${roughStatus} Rough To Travel). <br>
        <button type="button" class="btn btn-success m-1" id="level1" onclick="roughness(this.id)">Level 1 Roughness (2)</button><button type="button" class="btn btn-warning m-1" id="level2" onclick="roughness(this.id)">Level 2 Roughness (5)</button><button type="button" class="btn btn-danger m-1" id="level3" onclick="roughness(this.id)">Level 3 Roughness (10)</button>`;
        

    Array.from(document.getElementsByClassName('nonclickBox')).forEach(function(element){
        element.classList.remove('nonclickBox');
        element.classList.add('box');
    });
    
}



// after finding path 

function restartFunction(){
    location.reload();
}

function backFunction(){

    greenBox.forEach(function(element){
        document.getElementById(element).classList.remove('bg-success');
        document.getElementById(element).setAttribute('onclick','boxClick(this.id)');
    });

    yellowBox.forEach(function(element){
        document.getElementById(element).classList.remove('bg-warning');
        document.getElementById(element).setAttribute('onclick','boxClick(this.id)');
    });

    redBox.forEach(function(element){
        document.getElementById(element).classList.remove('bg-danger');
        document.getElementById(element).setAttribute('onclick','boxClick(this.id)');
    });

    finalSolution.forEach(function(element){
        if(finalSolution != -1){
              document.getElementById(element).innerHTML = '';
        }
    });

    document.getElementById(finalVertex).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width:90%; height:90%" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
  </svg>`;

    document.getElementById(initialVertex).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width:90%; height:90%" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
  </svg>`;
    
    greenBox = [];
    yellowBox = [];
    redBox = [];

    finalSolution = [];

    nextFunction();   
}

// go back to select invalid
function gotoInvalid(){   

    Array.from(document.getElementsByClassName('nonclickBox')).forEach(function(element){ 
        element.classList.remove('nonclickBox');
        element.classList.add('box');
    });

    invalidBoxes.forEach(function(element){
        
        document.getElementById(element).classList.remove('nonclickInvalidBox');
        document.getElementById(element).classList.add('box');
    
        document.getElementById(element).setAttribute('onclick','boxClick(this.id)');
    });

    invalidBoxes = [];

    task.innerHTML = `Select the Restricted Area For Movement (remove the Path Boxes) By Clicking On The Above Boxes.`;

    step = 'invalid';

}