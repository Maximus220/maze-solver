class Grid{
  /*
  * x & y have to be odd numbers.
  * Entry is a pair of number (coordinates) e.g. [2,54]
  * Exit can be a list of coordinates e.g. [[2,47],[47,2]]
  */
  constructor(squareSideSize, x, y, entry, exit){
    this.size = squareSideSize;
    this.y=y;
    this.x=x;
    this.entry = entry;
    this.exit = exit;
    this.squareList = Array.from(Array(this.x), () => new Array(this.y));
    this.squareListNumber = Array.from(Array(this.x), () => new Array(this.y));
    let tempNum=0;
    for(let i=0;i<this.x;i++){
      for(let j=0;j<this.y;j++){
        if(j!=0&&j!=this.y-1&&i!=0&&i!=this.x-1){
          if(i%2==0||j%2==0){
            this.squareList[i][j] = 1;
          }else{
            this.squareList[i][j] = 0;
            this.squareListNumber[i][j]=tempNum;
            tempNum++;
            console.log(tempNum);
          }
        }else{
          this.squareList[i][j] = 2;
        }
      }
    }
    this.squareList[this.entry[0]][this.entry[1]] = -1;
    for(let i=0;i<this.exit.length;i++){
      this.squareList[this.exit[i][0]][this.exit[i][1]] = -1;
    }
    console.log(this.squareListNumber);
    console.log(this.squareList);
  }

  create(){
    while(!this.isFinished()==0){
      let tempRdm = rdm(1, x-2);
      let tempRdm2 = rdm(1, y-2);
      if(this.squareList[tempRdm][tempRdm2]==1){
        this.squareList[tempRdm][tempRdm2]=0;
        let neighborW =[];

        neighborW.push([[tempRdm+1],[tempRdm]]);
        neighborW.push([[tempRdm+1],[tempRdm+1]]);
        neighborW.push([[tempRdm-1],[tempRdm]]);
        neighborW.push([[tempRdm-1],[tempRdm-1]]);
        let neighbor =[];
        for(let x=0;x<neighborW.length;x++){
          if(this.squareList[neighborW[x][0]][neighborW[x][1]] ==0){
            neighbor.push([neighborW[x][0],neighborW[x][1]]);
          }
        }
        if(neighbor.length!=0){
          let tempRdm3=rdm(1,neighbor.length-2);
          /*console.log(neighbor);
          console.log(tempRdm3);
          console.log(neighbor[tempRdm3][0]);
          console.log(neighbor[tempRdm3][1]);*/
          let newNum = this.squareListNumber[neighbor[tempRdm3][0]][neighbor[tempRdm3][1]];
          console.log(newNum);
          this.squareListNumber[tempRdm][tempRdm2]=newNum;
          if(neighbor>1){
            for(let y=0;y<neighbor.length;y++){
              if(!this.squareListNumber[neighbor[y][0]][neighbor[y][1]] == newNum){
                replaceAll(this.squareListNumber[neighbor[y][0]][neighbor[y][1]], newNum);
              }
            }
          }
        }
        //console.log(this.squareList);
      }
    }
  }

  replaceAll(num, num2){
    for(let i=0;i<this.x;i++){
      for(let j=0;j<this.y;j++){
        if(this.squareListNumber[i][j]==num){
          this.squareListNumber[i][j]==num2;
        }
      }
    }
  }

  isFinished(){ //tous set au même nombre ++ ADD MUR du bord et arrivé!!!!!!!
    let tempFirstNum;
    for(let i=0;i<this.x;i++){
      if(i!=0&&i!=this.x-1){
        for(let j=0;j<this.y;j++){
          if(j!=0&&j!=this.y-1){
            if(this.squareList[i][j]>=1){
              if(tempFirstNum==null){
                tempFirstNum = this.squareListNumber[i][j];
                console.log(this.squareListNumber);
              }else{
                if(tempFirstNum!=this.squareListNumber[i][j]){
                  return 1;
                }
              }
            }
          }
        }
      }
    }
    console.log('hello');
    return 0;
  }

  draw(){
    for(let i=0;i<this.x;i++){
      for(let j=0;j<this.y;j++){
        if(this.squareList[i][j]>=1){
          fill('black');
          square(i*this.size+50,j*this.size+50,this.size);
        }else if(this.squareList[i][j]==0){
          fill(0.75*this.squareListNumber[i][j]+35, 2*this.squareListNumber[i][j]+35, 0.25*this.squareListNumber[i][j]+35);
          square(i*this.size+50,j*this.size+50,this.size);
        }
      }
    }
  }
}
