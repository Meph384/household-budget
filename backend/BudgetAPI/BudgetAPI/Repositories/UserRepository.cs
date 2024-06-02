using BudgetAPI.Interfaces;
using BudgetAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BudgetAPI.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByUsername(string username)
    {
        return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
    }

    public async Task AddUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserBalance(int userId, double amount)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user != null)
        {
            user.Balance += amount;
            await _context.SaveChangesAsync();
        }
    }
}

