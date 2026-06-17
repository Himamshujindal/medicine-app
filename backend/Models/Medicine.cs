using System.ComponentModel.DataAnnotations;

namespace ClientABCPharmacy.Models
{
    public class Medicine
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public string? Notes { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Brand { get; set; }
    }
}