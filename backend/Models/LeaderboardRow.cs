namespace Backend.Models;

public class LeaderboardRow
{
    public int Id { get; set; }

    public string Season { get; set; } = default!;
    public string Username { get; set; } = default!;
    public string DisplayName { get; set; } = default!;

    public decimal Prize { get; set; }
    public decimal Bet { get; set; }

    public int Rank { get; set; }

    public DateTime CreatedAtUtc { get; set; }
}
