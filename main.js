(function() {
    
    'use strict'

    var Game = {}

    Game.canvas = document.getElementById("canvas")
    Game.ctx = canvas.getContext("2d")
    Game.canvas.width = 600
    Game.canvas.height = 400

    Game.init = function () {
        var self = this
        self.drawMap()
        self.player = new Game.Person()
        window.addEventListener('keyup', function (event) {
            self.clearCanvas()
            self.drawMap()
            let code = event.keyCode? event.keyCode : event.charCode
            let arrowCode = {
                38: 'up',
                37: 'left',
                39: 'right',
                40: 'down'
            }
            let direction = toTitleCase(arrowCode[code])
            self.player['go' + direction]()
        })
    }

    Game.clearCanvas = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    Game.drawMap = function () {
        let verticalTimes = ((600 / 50) - 1)
        let horizontalTimes = ((400 / 50) - 1)
        for (let i = 0; i < verticalTimes; i++) {
            let x = (i + 1) * 50
            this.ctx.rect(x, 0, 1, 400)
            if (i < horizontalTimes) {
                let y = (i + 1) * 50
                this.ctx.rect(0, y, 600, 1)
            }
            this.ctx.fill()
        }
    }


    //
    // Person
    //
    Game.Person = function () {
        this.x = 225
        this.y = 225
        this.render()
    }

    Game.Person.prototype.goUp = function () {
        this.y = this.y - 50 
        this.render()
    }

    Game.Person.prototype.goRight = function () {
        this.x = this.x + 50 
        this.render()
    }

    Game.Person.prototype.goLeft = function () {
        this.x = this.x - 50
        this.render()
    }

    Game.Person.prototype.goDown = function () {
        this.y = this.y + 50
        this.render()
    }

    Game.Person.prototype.render = function () {
        Game.ctx.beginPath()
        Game.ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI)
        Game.ctx.fill()
    }


    // run!
    Game.init()

    window.Game = Game
    

    // Utils

    function toTitleCase(str) {
       return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
    }
})()