import os

import discord


TOKEN = "Nzc5NzY0MDk4Nzc0MjA0NDQ3.X7lR6A.oghtDV3hsdzgb2fyefltbYvBIro"

client = discord.Client()

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')
async def on_message(message):
    if 'temperature' in message.content.lower():
        await message.channel.send('Happy Birthday! 🎈🎉')


client.run(TOKEN)
