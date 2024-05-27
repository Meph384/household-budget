using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetAPI.Models
{
    public class Currency
    {
        [Key]
        public int CurrencyId { get; set; }
        [Column(TypeName = "nvarchar(3)")]
        public string Code { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
    }
}