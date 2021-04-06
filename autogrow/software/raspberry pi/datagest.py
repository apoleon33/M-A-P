import sqlite3


def add_temp(tim,chaleur):
    conn =sqlite3.connect("dataf.db")
    cur =conn.cursor()
    cur.execute(f"INSERT INTO temperature(tim,chaleur) VALUES({tim},{chaleur})")
    conn.commit()
    cur.close()
    conn.close()

def add_hum(tim,hum):
    conn =sqlite3.connect("dataf.db")
    cur =conn.cursor()
    cur.execute(f"INSERT INTO temperature(tim,hum) VALUES({tim},{hum})")
    conn.commit()
    cur.close()
    conn.close()