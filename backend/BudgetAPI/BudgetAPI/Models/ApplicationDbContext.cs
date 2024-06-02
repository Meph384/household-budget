using Microsoft.EntityFrameworkCore;

namespace BudgetAPI.Models;

public class ApplicationDbContext : DbContext
{
    public DbSet<User?> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.User)
            .WithMany(u => u.Transactions)
            .HasForeignKey(t => t.UserId);
    }
}