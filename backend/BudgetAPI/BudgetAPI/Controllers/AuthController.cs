using BudgetAPI.DTOs;
using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using BudgetAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserRepository _userRepository;
    
    public AuthController(IAuthService authService, IUserRepository userRepository)
    {
        _authService = authService;
        _userRepository = userRepository;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDto userDto)
    {
        var token = await _authService.Register(userDto);
        return Ok(new { Token = token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserDto userDto)
    {
        string token = await _authService.Login(userDto);
        User user = (await _userRepository.GetUserByUsername(userDto.Username))!;
        return Ok(new { Token = token, userId = user.UserId });
    }
}
