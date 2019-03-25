(function(){
  let model = {
      init : function(){
        return this.monoMythChapters[0];
      },

      monoMythChapters : [
      {
        chapter: "Ordinary World",
        colour: "DeepSkyBlue",
      },
      {
        chapter: "Call to Adventure",
        colour: "OrangeRed",
      },
      {
        chapter: "Refusal",
        colour: "DarkSlateGray",
      },
      {
        chapter: "Meeting with the Mentor",
        colour: "Indigo",
      },
      {
        chapter: "Crossing the Threshold",
        colour: "SpringGreen",
      },
      {
        chapter: "Tests, Allies, Enemies",
        colour: "Fuchsia",
      },
      {
        chapter: "Approach to the inmost cave",
        colour: "Sienna",
      },
      {
        chapter: "Ordeal",
        colour: "CornflowerBlue",
      },
      {
        chapter: "Reward (Seizing the Sword)",
        colour: "Gold",
      },
      {
        chapter: "Road Back",
        colour: "YellowGreen",
      },
      {
        chapter: "Ressurection",
        colour: "Maroon",
      },
      {
        chapter: "Return with Elixir",
        colour: "MediumBlue",
      }
    ],
    challengesDone : 0,
    level : 0,
    stage : 0,
    chapter : 0,
    chartData : [[0,0,0,0]],
    wordTreeData:  [['Phrases'],['Storyworld L0 S0 C0']]
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
    getMonoMythChapter : function(value){
      return(model.monoMythChapters[value].chapter);
    },
    getMonoMythColour : function(value){
      return(model.monoMythChapters[value].colour);
    },
    setChartData : function(){
      model.chartData.push([this.getChallengesDone(),this.getLevel(),this.getStage(),this.getChapter()]);
    },
    getChartData : function(){
      return(model.chartData);
    },
    setWordTreeData : function(){
      model.wordTreeData.push(['L' + this.getLevel() + ' S' + this.getStage() +  ' C' + this.getChapter()])
    },
    getWordTreeData : function(){
      return(model.wordTreeData);
    },
    randomResult : function(){
      //random selection - as level increases: 0 - 99 value range
      //chance scaled from 0 = 1% chance of pass to 100 = 100% chance of pass
      let currentLevel = this.getLevel();
      currentLevel++
      if (currentLevel < Math.floor(Math.random() * Math.floor(99))){
        return false;
      } else {
        return true;
      }
    }
  };

  let view = {
    init : function(startState){
            let self = this;
            let statusElement = document.getElementsByClassName("status")[0];
            let levelElement = document.getElementsByClassName("level")[0];
            let stageElement = document.getElementsByClassName("stage")[0];
            let chapterElement = document.getElementsByClassName("chapter")[0];
            statusElement.textContent = "The " + adjectives.getAdjective[controller.getLevel()] + " " + startState.chapter + " of the " + startState.chapter;
            statusElement.style.backgroundColor = startState.colour;
            let challenge = document.getElementsByClassName("challenge")[0];
            challenge.onclick = function(){self.render(statusElement, levelElement, stageElement, chapterElement, controller.randomResult())};
    },
    render : function(statusElement, levelElement, stageElement, chapterElement, challengeOutcome){
              controller.setChallengesDone();
              let challengeOutput = document.getElementsByClassName("outcome")[0];
              if (challengeOutcome === true){
                //pass
                challengeOutput.value = 'Pass';
                if (controller.getChapter() === 11){
                  if (controller.getLevel() === 0){
                    if (controller.getStage() === 11){
                      //reset
                      controller.setStage(0);
                      controller.setChapter(0);
                    } else {
                      //stage progression
                      let stage = controller.getStage();
                      stage++;
                      controller.setStage(stage);
                      controller.setChapter(0);
                    }
                  } else {
                    //level progression
                    if (controller.getLevel() > 0) {
                      let level = controller.getLevel();
                      level--;
                      controller.setLevel(level);
                      controller.setChapter(0);
                    }
                    if (controller.getStage() === 11){
                      //reset
                      controller.setStage(0);
                      controller.setChapter(0);
                    } else {
                      //stage progression
                      let stage = controller.getStage();
                      stage++;
                      controller.setStage(stage);
                      controller.setChapter(0);
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
                challengeOutput.value = 'Fail'
                //level regression
                let level = controller.getLevel();
                if (level < 98){
                  level++;
                }
                controller.setLevel(level);
              }
              // display status, level, stage, chapter
              statusElement.textContent = "The " + adjectives.getAdjective[controller.getLevel()] + " " + controller.getMonoMythChapter(controller.getChapter()) + " of the " + controller.getMonoMythChapter(controller.getStage());
              //
              statusElement.style.backgroundColor = controller.getMonoMythColour(controller.getChapter());
              levelElement.textContent = "LEVEL: "+ controller.getLevel();
              stageElement.textContent = "STAGE: "+ controller.getStage();
              chapterElement.textContent = "CHAPTER: "+ controller.getChapter();
              //update graph
              controller.setChartData();
              drawChart(controller.getChartData());
              //update wordtree
              controller.setWordTreeData();
              drawTree(controller.getWordTreeData());
            }
    };
 controller.init();
})();
