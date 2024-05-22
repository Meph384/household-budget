using System.ComponentModel.DataAnnotations;

namespace BudgetAPI.DTOs
{
    public class CreateTransactionDTO
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Description { get; set; }

        public double Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;
    }
}