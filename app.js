(function() {
    "use strict";
        
     document.addEventListener('DOMContentLoaded',function(){
         
         //Variables
             //Pet's stats are Life, Happiness, and Hunger
        let  ctMaxLife =        30,
             ctMaxHappiness =   30,
             ctMaxHunger =      30,
             
             ctCurLife =       ctMaxLife,
             ctCurHappiness =  ctMaxHappiness,
             ctCurHunger=      ctMaxHunger,
             
             intervalLife =    1000,
             intervalHappiness =   2000,
             intervalHunger =   3000,
             
                 //When happiness/hunger fall below threshold, pet starts losing health
             threshold =    ctMaxLife * 0.6,
             points =       2,
             widther =      4,
             
                 //When conditions are dangerous, affected stat bars will be hilited in red
             alive =		true,
             dangerLife =      false,
             dangerHappiness =     false,
             dangerHunger =     false,
             
                 //Get meters to change width and border color
             getMeterLife =      document.getElementById('meterLife'),
             getMeterHappiness =     document.getElementById('meterHappy'),
             getMeterHunger =     document.getElementById('meterHunger'),
             
             getStyleLife =    getMeterLife.style,
             getStyleHappiness =   getMeterHappiness.style,
             getStyleHunger =   getMeterHunger.style,
             bdrStart =		"1px solid ",
             
                 //Colors for meter borders
             clrDfltLife =     "#0b420b",  //green
             clrDfltHappiness =    "#ec8804",  //orange
             clrDfltHunger =    "##216ed3",  //blue
                 
             clrCurLife =      clrDfltLife,
             clrCurHappiness = clrDfltHappiness,
             clrCurHunger =    clrDfltHunger,
             
             clrWarn =      "#FF0040", //red
         
                 //Get buttons for click events
             getBtnPlay     =     document.getElementById('btnPlay'),
             getBtnFeed     =     document.getElementById('btnFeed'),
             getBtnClean    =     document.getElementById('btnClean'),
             getBtnIgnore   =     document.getElementById('btnIgnore'),
             getBtnTalkShit =     document.getElementById('btnTalkShit'),
             
            //      //Get eyes to express status
            //  getImgeSadpup =		document.getElementById(''),
            //  
         
                 //Get style for the feedback div
              getStyleFb = 	document.getElementById('feedback').style;
             
        
         getStyleFb.display = 'none';
         meterWidth();
         
         //At set intervals, Hppiness decreases.
         setInterval(function(){
             if(alive == true){
                    loseHappiness();
                     checkDangerHappiness();
             }
         },intervalHappiness);
         
         //At set intervals, Hunger decreases.
         setInterval(function(){
             if(alive == true){
                    loseHunger();
                     checkDangerHunger();
             }
         },intervalHunger);
         
         /*
         What happens in this nest:
         Health starts to drop if Happiness or Hunger are too low.
         Meter graphics are adjusted as applicable.
         If the pet is dead, then the ending events trigger.
         */
         setInterval(function(){
             
             meterWidth();
             checkDangerLife();
    
             //Adjust graphics
             if(dangerLife == true)
                 {
                    warnLife();
                    loseLife();  
                 }
             else
                 {
                    okLife();
                }
             
             if(dangerHappiness == true)
                 {
                     warnHappiness();      
                 }
             else
                 {
                     okHappiness();
                 }
         
             if(dangerHunger == true)
                 {
                     warnHunger();      
                 }
             else
                 {
                     okHunger();
                 }
         
         //When your pet runs out of health, it will die.
         if(ctCurLife < 0){
             alive = false;
         }
             
         if(alive == false)
            {
                ending();
            }
             
         },intervalLife);
    
    
         //Clicking on a "Feed" button will restore life, happiness level and hunger level to your pet.
         getBtnVM.addEventListener("click",function(){
             if(alive == true){
                 if(ctCurHappiness + points <= ctMaxHappiness)
                     {
                        ctCurHappiness = ctCurHappiness + points;
                     
                        if(ctCurLife + points < ctMaxLife)
                            {
                                ctCurH = ctCurH + points;
                            }
                     
                        meterWidth();
                     
                        //Check conditions and adjust graphics as appropriate.
                        checkDangerLife();
                        checkDangerHappiness();
                        checkDangerHunger();
                     
                        if(dangerLife == false)
                        {okLife();}
                        if(dangerHappiness == false)
                        {okHappiness();}
                        if(dangerHunger== false)
                        {okHunger();}
                 }
             }
         });
         
         getBtnVR.addEventListener("click",function(){
             if(alive == true){
                 if(ctCurHunger + points <= ctMaxHunger)
                    {
                        ctCurHunger = ctCurHunger + points;
                     
                        if(ctCurLife + points < ctMaxLife)
                            {
                                ctCurLife = ctCurLife + points;
                            }
                     
                        meterWidth();
                     
                        //Check conditions and adjust graphics as appropriate.
                        checkDangerLife();
                        checkDangerHappiness();
                        checkDangerHunger();
                     
                        if(dangerLife == false)
                            {okLife();}
                        if(dangerHappiness == false)
                            {okHappiness();}
                        if(dangerHunger == false)
                            {okHunger();}
                 }
             }
         });
         
         
         //Functions
         
         function meterWidth(){
             //This updates the width of the meters.
                getStyleLife.width = ctCurLife * widther + "px";	 
                 getStyleHappiness.width = ctCurHappiness * widther + "px";	 
                 getStyleHunger.width = ctCurHunger * widther + "px";	 
         }
         
         function checkDangerHappiness(){
                     if(ctCurHappiness < threshold)
                        {
                            dangerHappiness = true;
                        }
                     else
                        {
                            dangerHappiness = false;	
                        }
         }
         
         function checkDangerHunger(){
                     if(ctCurHunger < threshold)
                        {
                            dangerHunger = true;
                        }
                     else
                        {
                            dangerHunger= false;	
                        }
         }
         
         function checkDangerLife(){
             if((ctCurHappiness < threshold || ctCurHunger < threshold)  && alive == true)
                 {
                     dangerLife= true;
                 }
             else
                 {
                     dangerLife = false;
                 }
         }
        
         function loseHappiness(){
             ctCurHappiness = ctCurHappiness - points;
         }
         
         function loseHunger(){
             ctCurHunger = ctCurHunger- points;
         }
         
         function loseLife(){
              ctCurLife = ctCurLife - points;        
         }
         
        //  function warnHappiness(){
        //      getImg.innerHTML = imgSick;
        //      getStyleHappiness.border = bdrStart + clrWarn;
        //  }
         
        //  function warnHunger){
        //      getImg.innerHTML = imgSick;
        //      getStyleHunger.border = bdrStart + clrWarn;
        //  }
         
        //  function warnLife(){
        //      getImg.innerHTML = imgSick;
        //      getStyleLife.border = bdrStart + clrWarn;
        //  }
         
         function okHappiness(){
             getStyleHappiness.border = bdrStart + clrDfltHunger;
         }
         
         function okHunger(){
             getStyleHunger.border = bdrStart + clrDfltHunger;
         }
         
        //  function okLife(){
        //      getImg.innerHTML = ;
        //      getStyleLife.border = bdrStart + clrDfltH;
        //  }
         
        //  function ending(){
        //      getImg.innerHTML = ;
        //      getStyleFb.display = 'block';
        //  }
         
        // });
        
    })();
})
