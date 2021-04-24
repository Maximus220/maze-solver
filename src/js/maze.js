class Maze{

  constructor(squareSideSize, x, entry, exit, algorithm, isHard){
    this.size = squareSideSize; //Number of pixel constituting a single pixel
    this.x = x; //Size of the maze (always a square)
    this.entry = entry; //Coord of the entry
    this.exit = exit; //Coord of the exit
    this.isHard = isHard; //Determine if the maze is hard or not (in merging algorithm)
    this.maze = Array.from(Array(this.x), () => new Array(this.x)); //List containing each pixels
    this.tempNum=0; //Tempnumber used with the merging algorithm
    this.algorithm = algorithm || 'merge'; //To choose the algorithm used ['merge', 'tree']

    this.step=0; //Used to compare number of steps of each algorithms

    this.init();
  }

  init(){ //Create the maze
    for(let i=0; i<this.x;i++){
      for(let j=0;j<this.x;j++){
        if(i==0||j==0||i==this.x-1||j==this.x-1){ //Outter walls
          this.maze[i][j] = -1; //Outer walls
        }else{
          if(i%2==0||j%2==0){
            this.maze[i][j] = -3; //Inner walls
          }else{
            this.maze[i][j] = this.tempNum; //Empty case
            this.tempNum+=2;
          }
        }

      }
    }
    this.maze[this.entry[0]][this.entry[1]] = -2; //Entry
    this.maze[this.exit[0]][this.exit[1]] = -4; //Exits
    console.log(this.maze);
    this.mazing();
    //this.solve();

  }

  mazing(){
    while(this.isFinished()){ //Merge algorithm
      this.step++;

      let tX = rdm(1, this.x-2);
      let tY;
      if(tX%2==0){
        tY = rdm(0, (this.x-1)/2)*2+1; //Eventually make possible for the user to change it to 'rdm(1, thix.x-1)'
      }else{
        tY = rdm(0, (this.x-2)/2)*2;
      }

      if(this.maze[tX][tY]%2!=0){
        let cell1;
        let cell2;
        if(this.maze[tX-1][tY]%2==0&&this.maze[tX+1][tY]%2==0){ //Then use horizontal cases
          cell1 = [[tX-1],[tY]];
          cell2 = [[tX+1],[tY]];
        }else if(this.maze[tX][tY-1]%2==0&&this.maze[tX][tY+1]%2==0){
          cell1 = [[tX],[tY-1]];
          cell2 = [[tX],[tY+1]];
        }
        if(cell1!=null){
          if(this.maze[cell1[0]][cell1[1]]!=this.maze[cell2[0]][cell2[1]]){
            this.replaceAll(this.maze[cell2[0]][cell2[1]], this.maze[cell1[0]][cell1[1]])
            this.maze[tX][tY] = this.maze[cell1[0]][cell1[1]];
          }
        }
      }
    }
    if(this.isHard){
      let i=0;
      while(i<this.x){
        this.step++;
        let tX2 = rdm(1, this.x-2);
        let tY2;
        if(tX2%2==0){
          tY2 = rdm(0, (this.x-1)/2)*2+1;
        }else{
          tY2 = rdm(0, (this.x-2)/2)*2;
        }
        if(this.maze[tX2][tY2]%2!=0){
          this.maze[tX2][tY2]=-3;
          i++;
        }
      }
    }
    this.replaceAll(this.maze[1][1], 0);
    console.log(this.maze);
    console.log(this.step);
  }

  replaceAll(oldNum, newNum){
    for(let i=0; i<this.x;i++){
      for(let j=0;j<this.x;j++){
        if(this.maze[i][j] == oldNum){
          this.maze[i][j] = newNum;
        }
      }
    }
  }

  isFinished(){
    let tempNum;
    for(let i=0; i<this.x;i++){
      for(let j=0;j<this.x;j++){
        if(this.maze[i][j]!=-2&&this.maze[i][j]!=-4){ //If isn't exit or entry
          if(this.maze[i][j]%2==0){ //If is an empty space
            if(tempNum==null){ //If tempNum isn't set yet
              tempNum=this.maze[i][j];
            }else{
              if(tempNum!=this.maze[i][j]){ //If tempNum !=
                return 1;
              }
            }
          }
        }
      }
    }
    return 0;
  }

  solve(){ //WIP || NOT WORKING BC FUCK MY LIFE
    let interact = [];
    let tempList=[];
    interact.push(this.exit);
    let i = 0;
    while(typeof this.mazeSolve[this.entry[0]][this.entry[1]] === 'undefined'){
      console.log(interact);
      interact.forEach((item, j) => {
        tempList=[];
        tempList.push([item[0] + 1, item[1]]);
        tempList.push([item[0] - 1, item[1]]);
        tempList.push([item[0], item[1] + 1]);
        tempList.push([item[0], item[1] - 1]);
        console.log(tempList);
        console.log(tempList[0] + tempList[1]);
        tempList.forEach((tempItem, k) => {
          console.log(this.isInMaze(tempItem[0],tempItem[1]));
          if(this.isInMaze(tempItem[0],tempItem[1]) /*(tempItem[0] >= 0 && tempItem[0] < this.x && tempItem[1] >= 0 && tempItem[1] < this.x)*/ && this.maze[tempItem[0]][tempItem[1]]%2 != 0){ //If it isn't a wall

            if(!this.isInMazeSolver(tempItem[0],tempItem[1])){
              this.mazeSolve[tempItem[0]][tempItem[1]] = i;
              interact.push([ tempItem[0], tempItem[1] ]);
              console.log(this.mazeSolve);
              console.log(this.mazeSolve[48]);
            }
          }
        });
        interact.shift();



      });
      i++;

    }
    console.log(this.mazeSolve);
  }

  //I really apologise to all developers... JS sucks, the other way to make that part would take me multiples 'for' and would take much more time to the computer
  //Or I can eventually change it for : (tempItem[0] >= 0 && tempItem[0] < this.x && tempItem[1] >= 0 && tempItem[1] < this.x)
  isInMaze(i1, i2){
    try{
      typeof this.maze[i1][i2];
      return true;
    }catch(e){
      return false
    }
  }
  isInMazeSolver(i1, i2){
    try{
      typeof this.mazeSolver[i1][i2];
      return true;
    }catch(e){
      return false
    }
  }






  draw(){
    strokeWeight(0);
    for(let i=0; i<this.x;i++){
      for(let j=0;j<this.x;j++){
        if(this.maze[i][j]%2 != 0){
          fill('black');
        }else{
          fill('white');
        }
        square(i*this.size+50,j*this.size+50,this.size);
      }
    }
  }


}
