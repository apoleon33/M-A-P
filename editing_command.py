import os


def replace(before: str, after: str):
    os.remove(after)
    string = ""
    with open(before, "r") as temp:
        tempe = temp.readlines()
    with open(after, "w") as tem:
        tem.write(string.join(tempe))


def writing(file: str, don):
    os.remove(file)
    with open(file, "w") as files:
        files.write(don)
