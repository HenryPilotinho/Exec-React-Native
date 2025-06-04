// gameLogic.js

// Representação de uma célula:
// {
//   isMine: false,
//   isRevealed: false,
//   isFlagged: false,
//   adjacentMines: 0,
//   row: r,
//   col: c
// }

export const createBoard = (rows, cols, minesCount) => {
  let board = [];
  // 1. Inicializar o tabuleiro com células vazias
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = {
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
        row: r,
        col: c,
      };
    }
  }

  // 2. Distribuir as minas aleatoriamente
  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      minesPlaced++;
    }
  }

  // 3. Calcular minas adjacentes para cada célula
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].isMine) {
        let mineCount = 0;
        // Verificar todas as 8 células vizinhas
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Não contar a própria célula
            const nr = r + i;
            const nc = c + j;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
              mineCount++;
            }
          }
        }
        board[r][c].adjacentMines = mineCount;
      }
    }
  }
  return board;
};

export const revealCellLogic = (board, row, col) => {
  let newBoard = JSON.parse(JSON.stringify(board)); // Cópia profunda para evitar mutação direta
  let mineClicked = false;
  let cellsToReveal = [{ row, col }]; // Fila para o algoritmo de flood fill
  let revealedCount = 0;

  // Se a célula já está revelada ou marcada com bandeira, não faz nada (a menos que seja o primeiro clique)
  if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
      // Exceção: se for o primeiro clique e for uma mina, o jogo pode ter lógicas diferentes
      // para garantir que o primeiro clique nunca seja uma mina.
      // Para simplificar, vamos permitir o clique se não estiver revelada, mesmo que marcada.
      // Ou, melhor, impedir o clique em células com bandeira.
      if(newBoard[row][col].isFlagged) {
          return { newBoard, mineClicked, allNonMinesRevealed: checkWinCondition(newBoard) };
      }
  }

  const cell = newBoard[row][col];

  if (cell.isMine) {
    mineClicked = true;
    // Revelar todas as minas em caso de game over
    newBoard.forEach(rowArr => rowArr.forEach(c => {
      if (c.isMine) c.isRevealed = true;
    }));
    return { newBoard, mineClicked, allNonMinesRevealed: false };
  }

  // Algoritmo de Flood Fill para revelar células vazias adjacentes
  const reveal = (r, c) => {
    if (r < 0 || r >= newBoard.length || c < 0 || c >= newBoard[0].length || newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) {
      return;
    }

    newBoard[r][c].isRevealed = true;
    revealedCount++; // Contar células reveladas (útil para a condição de vitória)

    if (newBoard[r][c].adjacentMines === 0 && !newBoard[r][c].isMine) {
      // Revelar vizinhos recursivamente
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // if (i === 0 && j === 0) continue; // Já foi tratada
          reveal(r + i, c + j);
        }
      }
    }
  };

  reveal(row, col);

  const allNonMinesRevealed = checkWinCondition(newBoard);
  return { newBoard, mineClicked, allNonMinesRevealed };
};


const checkWinCondition = (board) => {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            const cell = board[r][c];
            if (!cell.isMine && !cell.isRevealed) {
                return false; // Ainda tem célula não-mina escondida
            }
        }
    }
    return true; // Todas as não-minas foram reveladas
};


export const placeFlagLogic = (board, row, col) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  const cell = newBoard[row][col];

  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged;
  }
  return { newBoard };
};