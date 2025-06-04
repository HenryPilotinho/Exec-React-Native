import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Cell = ({ data, onPress, onLongPress }) => {
  const { isRevealed, isMine, isFlagged, adjacentMines } = data;

  let content = '';
  let cellStyle = [styles.cell];

  if (isRevealed) {
    cellStyle.push(styles.revealedCell);
    if (isMine) {
      content = '💣'; // Emoji de bomba
    } else if (adjacentMines > 0) {
      content = adjacentMines.toString();
    }
  } else if (isFlagged) {
    content = '🚩'; // Emoji de bandeira
    cellStyle.push(styles.flaggedCell);
  } else {
    cellStyle.push(styles.hiddenCell);
  }

  // Cores para os números de minas adjacentes (opcional)
  const getNumberColor = (number) => {
    if (number === 1) return '#0000FF'; // Azul
    if (number === 2) return '#008000'; // Verde
    if (number === 3) return '#FF0000'; // Vermelho
    // ... e assim por diante
    return '#000000'; // Preto padrão
  };

  const textColor = isRevealed && !isMine && adjacentMines > 0 ? getNumberColor(adjacentMines) : '#000';

  return (
    <TouchableOpacity
      style={cellStyle} // Estilos da célula
      onPress={onPress} // Ação para clique curto (revelar)
      onLongPress={onLongPress} // Ação para clique longo (marcar bandeira)
      activeOpacity={0.7} // Controla a opacidade ao ser pressionado (padrão é 0.2)
      disabled={isRevealed && !isMine} // Desabilita o toque se já revelada (e não é uma mina explodida)
    >
      <Text style={[styles.cellText, { color: textColor }]}>{content}</Text>
    </TouchableOpacity>
  );
};

const cellSize = 30; // Tamanho da célula

const styles = StyleSheet.create({
  cell: {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenCell: {
    backgroundColor: '#bbb',
  },
  revealedCell: {
    backgroundColor: '#ddd',
  },
  flaggedCell: {
    backgroundColor: '#yellow', // Apenas para diferenciar
  },
  cellText: {
    fontSize: cellSize * 0.5, // Ajustar tamanho da fonte em relação à célula
    fontWeight: 'bold',
  },
});

export default Cell;