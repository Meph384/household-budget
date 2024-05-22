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

    public TransactionController(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    [HttpGet]
    public async Task<ActionResult> GetAllTransactions()
    {
        return Ok(await _transactionRepository.GetAllTransactionsAsync());
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> AddTransaction([FromBody] CreateTransactionDTO transactionDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var transaction = new Transaction
        {
            CategoryId = transactionDto.CategoryId,
            Description = transactionDto.Description,
            Amount = transactionDto.Amount,
            Date = transactionDto.Date
        };

        
        var createdTransaction = await _transactionRepository.AddTransactionAsync(transaction);
        return CreatedAtAction(nameof(GetTransaction), new { id = createdTransaction.TransactionId },
            createdTransaction);
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