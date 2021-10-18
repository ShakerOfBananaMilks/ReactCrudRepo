import React, { useState, useEffect } from 'react';

export function ShowData() {

    const [warehouseRows, setWarehouseRows] = useState(
        [{
            id: 0,
            name: "",
            managerID: 0,
            availableSlots: 0,
            totalSlots: 0
        }]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                let data = await fetch('warehouse');
                const myJson = await data.json();
                setWarehouseRows(myJson);
            }
            catch (e) { setError(e); }
            finally { setLoading(false); }
        }
        load();
    }, []);

    const handleNameChange = (e) => {
        let index = 0;
        let newArr = warehouseRows;
        let newWarehouseRow = {
            id: newArr[index].id,
            name: e.target.value,
            managerID: newArr[index].managerID,
            availableSlots: newArr[index].availableSlots,
            totalSlots: newArr[index].totalSlots
        };

        newArr[index] = newWarehouseRow;
        setWarehouseRows(newArr);
    }
    useEffect(() => {
        console.log("useeffect");
    }, [warehouseRows]);

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'managerID', 'availableSlots', 'totalSlots']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return warehouseRows && warehouseRows.map(({ id, name, managerID, availableSlots, totalSlots }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td><input type="Text" value={name} onChange={handleNameChange} /></td>
                    <td>{managerID}</td>
                    <td>{availableSlots}</td>
                    <td>{totalSlots}</td>
                </tr>
            )
        })
    }

    const renderTable = () => {
            
        return (
            <form>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>ManagerID</th>
                        <th>AvailableSlots</th>
                        <th>TotalSlots</th>
                    </tr>
                </thead>
                <tbody>
        {
                            warehouseRows.map(warehouse =>
                <tr key={warehouse.id}>
                    <td><input type="Text" readOnly value={warehouse.id} /></td>
                                    <td><input type="Text" value={warehouse.name} onChange={handleNameChange} /></td>
                    {/* <td><input type="Text" value={warehouse.managerID} /></td>
                   <td><input type="Text" value={warehouse.availableSlots} /></td>
                    <td><input type="Text" value={warehouse.totalSlots} /></td>*/}
                </tr>
            )
        }
            </tbody >
                </table>
                <input type="submit" value="Submit" />
                </form>
        );
    }

    let contents = loading
        ? <p><em>Loading...</em></p>
        : renderTable();

    return (
        <div>
            <h1 id="tabelLabel" >Warehouse</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <h1 id='title'>React Table</h1>
            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </div>

    )
}