using System;
using System.Collections.Generic;

namespace BudgetAPI;

public partial class FinancialTransaction
{
    public int TransactionId { get; set; }

    public int BudgetId { get; set; }

    public int CategoryId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int Amount { get; set; }

    public string? Description { get; set; }

    public virtual Budget Budget { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;
}
