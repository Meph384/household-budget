using BudgetAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FinanceController : ControllerBase
{
    private readonly IFinanceRepository _financeRepository;

    public FinanceController(IFinanceRepository financeRepository)
    {
        _financeRepository = financeRepository;
    }

    [HttpGet("GetRecords")]
    public async Task<IActionResult> GetFinanceRecords()
    {
        var x = await _financeRepository.GetFinanceRecords();

        return Ok(x);
    }

    [HttpPost("CreateRecord")]
    public async Task<IActionResult> CreateFinanceRecord([FromBody] FinancialTransaction transaction)
    {
        var financialTransaction = await _financeRepository.CreateTransaction(transaction);

        return Ok(financialTransaction);
    }

    [HttpPut("EditRecord")]
    public async Task<IActionResult> EditFinanceRecord([FromBody] FinancialTransaction transaction)
    {
        var editedTransaction = await _financeRepository.EditTransaction(transaction);

        return Ok(editedTransaction);
    }

    [HttpDelete("DeleteRecord")]
    public async Task<IActionResult> DeleteRecord(int id)
    {
        var transaction = await _financeRepository.DeleteTransacrtion(id);
        return Ok(transaction);
    }
}