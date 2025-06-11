namespace SpriteKind {
    export const lever = SpriteKind.create()
    export const wall = SpriteKind.create()
    export const diamond = SpriteKind.create()
    export const water = SpriteKind.create()
    export const rising_platform = SpriteKind.create()
}
function switchLevel () {
    if (current_level == 1) {
        tiles.setCurrentTilemap(tilemap`level1`)
        createElevator()
        createLever()
    }
    createPlayer()
    createDiamonds()
    createWater()
}
function createLever () {
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        lever = sprites.create(img`
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
        tiles.placeOnTile(lever, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.diamond, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.lever, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        disappearingTile = sprites.create(img`
            d 1 1 1 1 1 1 b d 1 1 1 1 1 1 b 
            1 d d d d d d b 1 d d d d d d b 
            1 d d d d d 6 b 1 d d d d d d b 
            1 d d d d d d 6 1 d d d d d d b 
            1 d d d d d d 6 1 d d d d d d b 
            1 d d 6 d d d b 1 d d d d d d b 
            1 6 6 d d d d d 1 d d d d d d d 
            b b 6 b b b 6 b 6 b 6 b b b d e 
            d 1 1 1 1 d b 6 6 6 1 1 1 1 1 b 
            1 d d d d d d e 6 1 d d d d d b 
            1 d d d d d d e e d d d d d d b 
            1 d d d d d d e b d d d d d b b 
            1 d d d d d d b 1 d d d b d d b 
            1 d d d d d d b 1 d d d b d d b 
            1 d d d d d d d 1 d d b d d d d 
            b b b b b b d e d b b b b b b e 
            `, SpriteKind.wall)
        tiles.placeOnTile(lever, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        sprites.destroyAllSpritesOfKind(SpriteKind.wall)
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
function createWater () {
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        lake = sprites.create(img`
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            6 6 6 6 9 9 9 6 6 6 9 9 9 9 9 9 
            9 9 6 6 6 6 6 9 9 9 9 6 6 6 9 9 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 8 8 8 6 6 6 6 6 6 8 8 8 8 6 
            8 8 8 6 6 6 8 8 8 6 6 6 6 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            c c c c c c c c c c c c c c c c 
            `, SpriteKind.water)
        tiles.placeOnTile(lake, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.water, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.ashes, 2000)
    pause(2000)
    game.gameOver(false)
})
function setVariable () {
    player_speed = 100
    jump_speed = -150
    gravity = 500
}
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
let elevator: Sprite = null
let lake: Sprite = null
let gravity = 0
let diamonds: Sprite = null
let disappearingTile: Sprite = null
let jump_speed = 0
let canDoubleJump = false
let lever: Sprite = null
let player_speed = 0
let mySprite: Sprite = null
let current_level = 0
scene.setBackgroundColor(12)
setVariable()
current_level = 1
mySprite = sprites.create(assets.image`even smaller`, SpriteKind.Player)
controller.moveSprite(mySprite, player_speed, 0)
scene.cameraFollowSprite(mySprite)
switchLevel()
forever(function () {
    if (mySprite.vy == 0) {
        canDoubleJump = true
    }
})
