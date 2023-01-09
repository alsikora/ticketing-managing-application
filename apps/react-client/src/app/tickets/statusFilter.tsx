export interface StatusFilterProps {
  showAll: () => void;
  showIncomplete: () => void;
  showComplete: () => void;
}

export function StatusFilter(props: StatusFilterProps) {
  return (
      <span className="isolate inline-flex rounded-md shadow-sm items-center">
        Show tickets:
      <button
          onClick={props.showAll}
          type="button"
          className="ml-4 relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        All
      </button>
      <button
          onClick={props.showIncomplete}
          type="button"
          className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Incomplete
      </button>
      <button
          onClick={props.showComplete}
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        Complete
      </button>
    </span>
  )
}

export default StatusFilter;