import discord
from discord.ext import commands

bot = commands.Bot(command_prefix = "!", description = "nothing")

@bot.event
async def on_ready():
    print('We have logged in as {0.user}')
    await bot.change_presence(activity=discord.Streaming(name="feed your plant", url="https://www.twitch.tv/apoon33"))

@bot.command()
async def temp(ctx):
    embed2 = discord.Embed(title = "**temperature:**", description = "")
    embed2.set_thumbnail(url = "https://img2.freepng.fr/20180420/iqw/kisspng-thermometer-temperature-computer-icons-symbol-thermometer-vector-5ad97eb03271c0.6145104915242031842066.jpeg")
    embed2.add_field(name="temperature actuelle:", value = "pas de temperature", inline = False)
    embed2.add_field(name="temperature voulu:", value = "pas de temperature voulue", inline = False)
    await ctx.send(embed = embed2)

    

bot.run('Nzc5NzY0MDk4Nzc0MjA0NDQ3.X7lR6A.oghtDV3hsdzgb2fyefltbYvBIro')
