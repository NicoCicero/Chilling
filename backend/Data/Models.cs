namespace Backend.Data;

public class LeaderboardRow
{
    public int Id { get; set; }

    public string Season { get; set; } = null!;

    public string Username { get; set; } = null!;
    public string DisplayName { get; set; } = null!;

    public decimal Prize { get; set; }
    public decimal Bet { get; set; }

    public int Rank { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
