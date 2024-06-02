using BudgetAPI.Models;

namespace BudgetAPI.Interfaces;

public interface IUserRepository
{
    Task<User?> GetUserByUsername(string username);
    Task AddUser(User? user);
}