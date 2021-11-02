import json
import os

# choose of the plant
def plante_choosing():
    '''
    function that will make the user choose the plant he/she want, by showing every plant compatible
    '''
    x = 1
    u = 1

    try:
        os.remove("/front/data/choice.txt")
    except:
        print("no plant choosen before")

    with open("front/data/plant.json", "r") as main:
        file = json.load(main)

    for i in file:
        print(str(x)+":"+str(file[i]["nom"]))
        x += 1

    chose = int(
        input("choose your plant in the list above (by their number!)"))

    for y in file:
        if u == chose:
            yeah = open('front/data/choice.txt', "w")
            yeah.write(str(file[y]["real"]))
            print("done!")
            yeah.close()
        u += 1

plante_choosing()