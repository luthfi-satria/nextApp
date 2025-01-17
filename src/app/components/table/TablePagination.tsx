'use client'
import { useEffect, useMemo, useState } from "react";
import { paginationStyle } from "../../data/constants";

export default function TablePagination({
    tableProps,
    data,
}:Readonly<{
    tableProps: tableProps,
    data: APIdataResponse
}>){
    const limit = data.limit;
    const [page, setPage] = useState<number>(data.page);
    const pageNum = useMemo(() => data.totalPage, [data]);
    const pageList = useMemo(() => {
        const result:Array<number|undefined>= [];
        if (pageNum === 0) return result
        const normalizedPage = Math.min(pageNum, Math.max(0, page))
        if (pageNum < 8)
          for (let i = 1; i <= pageNum; i++) {
            result.push(i)
          }
        else {
          if (normalizedPage > 4) result.push(1, undefined, Math.min(normalizedPage, pageNum - 3) - 1)
          else result.push(1, 2, 3, 4)
          if (normalizedPage + 3 < pageNum) {
            if (normalizedPage > 4) result.push(normalizedPage)
            result.push(Math.max(normalizedPage, 4) + 1, undefined, pageNum)
          } else result.push(pageNum - 3, pageNum - 2, pageNum - 1, pageNum)
        }
        return result;
    }, [pageNum, page]);

    useEffect(() => {
        handlePageChange(page);
    },[page]);

    const handlePageChange = (page:number) => {
        if(typeof tableProps.filter.paginationEvent != undefined){
            tableProps?.filter?.paginationEvent?.(page);
        }
    };
    
    return (
        <div className="pagination-wrapper min-h-10">
            <div className='block relative sm:flex sm:flex-1 clear-both h-16'>
                <nav className="absolute right-2 bottom-5 isolate inline-flex rounded-md shadow-sm" aria-label="Pagination">
                    <button 
                        disabled={page == 1 ? true: false}
                        onClick={() => setPage(1)}
                        className={page === 1 ? paginationStyle.notAllowedButton : paginationStyle.button}
                        >
                            <span className="sr-only">First</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>

                    </button>
                    <button 
                        disabled={page == 1 ? true: false}
                        onClick={() => setPage(page - 1)}
                        className={page === 1 ? paginationStyle.notAllowedButton : paginationStyle.button}
                    >
                        <span className="sr-only">Previous</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>

                    </button>
                    {/* pageNumber */}
                    {pageList.map((x, i) =>
                        x === undefined ? (
                        <button 
                            disabled={true} 
                            className={paginationStyle.button}
                            key={`${i}-dot`}
                        >
                            ...
                        </button>
                        ) : (
                            <button key={x} 
                                onClick={() => setPage(x)}
                                disabled={page === x ? true : false}
                                className={page === x ? paginationStyle.activeButton: paginationStyle.button}
                            >
                                {x}
                            </button>
                        )
                    )}
                    {/* endPageNumber */}
                    <button 
                        disabled={page === pageNum ? true : false}
                        onClick={()=> setPage(page + 1)}
                        className={page === pageNum ? paginationStyle.notAllowedButton : paginationStyle.button}
                    >
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <button 
                        disabled={page === pageNum ? true : false}
                        onClick={()=> setPage(pageNum)}
                        className={page === pageNum ? paginationStyle.notAllowedButton : paginationStyle.button}
                    >
                        <span className="sr-only">Last</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </nav>
                <div className=''>
                    <p className='text-sm p-6 text-gray-600'>
                        Displaying 
                        <span className='px-[4px] font-bold'>
                            {(page - 1) * limit + 1}
                        </span>
                        ~
                        <span className='px-[4px] font-bold'>
                            {Math.min(data.total, (page) * limit + 1)}{' '}
                        </span>
                        from
                        <span className='px-[4px] font-bold'>{data.total}</span>
                        data
                    </p>
                </div>
            </div>
        </div>
    );
}