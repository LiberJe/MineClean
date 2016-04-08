main();


//主程序
function  main() {
    
    $(".start-btn").click(function(){
        var difficulty=$("#difficulty-choice").val();
        var newGame= new GameStart(difficulty);
        createPanel(newGame.ailength);
        
        watchSetting(newGame);
        watchGame(newGame);
    })
    
}

//创建游戏桌面
function GameStart(ai) {
    this.ai=ai;
    this.ailength=checkAi(this.ai);
    this.eventBox=createEventBox(this.ailength);
    this.eventBox=createMine(this.ailength,this.eventBox);
    this.eventBox=createTip(this.ailength,this.eventBox);
    
    function checkAi(ai) {
        var ailength=0;
        switch(ai){
            case "easy":
                ailength=10;
                break;
            case "medium":
                ailength=15;
                break;
            case "hard":
                ailength=25;
                break;
        }
        return ailength;    
    }
    
    function createEventBox(ailength) {
        var eventBox=[];
        
        for(var i=0;i<ailength;i++){
            eventBox[i]=[];
            for(var j=0;j<ailength;j++){
                eventBox[i][j]={
                    mine:false,
                    count:0
                }
            }
        }
        return eventBox;
    }
    
    function createMine(ailength,eventBox){
        for(var k=0;k<ailength;k++){
            var i=Math.floor(Math.random()*ailength);
            var j=Math.floor(Math.random()*ailength); 
            if(!eventBox[i][j].mine){
                eventBox[i][j].mine=true;
            }else{
                k--;
            }   
        }
        return eventBox;
    }
    
    function createTip(ailength,eventBox){
        for(var i=0;i<eventBox.length;i++){
            for(var j=0;j<eventBox[i].length;j++){
                var count=0;
                if(!eventBox[i][j].mine){
                    for(var m=i-1;m<=i+1;m++){
                        if(m<0 || m>=ailength)continue;
                        for(var n=j-1;n<=j+1;n++){
                            if(n<0 || n>=ailength)continue;
                            if(eventBox[m][n].mine){
                                count++;
                            }
                        }
                    }
                }
                eventBox[i][j].count=count;
            }
        }
        return eventBox;
    }
}

function createPanel(ailength) {
    $(".game-panel").children().remove();
    if(ailength==15){
        $(".game-panel>div").css("width","300px");
        console.log(ailength);
    }
    if(ailength==25){
        $(".game-panel>div").css("width","500px");
        console.log(ailength);
    }
    
    for(var i=0;i<ailength;i++){
        $("<div class='row"+i+"' id='"+i+"'></div>").appendTo($(".game-panel"));
        for(var j=0;j<ailength;j++){
            $("<div class='col"+j+"' id='"+i+j+"'></div>").appendTo($(".row"+i));
        }
    }
}

function showMine(game){
    $.each(game.eventBox,function(i,row){
        $.each(row,function(j,col){
            if(col.mine){
                $("#"+i+j).css("background-color","aqua");
            }
        })
    })
}

function watchGame(game){
    //取消右键菜单
    $(document).bind("contextmenu",function(e){
        return false;
    }); 
    
    $(".game-panel>div div").mousedown(function(e){
        var i=$(this).attr("id")[0];
        var j=$(this).attr("id")[1];
        
        if(e.which == 1){
            if(!game.eventBox[i][j].mine){
                $(this).css("background-color","white").text(game.eventBox[i][j].count);
            }else{
                showMine(game);
            }    
        }
        if(e.which == 3){
            $(this).css("background-color","aqua");
        }
    })
}

function watchSetting(game){
    $(".end-btn").click(function(){
        showMine(game);
    })
    
    
}

