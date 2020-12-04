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
@bot.command()
async def info(ctx):
    embed1 = discord.Embed(title ="**info sur la plante**", description ="")
    embed1.add_field(name ="nom de la plante:", value= "pas de plante choisi", inline =False)
    embed1.add_field(name ="temperature conseillé:", value = "pas de plante choisi",inline =False)
    embed1.add_field(name ="hygrométrie conseillé:", value = "pas de plante choisi",inline =False)
    await ctx.send(embed = embed1)
@bot.command()
async def github(ctx):
    await ctx.send("https://github.com/apoleon33/autogrow")
bot.run('')  #token du bot normalement
