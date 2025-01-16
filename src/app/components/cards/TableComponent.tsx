import { tableStyle } from "../../data/constants";
import TableFilterComponent from "./TableFilterComponent";

export default function TableComponent({
    title,
    tableProps,
    generateAction,
}:Readonly<{
    title: string, 
    tableProps: tableProps, 
    generateAction: (data:{[key:string]:any}, rowIndex:number) => void,
}>){
    const fetchHead = () => {
        let head:string[] = [];
        if(tableProps.head && tableProps.head?.length > 0) {
            head = tableProps.head
        }else if(tableProps.data && tableProps.data.length > 0){
            head = Object.keys(tableProps.data[0]);
        }

        if(tableProps.hasAction){
            head.push('action');
        }

        if(head){
            return head.map((items, index) => {
                if(!tableProps.columnToHide?.includes(items)){
                    return (
                        <th key={`head-${index}`} className={tableStyle.rowHeader}>{items}</th>
                    );
                }
            })
        }
    }

    const fetchData = (data:{[key:string]:any}, rowIndex:number) => {
        let td:any[] = [];
        if(data){
            td.push(Object.keys(data).map((items, idx) => {
                if(!tableProps.columnToHide?.includes(items)){
                    return (
                        <td key={`tdata${idx}`} className="px-6 py-3">
                            {data[items]}
                        </td>
                    );
                }
            }));

            if(tableProps.hasAction){
                td.push(generateAction(data, rowIndex));
            }
        }
        return td;
    }

    return (
        <div className="card h-full">
            <div className="card-header">
                <h4 className="card-title font-medium">{title}</h4>
            </div>
            <div className="card-body p-4">
                <div id="dataTable-filter" className="block relative mb-5">
                    <TableFilterComponent filterProps={tableProps.filter}/>
                </div>
                <div className="relative sm:rounded">
                    <div className="no-footer sortable searchable fixed-columns">
                        <div className="">
                            <table className={tableStyle.table} id={tableProps?.props?.id || 'main-table'}>
                                <thead className={tableStyle.header}>
                                    <tr key={`thead`}>{fetchHead()}</tr>
                                </thead>
                                <tbody className={tableStyle.body}>
                                    {tableProps?.data && tableProps.data.map((rows, rowIndex) => {
                                        return <tr key={`row-${rowIndex}`} className={tableStyle.rowBody}>{fetchData(rows, rowIndex)}</tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}