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
    level : 0,
    stage : 0,
    chapter : 0
  };
  
  let controller = {
    init : function(){
            let startState = model.init();
            view.init(startState);
      },
      
    getLevel : function(){
      //console.log("getLevel: "+model.level);
      return model.level;
    },
    getStage : function(){
      //console.log("getStage: "+model.stage);
      return model.stage;
    },
    getChapter : function(){
      //console.log("getChapter: "+model.chapter);
      return model.chapter;
    },
    setLevel : function(value){
      console.log("setLevel: "+value);
      model.level = value;
    },
    setStage : function(value){
      console.log("setStage: "+value);
      model.stage = value;
    },
    setChapter : function(value){
      console.log("setChapter: "+value);
      model.chapter = value;
    },
    
    getMonoMythStage : function(value){
      return(model.monoMythStages[value].stage);
    },
    getMonoMythColour : function(value){
      return(model.monoMythStages[value].colour);
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
            }
    };
 controller.init();
})();