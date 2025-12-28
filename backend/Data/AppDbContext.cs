using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<LeaderboardRow> Leaderboard => Set<LeaderboardRow>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LeaderboardRow>(e =>
        {
            e.ToTable("Leaderboard");
            e.HasKey(x => x.Id);

            e.Property(x => x.Season).IsRequired();
            e.Property(x => x.Username).IsRequired();
            e.Property(x => x.DisplayName).IsRequired();

            // para evitar "numeric" con cualquier cosa rara
            e.Property(x => x.Prize).HasColumnType("numeric(18,2)");
            e.Property(x => x.Bet).HasColumnType("numeric(18,2)");

            // importante: que no te dupliquen mismo usuario en misma season
            e.HasIndex(x => new { x.Season, x.Username }).IsUnique();
        });
    }
}
