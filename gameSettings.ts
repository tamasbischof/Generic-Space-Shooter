/**Stores game settings and constant values. Ideally, this would be read from a JSON file. */
class GameSettings {
    playerSpeed: number = 300; //pixel per seconds
    playerShotCooldown: number = 0.5; //in seconds
    playerWidth: number = 50; //pixels
    playerHeight: number = 50; //pixels
    projectileSpeed: number = 350; //pixel per seconds
    enemySpeed: number = 250; //pixel per seconds
    enemySpawnRate: number = 2; //in seconds
    farBackgroundSpeed: number = 50; //pixel per seconds
    nearBackgroundSpeed: number = 200;
    //screens
    splashLingerDuration: number = 2; //seconds
    splashFadeSpeed: number = 0.016; //how much from full opacity each frame
    gameOverLingerDuration: number = 2; //in seconds
    gameOverFadeDuration: number = 1; //in seconds
    //particles
    starParticleLifetime: number = 1.5;
    starParticleDecaySpeed: number = 0.016; //how much from full opacity each frame
    squareParticleLifetime: number = 1.5; //in seconds
    squareParticleSpeed: number = 100; //pixel per frame
}