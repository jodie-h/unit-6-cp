namespace SpriteKind {
    export const lever = SpriteKind.create()
    export const diamond = SpriteKind.create()
    export const rising_platform = SpriteKind.create()
    export const switchLevel = SpriteKind.create()
    export const keyS = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    lastVX = 0
    lastVY = -1
})
function createEnemies_UpDown () {
    for (let value of tiles.getTilesByType(assets.tile`transparency16`)) {
        mySprite2 = sprites.create(img`
            . . f f f . . . . . . . . f f f 
            . f f 8 8 . . . . . . f 8 9 9 8 
            f f 8 8 . . . . . . f 8 9 9 8 . 
            f 8 f 8 . . . . . . f 9 8 8 8 . 
            f f f 8 8 . 8 8 . f 8 9 9 8 8 . 
            f f 8 3 8 8 3 8 8 f 9 8 9 9 8 . 
            f f 9 3 9 8 3 9 8 f 9 8 8 9 8 . 
            . 8 9 9 9 9 9 9 8 9 9 8 8 8 . . 
            . 8 6 9 9 9 6 9 9 8 8 8 8 . . . 
            8 9 9 9 9 9 9 9 9 9 8 8 . . . . 
            8 9 8 9 9 9 8 9 9 9 9 f . . . . 
            f 9 1 f f f 1 9 9 9 9 f 8 . . . 
            f 9 9 9 9 9 9 9 9 9 9 f 8 8 . . 
            . f 9 9 9 9 9 9 9 9 8 f . . . . 
            . . f 9 9 9 9 9 9 8 f . . . . . 
            . . . f f f f f f f . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        mySprite2.vx = 75
        mySprite2.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.switchLevel, function (sprite, otherSprite) {
    current_level += 1
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (current_level == 2 && ofshots >= 0) {
        ofshots += -1
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 . . . . . . 
            . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
            . . 4 d 5 d 5 5 5 d d d 4 4 . . 
            . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
            . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . . 2 4 d d 5 5 5 5 d d 5 4 . . 
            . . . 2 2 4 d 5 5 d d 4 4 . . . 
            . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
            . . . 2 2 4 4 4 4 4 4 2 2 . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            `, mySprite, lastVX * 75, lastVY * 75)
        projectile.setKind(SpriteKind.Projectile)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
function createLever () {
    let location = 0
    leverlist = [lever1]
    holelocationlist = [location]
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        lever1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . 1 1 1 . 
            . . . . . . . . . . . . 1 1 1 . 
            . . . . . . . . . . . 1 1 1 1 . 
            . . . . . . . . . . 1 1 . . . . 
            . . . . . . . . . 1 1 . . . . . 
            . . . . . . . . 1 1 . . . . . . 
            . . . . . . . 1 1 . . . . . . . 
            . . . . . . d d d d . . . . . . 
            . . . . . d d d d d d . . . . . 
            . . . . d d d d d d d d . . . . 
            . . . . d d d d d d d d . . . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . f f f f f f f f f f f f . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.lever)
        tiles.placeOnTile(lever1, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        leverlist.unshift(lever1)
        holelocationlist.unshift(location)
    }
}
function switchLevel2 () {
    for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
        door = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . b b b b b b . . . . . 
            . . . . b b e e e e b b . . . . 
            . . . b b e e e e e e b b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b c c c c c c c c b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b e c e e e e e e b . . . 
            . . . b e c e e e e e e b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b c c c c c c c c b . . . 
            . . . b e e e e e e e e b . . . 
            . . . b e e e e e e e e b . . . 
            `, SpriteKind.switchLevel)
        tiles.placeOnTile(door, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        door.setScale(2, ScaleAnchor.Top)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = jump_speed
        canDoubleJump = true
    } else if (canDoubleJump == true) {
        mySprite.vy = jump_speed * 0.85
    }
})
function createKeys () {
    for (let value of tiles.getTilesByType(assets.tile`transparency16`)) {
        key = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . f f f f . . . . . . . . . . 
            . f 5 5 5 5 f . . . . . . . . . 
            f 5 5 5 5 5 f . . . . . . . . . 
            f 5 5 5 5 5 5 f f f f f f f f . 
            f 5 5 f 5 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 f f 5 5 5 5 5 5 5 5 5 5 f 
            f 5 5 5 5 5 5 f f f 5 f 5 5 f . 
            f 5 5 5 5 5 f . . f 5 f 5 5 f . 
            . f 5 5 5 5 f . . . f f f f . . 
            . . f f f f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.keyS)
        tiles.placeOnTile(key, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.diamond, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    ofshots += 1
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    sprites.destroy(sprite, effects.ashes, 2000)
    game.gameOver(false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    lastVX = -1
    lastVY = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.rising_platform, function (sprite, otherSprite) {
    mySprite.vy = elevator.vy * 1.5
})
function loadLevel () {
    if (current_level == 1) {
        tiles.setCurrentTilemap(tilemap`level1`)
        createElevator()
        createLever()
        switchLevel2()
    } else if (current_level == 2) {
        info.setLife(3)
        tiles.setCurrentTilemap(tilemap`level2`)
    }
    createPlayer()
    createDiamonds()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.lever, function (sprite, otherSprite) {
    for (let index = 0; index <= leverlist.length - 1; index++) {
    	
    }
})
function createDiamonds () {
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        diamonds = sprites.create(assets.image`diamond`, SpriteKind.diamond)
        animation.runImageAnimation(
        diamonds,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 2 f 2 2 2 f 4 f . . . 
            . . . f 2 f 2 2 2 2 2 f 4 f . . 
            . . f f f f f f f f f f f f f . 
            . . f 2 2 f 2 2 2 2 2 f 4 4 f . 
            . . . f 2 2 f 2 2 2 f 4 4 f . . 
            . . . . f 2 f 2 2 2 f 4 f . . . 
            . . . . . f 2 f 2 f 4 f . . . . 
            . . . . . . f 2 f 4 f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 2 f 2 2 4 f 2 f . . . 
            . . . f 2 f 2 2 2 2 4 f 2 f . . 
            . . f f f f f f f f f f f f f . 
            . . f 2 2 f 2 2 2 4 4 f 2 2 f . 
            . . . f 2 2 f 2 2 4 f 2 2 f . . 
            . . . . f 2 f 2 2 4 f 2 f . . . 
            . . . . . f 2 f 4 f 2 f . . . . 
            . . . . . . f 2 f 2 f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 2 f 2 4 2 f 2 f . . . 
            . . . f 2 f 2 2 4 2 2 f 2 f . . 
            . . f f f f f f f f f f f f f . 
            . . f 2 2 f 2 2 4 2 2 f 2 2 f . 
            . . . f 2 2 f 4 4 4 f 2 2 f . . 
            . . . . f 2 f 4 4 4 f 2 f . . . 
            . . . . . f 2 f 4 f 2 f . . . . 
            . . . . . . f 2 f 2 f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 2 f 4 2 2 f 2 f . . . 
            . . . f 2 f 4 2 2 2 2 f 2 f . . 
            . . f f f f f f f f f f f f f . 
            . . f 2 2 f 4 4 2 2 2 f 2 2 f . 
            . . . f 2 2 f 4 2 2 f 2 2 f . . 
            . . . . f 2 f 4 4 2 f 2 f . . . 
            . . . . . f 2 f 4 f 2 f . . . . 
            . . . . . . f 2 f 2 f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 f 2 2 2 f 2 f . . . 
            . . . f 4 f 2 2 2 2 2 f 2 f . . 
            . . f f f f f f f f f f f f f . 
            . . f 4 4 f 2 2 2 2 2 f 2 2 f . 
            . . . f 4 4 f 2 2 2 f 2 2 f . . 
            . . . . f 4 f 2 2 2 f 2 f . . . 
            . . . . . f 4 f 2 f 2 f . . . . 
            . . . . . . f 4 f 2 f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        150,
        true
        )
        tiles.placeOnTile(diamonds, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    mySprite.ay = gravity
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    lastVX = 1
    lastVY = 0
})
function createEnemies_LeftRight () {
    for (let value of tiles.getTilesByType(assets.tile`transparency16`)) {
        mySprite2 = sprites.create(img`
            . . f f f . . . . . . . . f f f 
            . f f 8 8 . . . . . . f 8 9 9 8 
            f f 8 8 . . . . . . f 8 9 9 8 . 
            f 8 f 8 . . . . . . f 9 8 8 8 . 
            f f f 8 8 . 8 8 . f 8 9 9 8 8 . 
            f f 8 3 8 8 3 8 8 f 9 8 9 9 8 . 
            f f 9 3 9 8 3 9 8 f 9 8 8 9 8 . 
            . 8 9 9 9 9 9 9 8 9 9 8 8 8 . . 
            . 8 f 9 9 9 f 9 9 8 8 8 8 . . . 
            8 9 9 9 9 9 9 9 9 9 8 8 . . . . 
            8 9 8 9 9 9 8 9 9 9 9 f . . . . 
            f 9 1 f f f 1 9 9 9 9 f 8 . . . 
            f 9 9 9 9 9 9 9 9 9 9 f 8 8 . . 
            . f 9 9 9 9 9 9 9 9 8 f . . . . 
            . . f 9 9 9 9 9 9 8 f . . . . . 
            . . . f f f f f f f . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(mySprite2, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        mySprite2.vy = 75
        mySprite2.setBounceOnWall(true)
    }
}
function setVariable () {
    player_speed = 100
    jump_speed = -150
    gravity = 500
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    lastVX = 0
    lastVY = 1
})
function createElevator () {
    for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
        elevator = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            d d d d d d d d d d d d d d d d 
            d d d d d d d d d d d d d d d d 
            b b b b b b b b b b b b b b b b 
            b b b b b b b b b b b b b b b b 
            b b b b b b b b b b b b b b b b 
            b b b b b b b b b b b b b b b b 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.rising_platform)
        tiles.placeOnTile(elevator, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        elevator.setVelocity(0, 50)
        elevator.setBounceOnWall(true)
    }
}
function createPlayer () {
    if (current_level == 1) {
        for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
            tiles.placeOnTile(mySprite, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
        mySprite.ay = gravity
    }
}
function destroySprites () {
    for (let value of sprites.allOfKind(SpriteKind.diamond)) {
        sprites.destroy(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.lever)) {
        sprites.destroy(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.rising_platform)) {
        sprites.destroy(value)
    }
    for (let value of sprites.allOfKind(SpriteKind.switchLevel)) {
        sprites.destroy(value)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.ashes, 300)
    info.changeLifeBy(-1)
})
let gravity = 0
let diamonds: Sprite = null
let elevator: Sprite = null
let key: Sprite = null
let jump_speed = 0
let canDoubleJump = false
let door: Sprite = null
let holelocationlist: number[] = []
let lever1: Sprite = null
let leverlist: Sprite[] = []
let projectile: Sprite = null
let mySprite2: Sprite = null
let lastVY = 0
let lastVX = 0
let player_speed = 0
let mySprite: Sprite = null
let current_level = 0
let ofshots = 0
scene.setBackgroundColor(12)
setVariable()
ofshots = 0
current_level = 1
mySprite = sprites.create(assets.image`even smaller`, SpriteKind.Player)
controller.moveSprite(mySprite, player_speed, 0)
scene.cameraFollowSprite(mySprite)
loadLevel()
forever(function () {
    if (mySprite.vy == 0) {
        canDoubleJump = true
    }
})
