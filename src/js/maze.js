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
            this.maze[i][j] = 1; //Inner walls
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

  }

  mazing(){
    while(this.isFinished()){ //Merge algorithm
      this.step++;

      let tX = rdm(1, this.x-2);
      let tY;
      if(tX%2==0){
        tY = rdm(0, this.x-2)*2+1;
      }else{
        tY = rdm(0, this.x-2)*2+2;
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
          tY2 = rdm(0, this.x-2)*2+1;
        }else{
          tY2 = rdm(0, this.x-2)*2+2;
        }
        if(this.maze[tX2][tY2]%2!=0){
          this.maze[tX2][tY2]=1;
          i++;
        }
      }
    }
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

  solve(){ //WIP
    let temp = true;
    let interact = [this.entry]
    while(temp){
      interact.forEach((item, i) => {
        if(this.maze[item[0]+1][item[1]] != null && this.maze[item[0]+1][item[1]]%2==0){
          interact.push([[item[0]+1],[item[1]]]);

          interact.shift();
        }


      });

    }
  }






  draw(){
    strokeWeight(0);
    for(let i=0; i<this.x;i++){
      for(let j=0;j<this.x;j++){
        if(this.maze[i][j]%2==0){
          fill('white');
        }else{
          fill('black');
        }
        square(i*this.size+50,j*this.size+50,this.size);
      }
    }
  }


}
