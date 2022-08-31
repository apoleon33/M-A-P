# a very simple tool to change the theme of the M-A-P
# change variables in src/style/variables.scss
import os
import sys
import fire


def str_to_class(classname):  # https://bit.ly/3x3CDg4
    return getattr(sys.modules[__name__], classname)


path = "src/style/variables.scss"


def palette(choice):
    str_to_class(choice).applyPalette()


class Palette ():
    def __init__(self, mainColor: str, secondaryColor: str, fontMaincolor: str, fontSecondaryColor: str) -> None:
        '''
        mainColor -> background color and humidity graph/ real temperature curve
        secondaryColor -> menu/main window color
        fontMainColor -> font color and maximum/minimum temperature curve
        fontSecondaryColor -> not used at the moment
        '''
        self.mainColor = mainColor
        self.secondaryColor = secondaryColor
        self.fontMainColor = fontMaincolor
        self.fontSecondaryColor = fontSecondaryColor

    def applyPalette(self) -> None:
        '''  function that open variables.scss, then change the values for the color. '''
        file = open(path, "r")
        redFile = file.readlines()
        file.close()
        redFile[0] = f"$mainColor: {self.mainColor} ;\n"
        redFile[1] = f"$secondaryColor: {self.secondaryColor} ;\n"
        redFile[3] = f"$fontMainColor: {self.fontMainColor} ;\n"
        redFile[4] = f"$fontSecondaryColor: {self.fontSecondaryColor};"

        fullStr = ''.join(redFile)  # convert the list to a clean str

        with open(path, "w") as file:
            file.write(fullStr)


default = Palette("#325C34", "#5AA65F", 'black',
                  "grey")  # the original palette
alternative = Palette("rgb(53,84,105)", "rgb(172,217,212)",
                      "rgb(77,143,141)", "grey")
curiosity = Palette(" rgb(9,163,211)", " rgb(59, 80, 110)  ",
                    " rgb(101, 193, 190)", "rgb(236, 193, 190)")
natural = Palette("rgb(233, 239, 244)", "rgb(206,212,190)",
                  "rgb(81,80,93)", "rgb(239,233,223)")
dreamy = Palette("rgb(230,123,128)", "  rgb(251,211,197)",
                 " rgb(214,90,156)", "rgb(245,240,230)")
eternalAtake = Palette(" #020202 ", " #E8E201 ", " #9815D3", "#189AD6")

rei = Palette("#111521", "#9195C7", "#fffff6", "#fffff6bb")

if __name__ == '__main__':
    fire.Fire(palette)
