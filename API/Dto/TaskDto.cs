using System;

namespace API.Dto;

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public bool IsCompleted { get; set; } = false;
    public int UserId { get; set; }
    public string Status { get; set; } = "To Do";
}
