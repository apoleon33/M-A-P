import json
import os
import tkinter as tk

def return_plant_list() -> list:
    '''
    function that return a list with the name of all usable plants
    '''
    with open("front/data/plant.json", "r") as main:
        file = json.load(main)
    pure_list = []
    for h in file:
        pure_list.append(str(file[h]["nom"]))
    return pure_list

def plante_choosing():
    '''
    function that will make the user choose the plant he/she want, by showing every plant compatible
    '''
    x = 1
    u = 1

    try:
        os.remove("/front/data/choice.txt")
    except:
        print("",end="")

    with open("front/data/plant.json", "r") as main:
        file = json.load(main)

    chose = plant_list.get(plant_list.curselection())

    for y in file:
        if y == chose:
            yeah = open('front/data/choice.txt', "w")
            yeah.write(str(y))
            print("done!")
            yeah.close()
    app.destroy()

# GUI
width, height = 480, 320
margin_x, margin_y = 3, 3

app = tk.Tk()
app.title("choose your plant!")

role_label=tk.Label(app,text="choose the plant on the list below:")
role_label.grid(row=0,column=0,padx=margin_x,pady=margin_y)

#list of available plants
plant_list = tk.Listbox(app)
plant_list_name = return_plant_list()
for i in range(len(plant_list_name)):
    plant_list.insert(i+1, plant_list_name[i])
plant_list.grid(row=1, column=0, padx=margin_x, pady=margin_y)

#cancel button
cancel_button = tk.Button(app,text="cancel",width=3,command=app.destroy)
cancel_button.grid(row=1,column=2,padx=margin_x,pady=margin_y)

#enter button
enter_button = tk.Button(app,text="enter",width=3,command= lambda: plante_choosing())
enter_button.grid(row=1,column=1,padx=3,pady=3)

app.mainloop()
