using System;
using System.Collections.Generic;

namespace BudgetAPI;

public partial class User
{
    public int UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdateAt { get; set; }

    public string Email { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public virtual ICollection<Budget> Budgets { get; set; } = new List<Budget>();
}
