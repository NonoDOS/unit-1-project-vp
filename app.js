 //Pet's stats are Life, Happiness, and Hunger

    
//--------------------------------------constants-------------------------------

//--------------------------------------Variables--------------------------------------
    var  intervalLife =      1000,
         intervalHappiness = 2000,
         intervalHunger =    3000,

         ctMaxLife =        50,
         ctMaxHappiness =   50,
         ctMaxHunger =      50,
             
         ctCurLife =       ctMaxLife,
         ctCurHappiness =  ctMaxHappiness,
         ctCurHunger=      ctMaxHunger,


         
//When conditions are dangerous, the coresponding stat bars will turn red (warning)
    alive =		        true,
    dangerLife =       false,
    dangerHappiness =  false,
    dangerHunger =     false,
             
//--------------------------------------catchedElements--------------------------------------
                 //Get meters to change width and border color
     const messageElement= document.getElementById('message'),

    getPetImg = document.getElementById('small-image'),
    getMeterLife =      document.getElementById('meterLife'),
    getMeterHappiness = document.getElementById('meterHappiness'),
     getMeterHunger =    document.getElementById('meterHunger'),
             
             getStyleLife =        getMeterLife.style,
             getStyleHappiness =   getMeterHappiness.style,
             getStyleHunger =      getMeterHunger.style,
             

//When happiness/hunger fall below threshold, pet starts losing Life Bar
             threshold =    ctMaxLife * 0.6,
             points =       2,
             widther =      4,
             
 //Colors for meter borders
             clrDfltLife =      "#0b420b",  //green
             clrDfltHappiness = "#ec8804",  //orange
             clrDfltHunger =    "#216ed3",  //blue
                 
             colorCurLife =      clrDfltLife,
             colorCurHappiness = clrDfltHappiness,
             c0lorCurHunger =    clrDfltHunger,
             
             clrWarn = " #FF0040", //red
         
                 //Get buttons for click events
             getBtnPlay     =     document.getElementById('btnPlay'),
             getBtnFeed     =     document.getElementById('btnFeed'),
             getBtnClean    =     document.getElementById('btnClean')
            //  getBtnIgnore   =     document.getElementById('btnIgnore'),
            //  getBtnTalkShit =     document.getElementById('btnTalkShit');
             
            //      //Get images to express status
            //  getImgeSadpup.src = "petImg/smallpup.jpeg" 
            //document.getElementById(''),
            //  
         
                 //Get style for the feedback div
            //   getStyleFb = 	document.getElementById('feedback').style;
             
        
        //  getStyleFb.display = 'none';
        //  meterWidth();
         

 //--------------setInterval functions for count down-------------
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
In this nest:
Life Bar will drop if Happiness or Hunger are too low.
If the Life bar is too low, the pet will die eventually
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
         
         //When your pet runs out of Life, it will die.
         if(ctCurLife < 0){
             alive = false;
         }
             
         if(alive == false)
            {
                terminate();
            }
             
         },intervalLife);
    
 //-----------------------button eventlisteners------------------------------------   
         //Clicking on a "Play" button will restore life and happiness level to your pet.
         getBtnPlay.addEventListener("click",function(){
             if(alive == true){
                 if(ctCurHappiness + points <= ctMaxHappiness)
                     {
                        ctCurHappiness = ctCurHappiness + points;
                     
                     }if(ctCurLife + points < ctMaxLife)
                    {
                        ctCurLife = ctCurLife + points;
                     }meterWidth();
                     
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
                
         //Clicking on a "Feed" button will restore life and hunger level to your pet.
         getBtnFeed.addEventListener("click",function(){
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
             //Clicking on a "Feed" button will restore life and hunger level to your pet.
             getBtnClean.addEventListener("click",function(){
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
         //Clicking on the "Ignore" and "Talk Shit"button will reduce life and happiness level to your pet.

        //  getBtnIgnore.addEventListener("click",function(){
        //     if(alive == true){
        //         if(ctCurHappiness - points <= ctMaxHappiness)
        //             {
        //                ctCurHappiness = ctCurHappiness - points;
                    
        //                if(ctCurLife - points < ctMaxLife)
        //                    {
        //                        ctCurLife = ctCurLife - points;
        //                    }
                    
        //                meterWidth();
                    
        //                //Check conditions and adjust graphics as appropriate.
        //                checkDangerLife();
        //                checkDangerHappiness();
        //                checkDangerHunger();
                    
        //                if(dangerLife == false)
        //                {okLife();}
        //                if(dangerHappiness == false)
        //                {okHappiness();}
        //                if(dangerHunger== false)
        //                {okHunger();}
        //         }
        //     }
        //     getBtnTalkShit.addEventListener("click",function(){
        //         getPetImg.src = "petImg/sayingHi.jpeg"
        //         if(alive == true){
        //             if(ctCurHappiness - points <= ctMaxHappiness)
        //                 {
        //                    ctCurHappiness = ctCurHappiness - points;
                        
        //                    if(ctCurLife - points < ctMaxLife)
        //                        {
        //                            ctCurLife = ctCurLife - points;
        //                        }
                        
        //                    meterWidth();
                        
        //                    //Check conditions and adjust graphics as appropriate.
        //                    checkDangerLife();
        //                    checkDangerHappiness();
        //                    checkDangerHunger();
                        
        //                    if(dangerLife == false)
        //                    {okLife();}
        //                    if(dangerHappiness == false)
        //                    {okHappiness();}
        //                    if(dangerHunger== false)
        //                    {okHunger();}
        //             }
        //         }
        // });
        
         
         
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
         
         function ending(){
            //  getImg.innerHTML = ;
            //  getStyleFb.display = 'block';
         }
         
        // });
        
                    })();
                })
            })
        })
    })()
