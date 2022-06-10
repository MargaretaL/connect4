import { Cell, CellProps } from './Cell';

interface Props {
  row: CellProps[];
  play: (column: number) => void;
}

export const Row = ({ row, play }: Props) => {
  return (
    <tr>
      {row.map((cell, i: number) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  );
};
