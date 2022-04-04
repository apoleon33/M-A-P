# a very simple tool to change the theme of the M-A-P
# change variables in a src/style/variables.scss
import os
import sys
import fire


def str_to_class(classname):  # https://bit.ly/3x3CDg4
    return getattr(sys.modules[__name__], classname)


path = "src/style/variables.scss"


def palette(choice):
    str_to_class(choice).applyPalette()


class Palette ():
    def __init__(self, mainColor: str, secondaryColor: str, fontMaincolor: str, fontSecondaryColor) -> None:
        self.mainColor = mainColor
        self.secondaryColor = secondaryColor
        self.fontMainColor = fontMaincolor
        self.fontSecondaryColor = fontSecondaryColor

    def applyPalette(self):
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


defaultPalette = Palette("#325C34", "#5AA65F", 'black',"grey")  # the original palette
alternativePalette = Palette("rgb(53,84,105)", "rgb(172,217,212)", "black", "grey")

if __name__ == '__main__':
    fire.Fire(palette)
