import { Cell } from './Cell';

interface Props {
  row: (number | undefined | null)[];
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
