import { icons } from 'ui/icons'
import './table_pagination.css'

type TablePaginationProps = React.ComponentProps<'section'> & {
  page: number
  pageCount: number
  totalItems: number
  onPreviousPage: () => void
  onNextPage: () => void
  canPreviousPage: boolean
  canNextPage: boolean
}

export function TablePagination({
  className,
  page,
  pageCount,
  totalItems,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
  ...props
}: TablePaginationProps) {
  return (
    <section className="table__pagination" {...props}>
      <div className="table__pagination__info">
        <span>
          Page <span className="table__pagination__info__page">{page}</span> of{' '}
          <span className="table__pagination__info__count">{pageCount}</span>
        </span>
        <span>
          {' - '}
          <span className="table__pagination__info__total">{totalItems} </span>
          item(s) in total
        </span>
      </div>
      <div className="table__pagination__buttons">
        <button
          className="table__pagination__button"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          {icons.prev}
        </button>
        <button
          className="table__pagination__button"
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          {icons.next}
        </button>
      </div>
    </section>
  )
}
