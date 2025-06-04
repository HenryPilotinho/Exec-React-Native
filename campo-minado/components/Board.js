import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const Board = ({ boardData, onCellPress, onCellLongPress }) => {
  return (
    <View style={styles.board}>
      {boardData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {rowData.map((cellData, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              data={cellData}
              onPress={() => onCellPress(rowIndex, colIndex)}
              onLongPress={() => onCellLongPress(rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderWidth: 1,
    borderColor: '#999',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Board;