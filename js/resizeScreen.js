/*  RESIZE ALL LAYOUTS FOR WEBSITES -- by LUCAS BENVENUTI

    FAST AND EASY TO USE.
    
    JUST PUT THIS .JS INSIDE A FOLDER AND PATH IT.
    
    A VARIABLE INSIDE THE ENGINE WILL TAKE THE CORRESPONDING .CSS ARCHIVE AND REMODEL ALL VALUES ONLY WITH PIXELS.
    
    TO TAKE PROPERLY THE .CSS ARCHIVE, YOU WILL NEED TO DEFINE IT INSIDE THE 'CSSARCHIVE' VARIABLE USING AN INT VALUE (EX: 0, 1, 2...) DEPENDING ON THE POSITION OF THE STYLESHEET THAT YOU USE. THE STANDARD VALUE FOR THIS VARIABLE IS '0'.
    
    EX:
    
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="css/flickity.css">
    
    TO TAKE THE 'STYLE.CSS' STYLESHEET, YOU NEED TO PUT '0' INSIDE 'CSSARCHIVE' VARIABLE.
    OR IF YOU WANT TO TAKE THE 'FLICKITY.CSS' STYLESHEET, YOU WILL NEED TO PUT '1' INSIDE 'CSSARCHIVE' VARIABLE.
    
    
    OBS:
    
    FOR THE CORRECT WORKING OF THIS TOOL, ALL MODIFICATIONS NEED TO BE DONE BY USING JQUERY .CSS STRINGS.
    
    IT HAS TO BE THIS WAY BECAUSE THE ENGINE THAT RESIZE ALL ELEMENTS USE JQUERY .CSS TOO.
    USING .STYLE.CSSTEXT OR .STYLE.PROPERTY FOR EXAMPLE, WILL CORRUPT THE ENGINE, RESULTING ON HER MALFUNCTIONING.
    
    
    RESIZE ALL LAYOUTS FOR WEBSITES -- by LUCAS BENVENUTI   */

//var deviceInUse = ''; //VARIABLE TO DEFINE WICH DEVICE IS IN USE
//
//function defineDevice(){
//    if($(document).width() > 1081)
//    {
//        deviceInUse = 'desktop';
//        //alert(deviceInUse);
//    }
//    else{
//        deviceInUse = 'mobile';
//        //alert(deviceInUse);
//    }
//}


var cssArchive = 0; //PUT YOUR CORRESPONDING .CSS STYLESHEET POSITION

/*     MAIN FUNCTION TO RESIZE     */
function resizeWindow()
{
    //defineDevice();
    
    var device = deviceInUse;
    /*    METHOD WITH STYLESHEETS    */
            
    //TO WORK NEED TO BE ON ONLINE SITE OR LOCAL HOST BECAUSE OF THE SECURITY ACCESS
    var mysheet=document.styleSheets[0]; //SOMETIMES NEED TO DEFINE WHERE THE STYLE OF THE ELEMENTS IS. IN THIS CASE, THE ELEMENTS CSS IS IN THE FIRST STYLESHEET

    //TAKE ALL RULES FROM STYLESHEET
    var myrules=mysheet.cssRules;

    var testeQtd = 0; //CAN DELETE

    var completeCSS = [];

    //VAR TO HAVE ONLY THE NAME OF THE CSS
    var nameElementCSS = [];
    
    if(device == 'desktop'){
        var maxWidth = 1920; //TYPE AN EXISTENT WIDTH VALUE LIKE - 1600/ 1366/ 1920/ 2560
        var currentWidth = document.body.clientWidth + 17; //TAKE THE PRESENT VALUE FROM THE WIDTH - +17 TO REMOVE THE SCROLL WIDTH THAT IS 17 PIXELS
    }
    else{
        var maxWidth = 414; //TYPE AN EXISTENT WIDTH VALUE LIKE - 320/ 375/ 414 - OBS: NEED TO BE THE SCREEN WIDTH THAT YOU WERE USING TO BUILD THE PAGE INITIALY
        var currentWidth = document.body.clientWidth; //TAKE THE PRESENT VALUE FROM THE WIDTH
    }


    var percentFromTotal = (currentWidth * 100) / maxWidth; //MAKE A PERCENTAGE TO WITH THE GOAL TO MODIFY THE OLD PIXEL VALUES INTO NEW ONES FOR THE RESIZE

    //GO AROUND ALL RULES TO FIND A SPECIFIC ONE
    for(var i = 0; i < myrules.length; i++)
    {
        //THE FUNCTION IS SEARCHING FOR CLASSES OR IDS WITH PIXEL VALUES
        if(myrules[i].cssText.indexOf('px') >= 0)
        {                    
            //VAR ONLY TO CONTAIN THE DIFFERENT INDEXS
            var contElementCSS = [];

            //VAR TO HAVE ONLY THE PROPERTIES OF THE CSS
            var propertiesCSS = [];

            //VAR TO HAVE ONLY THE VALUES OF THE CSS
            var valuesCSS = [];

            //TAKE CSS TEXT FORMAT TO WORK
            cssTextToArray = myrules[i].cssText;

            //END INDEX TO TAKE NAME
            endNameKey = cssTextToArray.lastIndexOf('{') - 1;

            //PUT NAMES INSIDE AN ARRAY JUST FOR THIS
            nameElementCSS.push(cssTextToArray.substr(0,endNameKey));

            //DEFINE THE START AND END OF THE PROPERTIES
            leftKey = cssTextToArray.lastIndexOf('{') + 2;
            rightKey = cssTextToArray.indexOf('}') - 2;

            //TAKE VALUES INSIDE KEYS
            cssTextToArray = cssTextToArray.substring(leftKey, rightKey);

            cssTextToArray = cssTextToArray.split(';');

            for(var j = 0; j < cssTextToArray.length; j++)
            {
                //TAKE ONLY VALUES WITH PIXELS
                if(cssTextToArray[j].indexOf('px') >= 0)
                {
                    splitedText = cssTextToArray[j].split(':');
                    propertiesCSS.push(splitedText[0]);
                    valuesCSS.push(splitedText[1]);
                }
            }

            //PUT ARRAY OF PROPERTIES INSIDE ANOTHER ARRAY
            contElementCSS.push(propertiesCSS);

            //PUT ARRAY OF VALUES INSIDE ANOTHER ARRAY
            contElementCSS.push(valuesCSS);

            //PUT ARRAY THAT HAVE PROPERTIES AND VALUES INSIDE THE CENTRAL ARRAY
            completeCSS.push(contElementCSS);

        }
    }

    /*  JUST TO REMEMBER :  */

    // FOR COMPLETECSS ARRAY VAR
    // FIRST [] FOR ELEMENT CLASS / ID
    // SECOND [] FOR PROPERTIES (0) OR VALUES (1)
    // THIRD [] FOR WHAT PROPERTIE (IF SECOND [] IS SETTED WITH (IF SECOND [] IS SETTED WITH 1)

    //VALUES TO BE USED ON FUNCTION

    //FIRST LOOP TO TAKE ALL CLASSES AND IDS
    for(var i = 0; i < completeCSS.length; i++)
    {                
        //SECOND LOOP TO TAKE PROPERTIES AND VALUES
        for(var j = 0; j < completeCSS[i].length; j++)
        {                    
            //THIRD LOOP TO TAKE ELEMENTS INSIDE PROPERTIES AND VALUES
            for(var k = 0; k < completeCSS[i][j].length; k++)
            {
                //FUNCTION TO CREATE NEW VALUES
                if(j == 1)
                {
                    var oldPixelString = completeCSS[i][j][k]; //TAKE THE OLD PIXEL VALUES

                    //CREATE STRING THAT WILL HAVE THE NEW VALUES
                    //NEED TO HAVE THE OLDPIXELSTRING BECAUSE OTLAST NEW VALUE ONLY WILL BE SAVED
                    var newValueString = oldPixelString;

                    //TRIM TO DELETE THE FIRST WHITE SPACE ON VALUES
                    oldPixelValue = oldPixelString.trim();

                    //SEPARATE VALUES USING THE BLANK SPACE BETWEEN THEM
                    oldValuesArray = oldPixelValue.split(' ');

                    //FOURTH LOOP TO TAKE ONLY PIXEL VALUES INSIDE OLD VALUES VAR
                    for(var l = 0; l < oldValuesArray.length; l++)
                    {
                        //CHECK IF VALUE HAS PIXELS
                        if(oldValuesArray[l].indexOf('px') >= 0)
                        {
                            //NEED TO REMOVE PX STRING FROM VARIABLE TO USE IT PROPERLY
                            var keyRemoveLast = oldValuesArray[l].lastIndexOf('px');

                            oldValueWithoutPixel = oldValuesArray[l].substring(0, keyRemoveLast);

                            //TRANSFORM VALUES ACCOARDING TO PERCENTAGE
                            var newPixelValue = (oldValueWithoutPixel * percentFromTotal) / 100;

                            //VALUE TO BE REPLACED NEED TO BE SOMETHING WITHOUT PIXELS OR THE REST OF THE STRING TO WORK CORRECTLY OTHERWISE IT WILL DELETE ALL STRING TO REPLACE THE NEW VALUE
                            newValueString = newValueString.replace(oldValueWithoutPixel,newPixelValue);                                    
                        }
                    }

                    //A VAR NEEDS DO CONTAIN THE ARRAYS BECAUSE [] IS NOT ACCEPTED INSIDE .CSS AND NEEDS TO BE WITHOUT ANY BLANK SPACE IN FRONT OF IT
                    var propertieToChange = completeCSS[i][0][k];

                    propertieToChange = propertieToChange.trim();

                    //CHANGE THE VALUES IN .CSS
                    //THE VALUE IS NOT CHANGING... THE ERROR IS SOMETHING IN PROPERTIETOCHANGE
                    $(nameElementCSS[i]).css(propertieToChange,newValueString);
                }
            }
        }
    }
}
            
resizeWindow();

$(window).resize(function(){
    resizeWindow();
});

/* RESIZE ALL LAYOUTS FOR WEBSITES -- by LUCAS BENVENUTI */