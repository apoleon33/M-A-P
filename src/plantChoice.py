from importlib.resources import path
import json
import tkinter as tk
import glob
import os


def return_plant_list() -> list:
    '''
    function that return a list with the name of all usable plants
    '''
    with open("front/data/plant.json", "r") as main:
        file = json.load(main)
    pure_list = []
    for h in file:
        pure_list.append(str(file[h]["real"]))
    return pure_list


def plante_choosing(event):
    '''
    function that will make the user choose the plant he/she want, by showing every plant compatible
    '''
    x = 1
    u = 1

    choosenPlant = listPlant.get(tk.ACTIVE)
    path = f"front/data/plant-database/json/{choosenPlant}.json"

    try:
        os.remove("/front/data/choice.txt")
    except:
        print("", end="")

    with open(path, "r") as main:
        file = json.load(main)

    yeah = open('front/data/choice.txt', "w")
    yeah.write(file["pid"])
    print("done!")
    yeah.close()
    root.destroy()


# NEW GUI
# greatly inspired by https://www.youtube.com/watch?v=0CXQ3bbBLVk
availablePlant = glob.glob("front/data/plant-database/json/*")

# file without their path and extension
for i in range(len(availablePlant)):
    availablePlant[i] = availablePlant[i][31:-5]

print(len(availablePlant))
width, height = 480, 320
margin_x, margin_y = 3, 20
fontParameter = ("Helvetica", 20)

root = tk.Tk()
root.title("choose your plant!")
root.geometry(f"{width}x{height}")


def update(newList: list) -> None:
    """function to update the list of plants"""
    listPlant.delete(0, tk.END)
    for plant in newList:
        listPlant.insert(tk.END, plant)


def fillout( event):
    """update entry box"""
    entryBox.delete(0, tk.END)
    entryBox.insert(0, listPlant.get(tk.ACTIVE))

def searchEntry(event):
    typedText = entryBox.get()
    if typedText == "": # if the user has entered nothing
        data = availablePlant
    else:
        data = []
        for plant in availablePlant :
            if typedText.lower() in plant.lower() :
                data.append(plant)
    update(data)


textMessage = tk.Label(
    root, text="enter the plant you search", font=fontParameter)
textMessage.pack(pady=20)

entryBox = tk.Entry(root, font=fontParameter)
entryBox.pack()

listPlant = tk.Listbox(root, width=50)
listPlant.pack(pady=40)

update(availablePlant)
listPlant.bind("<<ListboxSelect>>", plante_choosing)
entryBox.bind("<KeyRelease>", searchEntry)

root.mainloop()