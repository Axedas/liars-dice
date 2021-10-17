import { Die, DICE_VALUES } from "./die";

export class Player {
  /**
   * Player's unique id.
   */
  readonly id: string;

  /**
   * Game that the player is currently in.
   */
  protected gameId: string;

  /**
   * Whether the player is ready to start the game or not.
   */
  protected ready: boolean;

  /**
   * Whether the player can still make calls.
   */
  protected alive: boolean;

  /**
   * The player's hand. Dice length cannot exceed 5. If dice length falls to 0,
   * then the player's `alive` status should be set to false.
   */
  protected dice: (Die | undefined)[];

  constructor(id: string) {
    this.id = id;
    this.alive = true;
  }

  joinGame(gameId: string) {
    this.gameId = gameId;
  }

  readyUp(): boolean {
    return (this.ready = true);
  }

  rollDice(): void {
    this.dice = this.dice.map(
      (_: Die) => DICE_VALUES[Math.floor(Math.random() * 6)]
    );
  }

  /**
   * Gives a player a die.
   * @returns the current number of dice the player has.
   */
  gainDie(): number {
    if (this.dice.length === 5)
      throw new Error("Players cannot have more than 5 dice!");
    return this.dice.push(1);
  }

  /**
   * Subtracts a player's die from his hand.
   * @returns the current number of dice the player has.
   */
  loseDie(): number {
    this.dice.pop();
    if (this.dice.length === 0) this.alive = false;
    return this.dice.length;
  }
}

export default Player;
