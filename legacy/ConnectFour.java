import java.util.Scanner;

public class ConnectFour {

    private static final char[][] BOARD = new char[6][7];

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Initialize the board
        for (int i = 0; i < BOARD.length; i++) {
            for (int j = 0; j < BOARD[0].length; j++) {
                BOARD[i][j] = '-';
            }
        }

        // Start the game loop
        boolean isGameOver = false;
        char currentPlayer = 'Y'; // Yellow goes first

        while (!isGameOver) {
            // Display the board
            displayBoard();

            // Get the player's move
            System.out.println("Player " + currentPlayer + ", enter a column number: ");
            int column = scanner.nextInt();

            // Check if the move is valid
            if (column < 0 || column >= BOARD[0].length || BOARD[0][column] != '-') {
                System.out.println("Invalid move. Try again.");
                continue;
            }

            // Drop the disk
            dropDisk(column, currentPlayer);

            // Check if there is a winner
            if (isWinner(currentPlayer)) {
                isGameOver = true;
                System.out.println("Player " + currentPlayer + " wins!");
            }

            // Switch players
            currentPlayer = currentPlayer == 'Y' ? 'R' : 'Y';
        }

        scanner.close();
    }

    private static void displayBoard() {
        for (int i = BOARD.length - 1; i >= 0; i--) {
            for (int j = 0; j < BOARD[0].length; j++) {
                System.out.print(BOARD[i][j] + " ");
            }
            System.out.println();
        }
    }

    private static void dropDisk(int column, char player) {
        for (int i = 0; i < BOARD.length; i++) {
            if (BOARD[i][column] == '-') {
                BOARD[i][column] = player;
                break;
            }
        }
    }

    private static boolean isWinner(char player) {
        // Check for horizontal wins
        for (int i = 0; i < BOARD.length; i++) {
            int count = 0;
            for (int j = 0; j < BOARD[0].length; j++) {
                if (BOARD[i][j] == player) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        // Check for vertical wins
        for (int i = 0; i < BOARD[0].length; i++) {
            int count = 0;
            for (int j = 0; j < BOARD.length; j++) {
                if (BOARD[j][i] == player) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        // Check for diagonal wins
        for (int i = 0; i < BOARD.length - 3; i++) {
            for (int j = 0; j < BOARD[0].length - 3; j++) {
                if (BOARD[i][j] == player && BOARD[i + 1][j + 1] == player && BOARD[i + 2][j + 2] == player && BOARD[i + 3][j + 3] == player) {
                    return true;
                }
            }
        }

        // Check for diagonal wins in the opposite direction
        for (int i = 3; i < BOARD.length; i++) {
            for (int j = 0; j < BOARD[0].length - 3; j++) {
                if (BOARD[i][j] == player && BOARD[i - 1][j + 1] == player && BOARD[i - 2][j + 2] == player && BOARD[i - 3][j + 3] == player) {
                    return true;
                }
            }
        }

        return false;
    }
}