from rich import *
from pypresence import Presence


class DiscordIntegration():
    def __init__(self, token=None, bot_token=None) -> None:
        self.rich_token = token
        self.bot_token = bot_token
        self.RPC = None

    def createRpc(self) -> None:
        self.RPC = Presence(self.rich_token)
        self.RPC.connect()

    def update_presence(self, time: int, temperature: int = 0) -> None:
        self.RPC.update(large_image="plant",
                        large_text="M-A-P",
                        small_image="simulation",
                        small_text="using the simulator",
                        details="temperature: " + str(temperature) + " °C",
                        start=time,
                        buttons=[{"label": "github", "url": 'https://github.com/apoleon33/M-A-P'}])
    
    