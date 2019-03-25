(function(){
  let model = {
      init : function(){
        return this.monoMythStages[0];
      },
    
      monoMythStages : [
      {
        stage: "Ordinary World",
        colour: "DeepSkyBlue",
      },
      {
        stage: "Call to Adventure",
        colour: "OrangeRed",
      },
      {
        stage: "Refusal",
        colour: "DarkSlateGray",
      },
      {
        stage: "Meeting with the Mentor",
        colour: "Indigo",
      },
      {
        stage: "Crossing the Threshold",
        colour: "SpringGreen",
      },
      {
        stage: "Tests, Allies, Enemies",
        colour: "Fuchsia",
      },
      {
        stage: "Approach to the inmost cave",
        colour: "Sienna",
      },
      {
        stage: "Ordeal",
        colour: "CornflowerBlue",
      },
      {
        stage: "Reward (Seizing the Sword)",
        colour: "Gold",
      },
      {
        stage: "The Road Back",
        colour: "YellowGreen",
      },
      {
        stage: "Ressurection",
        colour: "Maroon",
      },
      {
        stage: "Return with Elixir",
        colour: "MediumBlue",
      }
    ],
    challengesDone : 0,
    level : 0,
    stage : 0,
    chapter : 0,
    chartData : [[0,0,0,0]]
  };
  
  let controller = {
    init : function(){
            let startState = model.init();
            view.init(startState);
      },
    getChallengesDone : function(){
      return model.challengesDone;
    },
    getLevel : function(){
      return model.level;
    },
    getStage : function(){
      return model.stage;
    },
    getChapter : function(){
      return model.chapter;
    },
    setChallengesDone : function(){
      model.challengesDone++;
    },
    setLevel : function(value){
      model.level = value;
    },
    setStage : function(value){
      model.stage = value;
    },
    setChapter : function(value){
      model.chapter = value;
    },
    getMonoMythStage : function(value){
      return(model.monoMythStages[value].stage);
    },
    getMonoMythColour : function(value){
      return(model.monoMythStages[value].colour);
    },
    setChartData : function(){
      model.chartData.push([this.getChallengesDone(),this.getLevel(),this.getStage(),this.getChapter()]);
    },
    getChartData : function(){
      return(model.chartData);
    }
  };

  let view = {
    init : function(startState){
            let self = this;
            let statusElement = document.getElementsByClassName("status")[0];
            let levelElement = document.getElementsByClassName("level")[0];
            let stageElement = document.getElementsByClassName("stage")[0];
            let chapterElement = document.getElementsByClassName("chapter")[0];
            statusElement.textContent = startState.stage;
            statusElement.style.backgroundColor = startState.colour;
            let pass = document.getElementsByClassName("pass")[0];
            let fail = document.getElementsByClassName("fail")[0];
            pass.onclick = function(){self.render(statusElement, levelElement, stageElement, chapterElement, true)};
            fail.onclick = function(){self.render(statusElement, levelElement, stageElement, chapterElement, false)};
    },
    render : function(statusElement, levelElement, stageElement, chapterElement, type){
              controller.setChallengesDone();
              if (type){
                //pass
                if (controller.getChapter() >= 11){
                  if (controller.getLevel() === 0){
                    if (controller.getStage() > 11){
                      //reset
                      controller.setStage(0);
                      controller.setChapter(0);
                    } else {
                      //stage progression
                      let stage = controller.getStage();
                      stage++;
                      controller.setStage(stage);
                    }
                  } else {
                    //level progression
                    if (controller.getLevel() > 0) {
                      let level = controller.getLevel();
                      level--;
                      controller.setLevel(level);
                    }
                    controller.setChapter(0);
                    if (controller.getStage() >= 11){
                      //rest
                      controller.setStage(0);
                      controller.setChapter(0);
                    } else {
                      //stage progression
                      let stage = controller.getStage();
                      stage++;
                      controller.setStage(stage);
                    }
                  }
                } else {
                  //chapter progression
                  let chapter = controller.getChapter();
                  chapter++;
                  controller.setChapter(chapter);
                }
              } else {
                //fail
                //level regression
                let level = controller.getLevel();
                level++;
                controller.setLevel(level);
              }
              let current;
              if (controller.getChapter() > 0) {
                current = controller.getChapter();
              } else if (controller.getStage() > 0) {
                  current = controller.getStage();
              } else {
                current = controller.getLevel();
              }
              // display status, level, stage, chapter
              statusElement.textContent = controller.getMonoMythStage(current);
              statusElement.style.backgroundColor = controller.getMonoMythColour(current);
              levelElement.textContent = "LEVEL: "+ controller.getLevel();
              stageElement.textContent = "STAGE: "+ controller.getStage();
              chapterElement.textContent = "CHAPTER: "+ controller.getChapter();
              //update graph
              controller.setChartData();
              console.log(controller.getChartData());
              drawChart(controller.getChartData());
            }
    };
 controller.init();
})();