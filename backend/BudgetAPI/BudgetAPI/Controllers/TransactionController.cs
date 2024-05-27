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
    public async Task<ActionResult<TransactionDto>> GetAllTransactions()
    {
        return Ok(await _transactionRepository.GetAllTransactionsAsync());
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> AddTransaction([FromBody] CreateTransactionDto transactionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var categoryId = await _categoryRepository.GetCategoryIdByTitleAsync(transactionDto.CategoryTitle);
        if (categoryId == null)
        {
            return BadRequest("Invalid category title.");
        }

        var currencyId = await _currencyRepository.GetCurrencyIdByCodeAsync(transactionDto.CurrencyCode);
        if (currencyId == null)
        {
            return BadRequest("Invalid currency code.");
        }

        var transaction = new Transaction
        {
            CategoryId = categoryId.Value,
            CurrencyId = currencyId.Value,
            Description = transactionDto.Description,
            Amount = transactionDto.Amount,
            Date = transactionDto.Date
        };

        var createdTransaction = await _transactionRepository.AddTransactionAsync(transaction);
        return CreatedAtAction(nameof(GetAllTransactions), new { id = createdTransaction.TransactionId }, createdTransaction);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> GetTransaction(int id)
    {
        var transaction = await _transactionRepository.GetTransactionByIdAsync(id);

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