import React from 'react';

import { Column } from 'typings/entities/column';
import { IProduct } from 'typings/entities/products';
import { TableBody } from './components/TableBody';
import { TableCell } from './components/TableCell';
import { TableHead } from './components/TableHead';
import { TableRow } from './components/TableRow';
import { Table, TableWrapper } from './styled';

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
};

const TableList = <T extends IProduct>({
  rows,
  columns,
}: Props<T>): React.ReactElement => {
  return (
    <TableWrapper>
      <Table>
        <TableHead>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              style={{
                minWidth: column.minWidth,
                flex: column.flex,
                justifyContent: column.align,
              }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row: T) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={`${column.id}-${row.id}`}
                  style={{
                    minWidth: column.minWidth,
                    flex: column.flex,
                    justifyContent: column.align,
                  }}
                >
                  {column.renderCell
                    ? column.renderCell(row)
                    : String(row[column.id as keyof IProduct])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default TableList;
