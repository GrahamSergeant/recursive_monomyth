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
        chapter: "Calling",
        colour: "OrangeRed",
      },
      {
        chapter: "Refusal",
        colour: "DarkSlateGray",
      },
      {
        chapter: "Mentor",
        colour: "Indigo",
      },
      {
        chapter: "Threshold",
        colour: "SpringGreen",
      },
      {
        chapter: "Tests",
        colour: "Fuchsia",
      },
      {
        chapter: "Approach",
        colour: "Sienna",
      },
      {
        chapter: "Ordeal",
        colour: "CornflowerBlue",
      },
      {
        chapter: "Reward",
        colour: "Gold",
      },
      {
        chapter: "Homebound",
        colour: "YellowGreen",
      },
      {
        chapter: "Ressurection",
        colour: "Maroon",
      },
      {
        chapter: "Elixir",
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
      model.wordTreeData.push(['Your_StoryWorld Map / ' + controller.getMonoMythChapter(controller.getStage()) + ' Stage / The ' + adjectives.getAdjective[controller.getLevel()] + ' ' + controller.getMonoMythChapter(controller.getChapter())+' Chapter']);
    },
    getWordTreeData : function(){
      return(model.wordTreeData);
    },
    randomResult : function(){
      let currentLevel = this.getLevel();
      let currentStage = this.getStage();
      let currentChapter = this.getChapter();
      let currentChallengeDone = this.getChallengesDone();
      currentLevel++;
      if (currentLevel < Math.floor(Math.random() * Math.floor((99 - (currentChallengeDone / 6) - (currentChapter * currentStage))))){
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
            let challengesAttemptedElement = document.getElementsByClassName("challenges")[0];
            statusElement.textContent = "The " + adjectives.getAdjective[controller.getLevel()] + " " + startState.chapter + " of the " + startState.chapter;
            statusElement.style.backgroundColor = startState.colour;
            let challenge = document.getElementsByClassName("challenge")[0];
            challenge.onclick = function(){self.state(statusElement, levelElement, stageElement, chapterElement, challengesAttemptedElement, controller.randomResult())};
    },
    state : function(statusElement, levelElement, stageElement, chapterElement, challengesAttemptedElement, challengeOutcome){
              let self = this;
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
                challengeOutput.value = 'Fail';
                //level regression
                let level = controller.getLevel();
                if (level < 98){
                  level++;
                }
                controller.setLevel(level);
              }
              // render status, level, stage, chapter, challenges attempted, graph and wordtree in a sequential chain
              self.renderStatusElement(statusElement).then(function(result){console.log("rendering #1: " + result);
                  self.renderLevelElement(levelElement).then(function(result){console.log("rendering #2: " + result);
                    self.renderStageElement(stageElement).then(function(result){console.log("rendering #3: " + result);
                      self.renderChapterElement(chapterElement).then(function(result){console.log("rendering #4: " + result);
                        self.renderchallengesAttemptedElement(challengesAttemptedElement).then(function(result){console.log("rendering #5: " + result);
                          self.renderChartData().then(function(result){console.log("rendering #6: " + result);
                            self.renderWordTree().then(function(result){console.log("rendering #7: " + result);
                            });
                          });
                        });
                      });
                    });
                  });
              });
            },
      renderStatusElement : function(statusElement){
                      statusElement.textContent = "The " + adjectives.getAdjective[controller.getLevel()] + " " + controller.getMonoMythChapter(controller.getChapter()) + " of the " + controller.getMonoMythChapter(controller.getStage());
                      statusElement.style.backgroundColor = controller.getMonoMythColour(controller.getChapter());
                      return new Promise(function(resolve){setTimeout(function(){resolve('rendered status')}, 100);});
                      
      },
      renderLevelElement : function(levelElement){
                      levelElement.textContent = "LEVEL: "+ controller.getLevel();
                      return new Promise(function(resolve){setTimeout(function(){resolve('rendered level')}, 100);});
      },
      renderStageElement : function(stageElement){
                              stageElement.textContent = "STAGE: "+ controller.getStage();
                              return new Promise(function(resolve){setTimeout(function(){resolve('rendered stage')}, 100);});
      },
      renderChapterElement : function(chapterElement){
                                chapterElement.textContent = "CHAPTER: "+ controller.getChapter();
                                return new Promise(function(resolve){setTimeout(function(){resolve('rendered chapter')}, 100);});
      },
      renderchallengesAttemptedElement : function(challengesAttemptedElement){
                                            challengesAttemptedElement.textContent = "CHALLENGES ATEMPTED: "+ controller.getChallengesDone();
                                            return new Promise(function(resolve){setTimeout(function(){resolve('rendered challenges attempted')}, 100);});
      },
      renderChartData : function(){
                          controller.setChartData();
                          drawChart(controller.getChartData());
                          return new Promise(function(resolve){setTimeout(function(){resolve('rendered graph')}, 100);});
      },
      renderWordTree : function(){
                          controller.setWordTreeData();
                          drawTree(controller.getWordTreeData());
                          return new Promise(function(resolve){setTimeout(function(){resolve('rendered tree')}, 100);});
      }
    };
 controller.init();
})();
