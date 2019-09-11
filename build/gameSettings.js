/**Stores game settings and constant values. Ideally, this would be read from a JSON file. */
class GameSettings {
    constructor() {
        this.playerSpeed = 300; //pixel per seconds
        this.playerShotCooldown = 0.5; //in seconds
        this.playerWidth = 50; //pixels
        this.playerHeight = 50; //pixels
        this.projectileSpeed = 350; //pixel per seconds
        this.enemySpeed = 250; //pixel per seconds
        this.enemySpawnRate = 2; //in seconds
        this.farBackgroundSpeed = 50; //pixel per seconds
        this.nearBackgroundSpeed = 200;
        //screens
        this.splashLingerDuration = 2; //seconds
        this.splashFadeSpeed = 0.016; //how much from full opacity each frame
        this.gameOverLingerDuration = 2; //in seconds
        this.gameOverFadeDuration = 1; //in seconds
        //particles
        this.starParticleLifetime = 1.5;
        this.starParticleDecaySpeed = 0.016; //how much from full opacity each frame
        this.squareParticleLifetime = 1.5; //in seconds
        this.squareParticleSpeed = 100; //pixel per frame
    }
}
//# sourceMappingURL=gameSettings.js.map