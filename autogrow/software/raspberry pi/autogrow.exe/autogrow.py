import discord

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('!hello'):
        await message.channel.send('Hello!')
    if message.content.startswith('!temp'):
        await message.channel.send('no temperature available ')
        await message.channel.send('sorry')
    if message.content.startswith("!humidity"):
        await message.channel.send('no humidity available')
    if message.content.startswith("!picture"):
        await message.channel.send("no camera available")
    

client.run('Nzc5NzY0MDk4Nzc0MjA0NDQ3.X7lR6A.oghtDV3hsdzgb2fyefltbYvBIro')