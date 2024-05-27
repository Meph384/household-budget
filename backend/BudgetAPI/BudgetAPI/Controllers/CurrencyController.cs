using BudgetAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CurrencyController : ControllerBase
{
    private readonly ICurrencyRepository _currencyRepository;

    public CurrencyController(ICurrencyRepository currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    [HttpGet]
    public async Task<ActionResult> GetAllCategories()
    {
        return Ok(await _currencyRepository.GetCurrencies());
    }
    
    [HttpGet("Seed")]
    public async Task<bool> SeedCategories()
    {
        await _currencyRepository.SeedCurrenciesAsync();
        return true;
    }
}