namespace SpriteKind {
    export const lever = SpriteKind.create()
    export const diamond = SpriteKind.create()
    export const rising_platform = SpriteKind.create()
    export const switchLevel = SpriteKind.create()
    export const keyS = SpriteKind.create()
    export const chest = SpriteKind.create()
    export const disappearing_tile = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    lastVX = 0
    lastVY = -1
})
function createEnemies_UpDown () {
    for (let value of tiles.getTilesByType(sprites.dungeon.collectibleBlueCrystal)) {
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
        tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
        mySprite2.vx = 150
        mySprite2.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.switchLevel, function (sprite, otherSprite) {
    current_level = 2
    loadLevel()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (current_level == 2 && ofshots >= 1) {
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
            `, mySprite, lastVX * 100, lastVY * 100)
        projectile.setKind(SpriteKind.Projectile)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        projectile.setFlag(SpriteFlag.DestroyOnWall, true)
    }
})
function createLever () {
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
    }
}
function createChest () {
    for (let value of tiles.getTilesByType(sprites.dungeon.chestClosed)) {
        mySprite3 = sprites.create(img`
            . . b b b b b b b b b b b b . . 
            . b e 4 4 4 4 4 4 4 4 4 4 e b . 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
            b e e 4 4 4 4 4 4 4 4 4 4 e e b 
            b e e e e e e e e e e e e e e b 
            b e e e e e e e e e e e e e e b 
            b b b b b b b d d b b b b b b b 
            c b b b b b b c c b b b b b b c 
            c c c c c c b c c b c c c c c c 
            b e e e e e c b b c e e e e e b 
            b e e e e e e e e e e e e e e b 
            b c e e e e e e e e e e e e c b 
            b b b b b b b b b b b b b b b b 
            . b b . . . . . . . . . . b b . 
            `, SpriteKind.chest)
        tiles.placeOnTile(mySprite2, value)
        tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
        mySprite3.setScale(1.5, ScaleAnchor.Middle)
    }
}
function switchLevel2 () {
    for (let value of tiles.getTilesByType(assets.tile`myTile10`)) {
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
    for (let value of tiles.getTilesByType(sprites.dungeon.collectibleInsignia)) {
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
        tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.diamond, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    ofshots += 1
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
    destroySprites()
    if (current_level == 1) {
        scene.setBackgroundColor(12)
        tiles.setCurrentTilemap(tilemap`level1`)
        createElevator()
        createLever()
        switchLevel2()
    } else if (current_level == 2) {
        scene.setBackgroundColor(11)
        info.setLife(3)
        tiles.setCurrentTilemap(tilemap`level2`)
        createEnemies_UpDown()
        createEnemies_LeftRight()
        createKeys()
    }
    createPlayer()
    createDiamonds()
}
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
            `, SpriteKind.disappearing_tile)
        tiles.placeOnTile(disappearingTile, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        sprites.destroy(disappearingTile)
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
        if (current_level == 1) {
            tiles.setTileAt(value, assets.tile`transparency16`)
        } else if (current_level == 2) {
            tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    lastVX = 1
    lastVY = 0
})
function createEnemies_LeftRight () {
    for (let value of tiles.getTilesByType(sprites.dungeon.collectibleRedCrystal)) {
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
        tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
        mySprite2.vy = 80
        mySprite2.setBounceOnWall(true)
    }
}
function setVariable () {
    player_speed = 100
    jump_speed = -150
    gravity = 500
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.chest, function (sprite, otherSprite) {
    if (_of_keys == 0) {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else if (false) {
        otherSprite.sayText("find " + "all " + "keys! " + _of_keys + " remaining!")
    }
})
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
        controller.moveSprite(mySprite, player_speed, 0)
        mySprite.ay = gravity
    } else if (current_level == 2) {
        for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
            tiles.placeOnTile(mySprite, value)
            tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
        }
        mySprite.ay = 0
        controller.moveSprite(mySprite, 150, 150)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.keyS, function (sprite, otherSprite) {
    _of_keys += -1
    sprites.destroy(otherSprite)
})
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
let player_speed = 0
let diamonds: Sprite = null
let disappearingTile: Sprite = null
let elevator: Sprite = null
let key: Sprite = null
let jump_speed = 0
let canDoubleJump = false
let door: Sprite = null
let mySprite3: Sprite = null
let lever1: Sprite = null
let projectile: Sprite = null
let mySprite2: Sprite = null
let lastVY = 0
let lastVX = 0
let mySprite: Sprite = null
let current_level = 0
let ofshots = 0
let _of_keys = 0
setVariable()
_of_keys = 10
ofshots = 0
current_level = 1
mySprite = sprites.create(assets.image`even smaller`, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
loadLevel()
forever(function () {
    if (mySprite.vy == 0) {
        canDoubleJump = true
    }
})
