import { useNavigate } from '@tanstack/react-router'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import routePaths from 'app/routes/routePaths'
import { useGetPatients } from 'application/getPatients'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/components/avatar'
import { Input } from 'ui/components/form/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from 'ui/components/table'
import { icons } from 'ui/icons'

import type { Patient } from 'domain/users'

export default function PatientsList() {
  const navigate = useNavigate()
  const { data: patients, error } = useGetPatients()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: 'photo',
      header: '',
      enableHiding: true,
      cell: ({ row }) => {
        return (
          <Avatar className="avatar--primary">
            {(row.getValue('photo') as Patient['photo']) && (
              <AvatarImage src={row.getValue('photo')} />
            )}
            <AvatarFallback>
              {(row.getValue('name') as string)[0]}
              {(row.getValue('surname') as string)[0]}
            </AvatarFallback>
          </Avatar>
        )
      },
    },
    {
      accessorKey: 'name',
      enableHiding: true,
      header: ({ column }) => {
        return (
          <button
            className="table__head--center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            {column.getIsSorted() === 'asc'
              ? icons.sortAscAlpha
              : icons.sortDescAlpha}
          </button>
        )
      },
    },
    {
      accessorKey: 'surname',
      enableHiding: true,
      header: ({ column }) => {
        return (
          <button
            className="table__head--center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Surname
            {column.getIsSorted() === 'asc'
              ? icons.sortAscAlpha
              : icons.sortDescAlpha}
          </button>
        )
      },
    },

    {
      id: 'fullName',
      accessorFn: row => `${row.name} ${row.surname}`,
      filterFn: (row, _columnId, filterValue: string) => {
        const fullName =
          `${row.original.name} ${row.original.surname}`.toLowerCase()
        return fullName.includes(filterValue.toLowerCase())
      },
      header: ({ column }) => {
        return (
          <button
            className="table__head--center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Full name
            {column.getIsSorted() === 'asc'
              ? icons.sortAscAlpha
              : icons.sortDescAlpha}
          </button>
        )
      },
    },
    {
      accessorKey: 'age',
      enableHiding: true,
      header: ({ column }) => {
        return (
          <button
            className="table__head--center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Age (yo)
            {column.getIsSorted() === 'asc'
              ? icons.sortAscNumber
              : icons.sortDescNumber}
          </button>
        )
      },
    },
    {
      accessorKey: 'main-condition',
      enableHiding: true,
      header: ({ column }) => {
        return (
          <button
            className="table__head--center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            1st Condition
            {column.getIsSorted() === 'asc'
              ? icons.sortAscAlpha
              : icons.sortDescAlpha}
          </button>
        )
      },
      accessorFn: row => {
        return row.medicalData.diagnoses[0].name
      },
    },
    {
      accessorKey: 'weight',
      enableHiding: true,
      header: ({ column }) => {
        return (
          <button
            className="table__head--center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Weight (kg)
            {column.getIsSorted() === 'asc'
              ? icons.sortAscNumber
              : icons.sortDescNumber}
          </button>
        )
      },
    },
    {
      accessorKey: 'phone',
      enableHiding: true,
      header: () => {
        return <span className="table__head--span--center">Phone</span>
      },
    },
  ]

  const table = useReactTable({
    data: patients || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        name: false,
        surname: false,
      },
    },
  })

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <Input
        type="text"
        value={(table.getColumn('fullName')?.getFilterValue() as string) ?? ''}
        onChange={e =>
          table.getColumn('fullName')?.setFilterValue(e.target.value)
        }
        placeholder="Search by name or surname"
        className="table__input--search"
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                className="table__row--selectable"
                onClick={() =>
                  navigate({
                    to: routePaths.patient,
                    params: { patientId: row.original.id },
                  })
                }
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="table__cell--centered">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="table__cell--centered"
                colSpan={columns.length}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {patients && (
        <TablePagination
          page={table.getState().pagination.pageIndex + 1}
          pageCount={table.getPageCount()}
          totalItems={table.getRowCount()}
          onPreviousPage={() => table.previousPage()}
          onNextPage={() => table.nextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
        />
      )}
    </>
  )
}
