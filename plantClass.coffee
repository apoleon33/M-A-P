# code for the plant class: i prefer to do it in coffeescript

class Plant
    constructor: (@name, @ultimateTemperature, @ultimateHumidity) ->
        @actualTemperature = 0
        @actualHumidity = 0
        @historicOfTemperature = []
        @historicOfHumidity = []

    setTemperature: (newTemperature) ->
        @historicOfTemperature.push @actualTemperature
        @actualTemperature = newTemperature
    
    setHumidty: (newHumidity) ->
        @historicOfHumidity.push @actualHumidity
        @actualHumidity = newHumidity

module.exports = Plant