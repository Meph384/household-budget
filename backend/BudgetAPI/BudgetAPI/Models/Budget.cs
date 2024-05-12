using System;
using System.Collections.Generic;

namespace BudgetAPI;

public partial class Budget
{
    public int BudgetId { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<FinancialTransaction> FinancialTransactions { get; set; } = new List<FinancialTransaction>();

    public virtual User User { get; set; } = null!;
}
