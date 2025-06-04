import React, { useState, useEffect, useCallback } from 'react'; // Adicionado useCallback
import { StyleSheet, View, Alert, SafeAreaView } from 'react-native'; // Adicionado SafeAreaView
import Board from './components/Board';
import Header from './components/Header,js'; // Importar o Header
import { createBoard, revealCellLogic, placeFlagLogic } from './components/gameLogic';

const App = () => {
  const [boardData, setBoardData] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [minesCount, setMinesCount] = useState(10);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [flagsPlaced, setFlagsPlaced] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [firstMoveMade, setFirstMoveMade] = useState(false); // Para iniciar o timer

  const minesLeft = minesCount - flagsPlaced;

  // Memoizando resetGame para evitar recriações desnecessárias se passado como prop
  const resetGame = useCallback(() => {
    const newBoard = createBoard(rows, cols, minesCount);
    setBoardData(newBoard);
    setGameOver(false);
    setGameWon(false);
    setFlagsPlaced(0);
    setTime(0);
    setTimerActive(false);
    setFirstMoveMade(false);
  }, [rows, cols, minesCount]); // Dependências de resetGame

  useEffect(() => {
    resetGame();
  }, [resetGame]); // resetGame agora é uma dependência estável

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!timerActive || gameOver || gameWon) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar ou quando as condições mudam
  }, [timerActive, gameOver, gameWon]);

  const handleCellPress = (row, col) => {
    if (gameOver || gameWon) return;

    if (!firstMoveMade) {
      setTimerActive(true);
      setFirstMoveMade(true);
      // Lógica para garantir que o primeiro clique não seja uma mina (pode ser movida para createBoard ou aqui)
      // Se boardData[row][col].isMine, reconstruir o tabuleiro até que boardData[row][col] não seja mina.
      // Esta é uma simplificação, uma lógica mais robusta moveria a mina se o primeiro clique fosse nela.
      let currentBoard = boardData;
      if (currentBoard[row][col].isMine) {
          console.log("Primeiro clique foi em uma mina! Gerando novo tabuleiro para este clique.");
          let newBoardSetup;
          do {
              newBoardSetup = createBoard(rows, cols, minesCount);
          } while (newBoardSetup[row][col].isMine);
          setBoardData(newBoardSetup); // Define o novo tabuleiro seguro para o primeiro clique
          // Prossiga com a lógica de revelação no novo tabuleiro
          const { newBoard: revealedNewBoard, mineClicked: newMineClicked, allNonMinesRevealed: newAllNonMinesRevealed } = revealCellLogic(newBoardSetup, row, col);
          setBoardData(revealedNewBoard);
          // Não deve haver mineClicked aqui pela lógica acima
          if (newAllNonMinesRevealed) {
            setGameWon(true);
            setTimerActive(false);
            Alert.alert("Parabéns!", "Você encontrou todas as minas! 🎉", [{ text: "Jogar Novamente", onPress: resetGame }]);
          }
          return; // Retorna após ajustar o primeiro clique
      }
    }


    const { newBoard, mineClicked, allNonMinesRevealed } = revealCellLogic(boardData, row, col);
    setBoardData(newBoard);

    if (mineClicked) {
      setGameOver(true);
      setTimerActive(false);
      Alert.alert("Fim de Jogo!", "Você acertou uma mina! 💣", [{ text: "Tentar Novamente", onPress: resetGame }]);
    } else if (allNonMinesRevealed) {
      setGameWon(true);
      setTimerActive(false);
      Alert.alert("Parabéns!", "Você encontrou todas as minas! 🎉", [{ text: "Jogar Novamente", onPress: resetGame }]);
    }
  };

  const handleCellLongPress = (row, col) => {
    if (gameOver || gameWon || boardData[row][col].isRevealed) return;

    if (!firstMoveMade) { // Iniciar timer também no clique longo se for a primeira ação
        setTimerActive(true);
        setFirstMoveMade(true);
    }

    const { newBoard, flagChange } = placeFlagLogic(boardData, row, col); // Supondo que placeFlagLogic retorne a mudança
    setBoardData(newBoard);
    if (flagChange !== 0) { // flagChange pode ser 1 (adicionou) ou -1 (removeu)
        setFlagsPlaced(prevFlags => prevFlags + flagChange);
    }
  };

  // Para o emoji no Header
  let gameStatus = 'playing';
  if (gameWon) gameStatus = 'won';
  if (gameOver) gameStatus = 'lost';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          minesLeft={minesLeft < 0 ? 0 : minesLeft} // Evitar minas negativas se o usuário marcar mais que o total
          time={time}
          onResetPress={resetGame}
          gameStatus={gameStatus}
        />
        <Board
          boardData={boardData}
          onCellPress={handleCellPress}
          onCellLongPress={handleCellLongPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center', // Removido para o header ficar no topo
    paddingTop: 20, // Um pouco de espaço no topo
  },
  // Estilos do App.js não são mais necessários para title, pois ele foi movido para o Header
});

export default App;