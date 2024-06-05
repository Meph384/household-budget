using System.Security.Claims;
using BudgetAPI.DTOs;
using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TransactionController : ControllerBase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ICurrencyRepository _currencyRepository;
    public TransactionController(ITransactionRepository transactionRepository, ICurrencyRepository currencyRepository, ICategoryRepository categoryRepository)
    {
        _transactionRepository = transactionRepository;
        _categoryRepository = categoryRepository;
        _currencyRepository = currencyRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAllTransactions(string userId, DateTime? startDate, DateTime? endDate)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User ID is required.");
        }

        List<TransactionDto> transactions = await _transactionRepository.GetAllTransactionsAsync(userId, startDate, endDate);
        return Ok(transactions);
    }

    [HttpPost("AddTransaction")]
    public async Task<ActionResult<Transaction>> AddTransaction([FromBody] CreateTransactionDto transactionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        int? categoryId = await _categoryRepository.GetCategoryIdByTitleAsync(transactionDto.CategoryTitle);
        if (categoryId is null)
        {
            return BadRequest("Invalid category title.");
        }

        int? currencyId = await _currencyRepository.GetCurrencyIdByCodeAsync(transactionDto.CurrencyCode);
        if (currencyId is null)
        {
            return BadRequest("Invalid currency code.");
        }
        
        string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }
        
        Transaction transaction = new Transaction
        {
            CategoryId = categoryId.Value,
            CurrencyId = currencyId.Value,
            Description = transactionDto.Description,
            Amount = transactionDto.Amount,
            Date = transactionDto.Date,
            UserId = int.Parse(userId)
        };

        await _transactionRepository.AddTransactionAsync(transaction);
        return Ok(true);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(int id)
    {
        bool result = await _transactionRepository.DeleteTransactionAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTransaction(int id, [FromBody] UpdateTransactionDto transactionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        int? category = await _categoryRepository.GetCategoryIdByTitleAsync(transactionDto.CategoryTitle);
        if (category is null)
        {
            return BadRequest(new { message = "Invalid Category or Currency" });
        }
        int? currency = await _currencyRepository.GetCurrencyIdByCodeAsync(transactionDto.CurrencyCode);
        if (currency is null)
        {
            return BadRequest(new { message = "Invalid Category or Currency" });
        }   

        Transaction? existingTransaction = await _transactionRepository.GetTransactionByIdAsync(id);
        if (existingTransaction == null)
        {
            return NotFound();
        }

        existingTransaction.CategoryId = category.Value;
        existingTransaction.Description = transactionDto.Description;
        existingTransaction.Amount = transactionDto.Amount;
        existingTransaction.Date = transactionDto.Date;
        existingTransaction.CurrencyId = currency.Value;

        await _transactionRepository.UpdateTransactionAsync(existingTransaction);
        return Ok(true);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> GetTransaction(int id)
    {
        Transaction? transaction = await _transactionRepository.GetTransactionByIdAsync(id);

        if (transaction is not null)
        {
            return transaction;
        }

        return NotFound();
    }

    [HttpGet("GetSpendingsByCategory")]
    public async Task<IActionResult> GetSpendingsByCategory()
    {
        var result = await _transactionRepository.GetSpendingsByCategoryForCurrentYearAsync();
        return Ok(result);
    }

    [HttpGet("GetCategoriesGroupedByMonth")]
    public async Task<IActionResult> GetCategoriesGroupedByMonth()
    {
        var result = await _transactionRepository.GetCategoriesGroupedByMonthAsync();
        return Ok(result);
    }

    [HttpGet("GetCategoriesGroupedByDay")]
    public async Task<IActionResult> GetCategoriesGroupedByDay()
    {
        var result = await _transactionRepository.GetCategoriesGroupedByDayForLast14DaysAsync();
        return Ok(result);
    }
    
    [HttpGet("Seed")]
    public async Task<bool> SeedTransactions()
    {
        await _transactionRepository.SeedTransactionsAsync();
        return true;
    }
}