import styled from '@emotion/styled';

export interface CellProps {
  value: any;
  play: (column: number) => void;
  columnIndex: number;
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  background-color: #1990ff;
  cursor: pointer;
`;

const FlexCell = styled.div<{
  color?: string;
}>`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const Cell = ({ value, columnIndex, play }: CellProps) => {
  return (
    <td>
      <Flex
        onClick={() => {
          play(columnIndex);
        }}
      >
        <FlexCell
          color={value === 1 ? 'red' : value === 2 ? 'yellow' : 'white'}
        ></FlexCell>
      </Flex>
    </td>
  );
};
