import json
x=1
u=1
with open("../data/plant.json","r") as main:
	file=json.load(main)
for i in file:
	print(str(x)+":"+str(file[i]["nom"]))
	x+=1
chose=int(input("choisissez votre plante dans la liste ci dessus (par leur numéro)"))
for y in file:
	if u==chose:
		with open('../data/choice.txt',"a") as yeah:
			yeah.write(str(y))
			print("done!")
	u+=1