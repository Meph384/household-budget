using BudgetAPI.DTOs;
using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BudgetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
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
    public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAllTransactions(DateTime? startDate, DateTime? endDate)
    {
        List<TransactionDto> transactions = await _transactionRepository.GetAllTransactionsAsync(startDate, endDate);
        return Ok(transactions);
    }

    [HttpPost]
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

        Transaction transaction = new Transaction
        {
            CategoryId = categoryId.Value,
            CurrencyId = currencyId.Value,
            Description = transactionDto.Description,
            Amount = transactionDto.Amount,
            Date = transactionDto.Date
        };

        Transaction createdTransaction = await _transactionRepository.AddTransactionAsync(transaction);
        return CreatedAtAction(nameof(GetAllTransactions), new { id = createdTransaction.TransactionId }, createdTransaction);
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

        Transaction updatedTransaction = await _transactionRepository.UpdateTransactionAsync(existingTransaction);
        return Ok(updatedTransaction);
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

    [HttpGet("Seed")]
    public async Task<bool> SeedTransactions()
    {
        await _transactionRepository.SeedTransactionsAsync();
        return true;
    }
}