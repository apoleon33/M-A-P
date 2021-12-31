from rich import *
from pypresence import Presence


class DiscordIntegration():
    def __init__(self, token=None, bot_token=None) -> None:
        self.rich_token = token
        self.bot_token = bot_token
        self.RPC = None

    def createRpc(self) -> None:
        try:
            self.RPC = Presence(self.rich_token)
            self.RPC.connect()
        except:
            pass

    def update_presence(self, time: int, temperature: int = 0, humidity:int =0) -> None:
        try:
            self.RPC.update(large_image="plant",
                            large_text="M-A-P",
                            small_image="simulation",
                            small_text="using the simulator",
                            details=f"temperature: {str(temperature)} °C",
                            state=f"humidity: {str(humidity)} %",
                            start=time,
                            buttons=[{"label": "github", "url": 'https://github.com/apoleon33/M-A-P'}])
        except:
            return False