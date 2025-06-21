import { Table, TableBody } from 'ui/components/table'
import './table-skeleton.css'

type TableSkeletonProps = {
  rows?: number
  columns?: number
}

export function TableSkeleton({ rows = 5, columns = 5 }: TableSkeletonProps) {
  return (
    <Table className="table__skeleton">
      <TableBody>
        {[...Array(rows)].map((_, i) => (
          <tr key={`row-${i}`} className="table__skeleton__row">
            {[...Array(columns)].map((_, j) => (
              <td key={`cell-${j}`} className="table__skeleton__cell">
                <div className="table__skeleton__cell__content"></div>
              </td>
            ))}
          </tr>
        ))}
      </TableBody>
    </Table>
  )
}
