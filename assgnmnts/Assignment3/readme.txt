Hello professor/grader,
I have included all the views in the same page.

The Code:

I have used the jQuery library to simplify my javascript. I also used CSS styling to give the page good looks. Using jQuery, I was able to club the mouse functions and perform other functions easily. All my code is found in "base.js". 

First I created 3 different svgs, each for front, side, and top view. I placed all my mouse listeners inside the document "ready" function. To make the page dynamic, I do not call the functions such as rotate skew etc everytime the value changes. What I did was setup global parameters for all the values of the transforms. I then setup a interval function which calls the jquery "css" function used to set the transform as a string. Using the previously mentioned globals, I was able to generate a whole string for tranforms such as "rotate("+rotdeg+"deg) .......". This makes it possible for the transforms to apply when the user changes the values. While resetting the values, since I used an array to store all the values I just reset the array which retrieves the original svg. 
