// class for updating input
class BestPath{

    createInput(){

            let subInput = [];
            let input = [];
            for(let i = 0; i < 100; i++){
                for(let j = 0; j < 100; j++){

                    if(j == (i+1)){
                        if(j % 10 == 0){
                            subInput.push(0);
                        }
                        else{
                            subInput.push(1);
                        }
                    }
                    else if(j == (i-1)){
                        if(j % 10 == 9){
                            subInput.push(0);
                        }
                        else{
                            subInput.push(1);
                        }
                    }
                    else if(j == (i+10)){
                        subInput.push(1);
                    }
                    else if(j == (i-10)){
                        subInput.push(1);
                    }
                    else{
                        subInput.push(0);
                    }
                }

                input.push(subInput);
                subInput = [];
            }

            return input;

    }

    update(input,boxType,value){

        boxType.forEach(function(element){

            for(let i = 0; i < 100; i++){
                if(input[element][i] == 1){
                    input[element][i] = value;
                }
                if(input[i][element] == 1){
                    input[i][element] = value;
                }
            }
        });
        return input;

    }
}


// class for finding best path 
let finalSolution = [];
let negOne = -1;
class BestPathFindOut{

    getFinalSolution(graph,start,end){
        
        let distance = new Array(100);
        let status = new Array(100);

        let parent = new Array(100);
        parent[start] = negOne;

        for(let i = 0; i < 100; i++){
            distance[i] = Number.MAX_VALUE;
            status[i] = false;
        }

        distance[start] = 0;

        for(let j = 0; j < 100; j++){

            let infinite = Number.MAX_VALUE;
            let smallest = -1;

            for(let x = 0; x < 100; x++){
                if(distance[x] <= infinite && !status[x]){
                    infinite = distance[x]
                    smallest = x;
                }
            }

            status[smallest] = true;
            if(smallest == end){
                break;
            }

            for(let y = 0; y < 100; y++){

                if(graph[smallest][y] > 0 && distance[smallest] + graph[smallest][y] < distance[y]){
                    distance[y] = distance[smallest] + graph[smallest][y];
                    parent[y] = smallest;
                }
            }
            
        }

        if(distance[end] !== Number.MAX_VALUE){
            createPathFunction(end,parent);
        }
        else{
            finalSolution.push(-1);
        }
        
    }

}

function createPathFunction(end,parent){

    if(end == negOne){
        return;
    }
    createPathFunction(parent[end],parent);

    finalSolution.push(parseInt(end));

}

// after click on search path button
function searchpath(){
    
    Array.from(document.getElementsByClassName('nonclickBox')).forEach(function(element){
        element.classList.add('nonclickBox');
        element.classList.remove('box');
    });
    step = '';

    let bestPath = new BestPath();

    let inputGraph;
    inputGraph = bestPath.createInput();

    inputGraph = bestPath.update(inputGraph,invalidBoxes,0);
    inputGraph = bestPath.update(inputGraph,greenBox,2);
    inputGraph = bestPath.update(inputGraph,yellowBox,5);
    inputGraph = bestPath.update(inputGraph,redBox,10);


    let bestPathFindOut = new BestPathFindOut();

    bestPathFindOut.getFinalSolution(inputGraph,initialVertex,finalVertex);



    let i = 1;
    task.innerHTML = '';
    if(finalSolution[0] != -1){

        let loop = setInterval(function(){

            
            if(i == (finalSolution.length)){

                document.getElementById(finalSolution[i-1]).innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" style="width:90%; height:90%" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                </svg>`;
                document.getElementById(finalSolution[i-2]).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width:70%; height:70%" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>`;

                task.innerHTML = ` <button type="button" class="btn btn-light fw-bolder my-1" onclick="backFunction()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>  back</button> This Is The Best Path to Reach Your Destination <br> <button type="button" class="btn btn-info fw-bolder my-1" onclick="restartFunction()">Restart</button>`;

              
                clearInterval(loop);
            }
            else{
                document.getElementById(finalSolution[i]).innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" style="width:90%; height:90%" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
                </svg>`;
                    
                document.getElementById(finalSolution[i-1]).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="width:70%; height:70%" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>`;

                i++;
            }

        },500);

      

    }
    else{
         task.innerHTML = ` <button type="button" class="btn btn-light fw-bolder my-1" onclick="backFunction()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
         <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
       </svg>  back</button> Their Is NO Path to Reach Your Destination <br> <button type="button" class="btn btn-info fw-bolder my-1" onclick="restartFunction()">Restart</button>`;
    }

    
}