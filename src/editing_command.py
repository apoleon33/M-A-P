import os
import sqlite3
import time

class Database():
    '''everything linked with the database management'''
    def __init__(self,db):
        self.location = db
        self.opening()

    def insert_sql(self,temperature:int,humidity:int) -> None :
        '''insert data in the database'''
        time_now = datetime.date.fromtimestamp(time.time())
        self.cursore.execute(f"INSERT INTO data VALUES( {str(time_now)} ,{temperature}, {humidity})" )
        self.db.commit()

    def find_sql(self,date:str) -> list:
        '''
        find data from a specific date
        not used at the moment
        The date have to be in the form "year-month-day"
        '''
        self.cursore.execute(f"SELECT temperature,humidity FROM data WHERE date='{date}'")
        old_data = self.cursore.fetchall()
        return old_data

    def opening(self):
        self.db = sqlite3.connect(self.location)
        self.cursore = self.db.cursor()

    def closing(self):
        self.cursore.close()
        self.db.close()


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