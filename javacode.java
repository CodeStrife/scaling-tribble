public class Mastermind	{

	private static final String RED = "\033[1;41m";
	private static final String REDFG = "\033[1;31m";
	private static final String GREEN = "\033[1;42m";
	private static final String GREENFG = "\033[1;32m";
	private static final String YELLOW = "\033[1;43m";
	private static final String YELLOWFG = "\033[1;33m";
	private static final String BLUE = "\033[1;44m";
	private static final String BLUEFG = "\033[1;34m";
	private static final String PURPLE = "\033[1;45m";
	private static final String PURPLEFG = "\033[1;35m";
	private static final String AQUA = "\033[1;46m";
	private static final String WHITE = "\033[1;47m";
	private static final String BLACKFG = "\033[1;30m";
	private static final String RESET = "\033[0m";
	
	private static final String TITLE = YELLOWFG + "Mastermind" + RESET + " " + YELLOWFG + "by" + RESET + " " + 
								YELLOWFG + "Misacorp\n" + RESET;
	private static final String VERSION = "v0.9.2 26.2.2010";

	private static Reader read = new Reader();

	private static ScoreChart scores = new ScoreChart();
	private static HighscoreManager hsmanager = new HighscoreManager();

	public static void main(String[] args)	{
		displayMainMenu();
		}

	private static void displayMainMenu()	{

		int option = 0;

		clearScreen();

		System.out.println("\n\n\n\t" + TITLE +
				   "\t  " + VERSION + "\n\n" +
				   "\t  " + PURPLEFG + "--" + RESET + " " + PURPLEFG + "Main" + RESET + " " + PURPLEFG + "menu" + 
				   RESET + " " + PURPLEFG + "--" + RESET + "\n\n" +
				   "\t 1. Start new game\n" +
				   "\t 2. View highscores\n" +
				   "\t 3. Instructions\n" + 
				   "\t 4. Exit game\n" +
				   "\n\n\n\n\n\n\n\n");

		while(option != 1 || option != 2 || option != 3 || option != 4)	{

			option = read.readInt();

			if(option == 1)
				startNewGame();
			if(option == 2)
				displayHighscores();
			if(option == 3)
				displayHelp();
			if(option == 4)	{
				clearScreen();
				System.exit(0);
				}
			displayMainMenu();
			}	
		}

	private static void startNewGame()	{

		Mastermindgame game = new Mastermindgame();

		Row guessRow;
		char[] guess;

		clearScreen();
		displayGuessHelp();

		do	{
			do	{
				guess = read.readString().toLowerCase().toCharArray();
				
				if(guess.length < 4)	{
					pause(game);
					}
				}
			while(!checkColorValidity(guess) || guess.length < 4);
			
			guessRow = new Row(new Peg(guess[0]), new Peg(guess[1]), new Peg(guess[2]), new Peg(guess[3]));

			game.guess(guessRow);

			clearScreen();
			game.printGameState();
			System.out.println();
			displayGuessHelp();
			
			if(guessRow.equals(game.getCorrectRow()))	{					// If guess was correct
				scores.addScore(win(game));
				hsmanager.saveScores(scores);
				displayMainMenu();
				}
			}
		while(game.getCurrentGuess() < game.getMaxGuesses());				// Loop until MAXGUESSES reached

		clearScreen();
		game.printGameState();

		System.out.println("\n\t\tGAME OVER!\n" +
				   		   "\t The correct row was: " + game.getCorrectRow() + "\n\n\t   Press ENTER to continue");

		read.anyKey();
		displayMainMenu();
		}

	private static void pause(Mastermindgame g)	{
		
		g.pause();
		int option = 0;

		while(option != 1 || option != 2)	{

			clearScreen();
			System.out.println("\n\n\n\t" + TITLE +
					   "\t  " + VERSION + "\n\n" +
					   "\t  " + REDFG + "--" + RESET + " " + REDFG + "Game" + RESET + " " + REDFG + "paused" + RESET 
					   + " " + REDFG + "--" + RESET + "\n\n" +
					   "\t 1. Resume\n" +
					   "\t 2. Main menu\n" +
					   "\n\n\n\n\n\n\n\n\n");		
		
			option = read.readInt();

			if(option == 1)
				break;
			if(option == 2)
				displayMainMenu();					   
			}

		g.unPause();
		clearScreen();
		g.printGameState();
		System.out.println();
		displayGuessHelp();
		}
	
	private static void displayHighscores()	{
		clearScreen();
		scores = hsmanager.loadScores().copy();
		
		System.out.println("\n\n\n\t" + TITLE +
			   "\t  " + VERSION + "\n\n" +
			   "\t  " + BLUEFG + "--" + RESET + " " + BLUEFG + "Highscores" + RESET +
			   " " + BLUEFG + "--" + RESET + "\n\n");	
		
		System.out.println("\tName\t\tGuesses\tTime");
		scores.printScores();
		System.out.println("\n\n\n\n");
		System.out.println("\tPress ENTER to return to the main menu.");
		read.anyKey();
		}

	private static void clearScreen()	{

		String ESC = "\033[";

		System.out.print(ESC + "2J");
		System.out.flush();
		}

	private static boolean checkColorValidity(char[] c)	{

		ArrayList<Character> validColors = new ArrayList<Character>();

		for(int i = 0; i < Peg.getPossibleColors().length; i++)	{
			validColors.add(Peg.getPossibleColors()[i]);
			}
	
		if(c.length >= 4)	{
			for(int i = 0; i < c.length; i++)	{
				if(!validColors.contains(c[i]))	{
					System.out.print("\"" + c[i] + "\" is not a valid color. Try again!\n>");
					return false;
					}
				}
			}
		return true;
		}

	private static Score win(Mastermindgame g)	{

		int time = (int)g.getCurrentTime()/1000;
		int guesses = g.getCurrentGuess();

		clearScreen();
		g.printGameState();
	
		System.out.print("\n\t" + GREENFG + "Congratulations! You have solved the correct row!\n\n" + RESET + 
				   "Enter your name below and see if you made it to the highscores!\n" +
				   "NOTE: Entered names can be up to 7 characters long.\n" +
				   "My name is ");
		String name = read.readString();
		
		Score score = new Score(name, guesses, time);

		System.out.println(GREENFG + "\nYour score was: \n" + RESET + 
						   "Name\t\tGuesses\tTime\n" + score);
		System.out.println("\n\t   Press ENTER to continue");
		read.anyKey();

		return score;
		}

	private static void displayGuessHelp()	{
		System.out.print("\nType in 4 letters to make a guess. The possible colors are: " + RED + "R" + RESET + " " + 
		AQUA + "A" + RESET + " " + YELLOW + "Y" + RESET + " " +
		GREEN + "G" + RESET + " " + PURPLE + "P" + RESET + " " + BLUE + "B" + RESET + "\n> ");
		}
}