# JS Calculator

This is a web app that makes basic arithmetic operations. 

Live demo: https://aademirci.github.io/js-calculator/

## Features

* 4 basic arithmetic operations: add, subtract, multiply, divide
* Keyboard support
* Responsive design, mobile friendly
* Operation buttons keep pressed while waiting for the operand to add a visual cue
* Ability to calculate floating numbers such as 43.2
* Fixes to common JavaScript mathematical errors such as 0.1+0.2 or 0.8-0.1 operation
* Avoid the input bigger than MAX_SAFE_INTEGER initially, although users can still operate over the bigger results
* The screen is scrollable for big numbers on small device width
* Safely avoid the user from dividing numbers with 0

## Known Issues

* The calculator cannot adapt the horizontal mobile screen (yet)
* The webpage zooms in on double tap to the mobile screen
* Adding . next to 0 removes the 0, showing .5 instead of 0.5, while the functionality does not have any problem

## Credits

* aademirci (https://github.com/aademirci) - Design and coding (HTML, CSS, JavaScript)
* ELal3k (https://github.com/ELal3k) - Brainstorming and testing