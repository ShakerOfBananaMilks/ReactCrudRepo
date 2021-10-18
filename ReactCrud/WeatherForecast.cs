using System;

namespace ReactCrud
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }

    public class Warehouse
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int ManagerID { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; }
    }
}
