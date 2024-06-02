using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BudgetAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Username { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string PasswordHash { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public double Balance { get; set; }
    }
}