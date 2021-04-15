class Maze{

  constructor(squareSideSize, x, entry, exit){
    this.size = squareSideSize;
    this.squareSideSize = squareSideSize;
    this.x = x;
    this.entry = entry;
    this.exit = exit;

    this.maze = Array.from(Array(this.x), () => new Array(this.x));

    this.tempNum=0;


    this.init();
  }

  init(){
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
    for(let i=0;i<this.exit.length;i++){
      this.maze[this.exit[i][0]][this.exit[i][1]] = -4; //Exits
    }
    console.log(this.maze);
    this.mazing();
  }

  mazing(){
    while(this.isFinished()){
      let tX = rdm(1, this.x-2);
      let tY = rdm(1, this.x-2);
      if(this.maze[tX][tY]%2!=0){ //If is a wall
        let neighborT = [];
        neighborT.push([[tX+1], [tY]]);
        neighborT.push([[tX], [tY+1]]);
        neighborT.push([[tX], [tY-1]]);
        neighborT.push([[tX-1], [tY]]);
        let neighbor = [];
        for(let i=0;i<neighborT.length;i++){
          if(this.maze[neighborT[i][0]][neighborT[i][1]]%2==0&&this.maze[neighborT[i][0]][neighborT[i][1]]!=-2&&this.maze[neighborT[i][0]][neighborT[i][1]]!=-4){
            neighbor.push(neighborT[i]); //List with only empty cases
          }
        }
        if(neighbor.length!=0){
          let tempRdm = rdm(0,neighbor.length-1); //Choose a random neighbor among all that aren't wall nor exit or entry
          for(let i=0;i<neighbor.length;i++){
            if(this.maze[neighbor[i][0]][neighbor[i][1]] != this.maze[neighbor[tempRdm][0]][neighbor[tempRdm][1]]){
              this.replaceAll(this.maze[neighbor[i][0]][neighbor[i][1]], this.maze[neighbor[tempRdm][0]][neighbor[tempRdm][1]])
              //this.maze[neighbor[i][0]][neighbor[i][1]] = this.maze[neighbor[tempRdm][0]][neighbor[tempRdm][1]];
            }
          }
          this.maze[tX][tY]=this.maze[neighbor[tempRdm][0]][neighbor[tempRdm][1]];
        }else{
          this.maze[tX][tY] = this.tempNum; //Set the old wall as an empty case if it isn't in contact with non-wall cases
          this.tempNum+=2;
        }

      }

      console.log(this.maze[4]);

    }

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
