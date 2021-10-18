using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;


namespace ReactCrud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WarehouseController : ControllerBase
    {
        private readonly ILogger<WarehouseController> _logger;

        public WarehouseController(ILogger<WarehouseController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Warehouse> Get()
        {
            List<Warehouse> returnList = new List<Warehouse>();
            using (SqlConnection connection = new SqlConnection(@"Data Source=DESKTOP-9JQQ8TT\SQLEXPRESS;Initial Catalog=StockTake;Integrated Security=SSPI"))
            {
                SqlCommand command = new SqlCommand("select * from Warehouse", connection);
                command.Connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Warehouse wh = new Warehouse();
                    var x = reader;
                    wh.ID = reader.GetInt32(0);
                    wh.Name = reader.GetString(1);
                    wh.ManagerID = reader.GetInt32(2);
                    wh.AvailableSlots = reader.GetInt32(3);
                    wh.TotalSlots = reader.GetInt32(4);
                    returnList.Add(wh);
                }
            }

            return returnList;
        }
    }
}
