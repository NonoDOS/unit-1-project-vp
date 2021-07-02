     
//--------------------------------------constants-------------------------------
 const colorScheme = {
    dark: "",
    change: function () {
      console.log(colorScheme.dark)
      colorScheme.dark = colorScheme.dark ? "" : "dark"
      document.querySelector("body").setAttribute("class", colorScheme.dark)
      console.log(colorScheme.dark)
    }
  }
//--------------------------------------Variables--------------------------------------
//Pet's stats are Life, Happiness, and Hunger
    let  intervalLife =      1000,
         intervalHappiness = 3000,
         intervalHunger =    2000,

         ctMaxLife =        100,
         ctMaxHappiness =   100,
         ctMaxHunger =      100,
             
         ctCurLife =       ctMaxLife,
         ctCurHappiness =  ctMaxHappiness,
         ctCurHunger=      ctMaxHunger,

         isSoundOn = false
         
//When conditions are dangerous, the coresponding stat bars will turn red (warning)
       
    let alive = true
    let dangerLife = false
    let dangerHappiness = false
    let dangerHunger = false
//--------------------------------------catchedElements--------------------------------------//
                 //Get meters to change width and border color
     const messageElement= document.getElementById('message'),
           sound = document.getElementById('sound'),
           audioPlayer = new Audio(),
           lightDarkBtn = document.querySelector("#light-dark-button"),
     getPetImg = document.getElementById('small-image'),
     getMeterLife =      document.getElementById('meterLife'),
     getMeterHappiness = document.getElementById('meterHappiness'),
     getMeterHunger =    document.getElementById('meterHunger'),
             
     getStyleLife =        getMeterLife.style,
     getStyleHappiness =   getMeterHappiness.style,
     getStyleHunger =      getMeterHunger.style,
             
//----------------------------------------Threshold------------------------------------------------//
//When happiness/hunger fall below threshold, pet starts losing Life Bar

             threshold =    ctMaxLife * 0.6,
             points =       4,
             widther =      4,
             
 //Colors for meter borders
             clrDfltLife =      "#0b420b",  //green
             clrDfltHappiness = "#ec8804",  //orange
             clrDfltHunger =    "#216ed3",  //blue
             bdrStart =		"1px solid ",
                 
             colorCurLife =      clrDfltLife,
             colorCurHappiness = clrDfltHappiness,
             colorCurHunger =    clrDfltHunger,
             
             clrWarn = " #FF0040", //red
        
                 //Get buttons for click events
            getBtnPlay     =     document.getElementById('btnPlay'),
            getBtnFeed     =     document.getElementById('btnFeed'),
            getBtnClean   =     document.getElementById('btnClean'),
            getBtnIgnore   =     document.getElementById('btnIgnore'),
            getBtnTalkShit =     document.getElementById('btnTalkShit');

 //-------------------------------setInterval functions for count down----------------------------------------/

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
If the pet is dead/runaway, then the ending events trigger.
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
                ending();
            }
             
         },intervalLife);
    
 //-----------------------button eventlisteners------------------------------------/  
 
 //sound file //toggle audio
    sound.addEventListener("click",function(){
            if(isSoundOn){
            isSoundOn =false
            audioPlayer.pause()
            }else{
                isSoundOn = true
                audioPlayer.play()
            }
        })

  //light/dark Mode ( DAY/NIGHT)
   lightDarkBtn.addEventListener("click", colorScheme.change)

 //Play Button
 //Clicking on a "Play" button will restore life and happiness level to your pet.
    getBtnPlay.addEventListener("click",function(){
             getPetImg.src = "petImg/playingPup.png"
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
         })
     
    //CFeed
    //Clicking on a "Feed" button will restore life and hunger level to your pet.
         getBtnFeed.addEventListener("click",function(){
            getPetImg.src = "petImg/DogFeed.jpg"
             if(alive == true){
                 if(ctCurHunger + points <= ctMaxHunger){
                        ctCurHunger = ctCurHunger + points;
                 }
                            if(ctCurLife + points < ctMaxLife){
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
             });

    //Clean Button
    //Clicking on a "Clean" button will restore life and happiness level to your pet.
        getBtnClean.addEventListener("click",function(){
                getPetImg.src = "petImg/cleaningPup.jpeg"
                if(alive == true){
                    if(ctCurHappiness + points <= ctMaxHappiness)
                       {
                           ctCurHappiness = ctCurHappiness + points;
                        
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


    //Ignore and Displine button 
    //Clicking on the "Ignore" and "Displine" button will reduce life and happiness level to your pet.

         getBtnIgnore.addEventListener("click",function(){
            getPetImg.src = "petImg/sadpup1.jpeg"
            if(alive == true){
                if(ctCurHappiness - points <= ctMaxHappiness)
                    {
                       ctCurHappiness = ctCurHappiness - points;
                    
                       if(ctCurLife - points < ctMaxLife)
                           {
                               ctCurLife = ctCurLife - points;
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
            getBtnTalkShit.addEventListener("click",function(){
                 getPetImg.src = "petImg/displine.jpeg"
                if(alive == true){
                    if(ctCurHappiness - points <= ctMaxHappiness)
                        {
                           ctCurHappiness = ctCurHappiness - points;
                        
                           if(ctCurLife - points < ctMaxLife)
                               {
                                   ctCurLife = ctCurLife - points;
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
 //----------------------------------------------Functions------------------------------------------------/          
         //Functions
         init()

         function init(){
             audioPlayer.src = "sound/gameplay.mp3"
             audioPlayer.volume = 0.05
             meterWidth()

         }
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
         
        function warnHappiness(){
             messageElement.innerHTML = " Your Pet is Sad, he need more love <3 "
             messageElement.style.color = "white"
             getStyleHappiness.border = bdrStart + clrWarn;
         }
         
        function warnHunger(){
             messageElement.innerHTML = " Your Pet is HUNGRY"
             messageElement.style.color = "white"
             getStyleHunger.border = bdrStart + clrWarn;
        }
         
         function warnLife(){
            messageElement.innerHTML = " Ding Ding Ding!! Your Pet is in Danger!!!!"
            messageElement.style.color = "white"
             getStyleLife.border = bdrStart + clrWarn;
          }
         
         function okHappiness(){
             getStyleHappiness.border = bdrStart + clrDfltHunger;
         }
         
         function okHunger(){
             getStyleHunger.border = bdrStart + clrDfltHunger;
         }
         
         function okLife(){
        
             getStyleLife.border = bdrStart + clrDfltLife;
        }
         
         function ending(){
            getPetImg.src = "petImg/runningawaypup.png"
            audioPlayer.src = "sound/Heartbeat.mp3"
            audioPlayer.play()
            setTimeout(function(){
                audioPlayer.pause()
            }, 5000)
            messageElement.innerHTML = "You lose!!! Your Pet Run Away.... [^_^]"
            messageElement.style.color = "white"
         }//end of the game
         //Sorry!!!!!!
  
     