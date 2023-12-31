interface TableProps {
    head: string[];
    body: any;
    elementTypes: any;
    handelButtonDelete: any;
    handelButtonUpdate: any;
}

const AdminTable = (props: TableProps) => {
    return (
        <table className="table">
            {/* Create table header content*/}
            <thead>
                <tr className="table-head-row">
                    {props.head
                        .slice(0)
                        .map((element: string, index: number) => {
                            return (
                                <th className="table-th" key={index}>
                                    {element}
                                </th>
                            );
                        })}
                </tr>
            </thead>

            {/* Create table body content */}
            <tbody>
                {props.body.map((element: any, index: number) => {
                    return (
                        <tr className="table-body-row" key={index}>
                            {props.elementTypes
                                .slice(0)
                                .map((type: any, index: number) => {
                                    return (
                                        <td
                                            className="table-body-td"
                                            key={index}
                                        >
                                            {element[type]}
                                        </td>
                                    );
                                })}
                            {/* Create buttons */}
                            <td>
                                <button
                                    className="table-row-delete"
                                    onClick={() => {
                                        // console.log("element: ")
                                        props.handelButtonDelete(
                                            index,
                                            element._id
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    className="table-row-update"
                                    onClick={() => {
                                        props.handelButtonUpdate(
                                            element,
                                            element._id,
                                            index
                                        );
                                    }}
                                >
                                    {" "}
                                    Edit
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default AdminTable;
