import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { warehouses: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(warehouses) {
    return (
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
            {warehouses.map(warehouse =>
              <tr key={warehouse.id}>
                <td>{warehouse.id}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.managerID}</td>
                <td>{warehouse.availableSlots}</td>
                <td>{warehouse.totalSlots}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.warehouses);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('warehouse'); // this can be warehouse because warehousecontroller exsist. why?
    const data = await response.json();
    this.setState({ warehouses: data, loading: false });
  }
}
