using BudgetAPI.DTOs;

namespace BudgetAPI.Interfaces;

public interface IAuthService
{
    Task<string> Register(UserDto userDto);
    Task<string> Login(UserDto userDto);
}