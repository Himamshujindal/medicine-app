using Microsoft.AspNetCore.Mvc;
using ClientABCPharmacy.Models;
using System.Text.Json;

namespace ClientABCPharmacy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : ControllerBase
    {
        private readonly string medicinesFile = Path.Combine("Data", "medicines.json");
        private readonly string salesFile = Path.Combine("Data", "sales.json");

        // GET: api/medicines
        [HttpGet]
        public IActionResult GetAll()
        {
            if (!System.IO.File.Exists(medicinesFile))
                return Ok(new List<Medicine>());

            var json = System.IO.File.ReadAllText(medicinesFile);
            var medicines = JsonSerializer.Deserialize<List<Medicine>>(json) ?? new List<Medicine>();

            // Exclude Notes from response
            var result = medicines.Select(m => new
            {
                m.Id,
                m.Name,
                m.ExpiryDate,
                m.Quantity,
                m.Price,
                m.Brand
            });

            return Ok(result);
        }

        // POST: api/medicines
        [HttpPost]
        public IActionResult Add([FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var medicines = new List<Medicine>();
            if (System.IO.File.Exists(medicinesFile))
            {
                var json = System.IO.File.ReadAllText(medicinesFile);
                medicines = JsonSerializer.Deserialize<List<Medicine>>(json) ?? new List<Medicine>();
            }

            medicine.Id = medicines.Count > 0 ? medicines.Max(m => m.Id) + 1 : 1;
            medicines.Add(medicine);

            System.IO.File.WriteAllText(medicinesFile, JsonSerializer.Serialize(medicines, new JsonSerializerOptions { WriteIndented = true }));

            return Ok(medicine);
        }

        // PUT: api/medicines/sale/{id}
        [HttpPut("sale/{id}")]
        public IActionResult RecordSale(int id, [FromBody] int quantitySold)
        {
            if (!System.IO.File.Exists(medicinesFile))
                return NotFound("No medicines found.");

            var json = System.IO.File.ReadAllText(medicinesFile);
            var medicines = JsonSerializer.Deserialize<List<Medicine>>(json) ?? new List<Medicine>();

            var medicine = medicines.FirstOrDefault(m => m.Id == id);
            if (medicine == null)
                return NotFound("Medicine not found.");

            if (medicine.Quantity < quantitySold)
                return BadRequest("Not enough stock.");

            medicine.Quantity -= quantitySold;

            // Update medicines.json
            System.IO.File.WriteAllText(medicinesFile, JsonSerializer.Serialize(medicines, new JsonSerializerOptions { WriteIndented = true }));

            // Log sale in sales.json
            var sales = new List<object>();
            if (System.IO.File.Exists(salesFile))
            {
                var salesJson = System.IO.File.ReadAllText(salesFile);
                sales = JsonSerializer.Deserialize<List<object>>(salesJson) ?? new List<object>();
            }

            sales.Add(new
            {
                MedicineName = medicine.Name,
                QuantitySold = quantitySold,
                SaleDate = DateTime.Now,
                TotalPrice = medicine.Price * quantitySold
            });

            System.IO.File.WriteAllText(salesFile, JsonSerializer.Serialize(sales, new JsonSerializerOptions { WriteIndented = true }));

            return Ok(new { message = "Sale recorded successfully." });
        }
    }
}
