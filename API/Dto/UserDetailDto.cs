using System;

namespace API.Dto;

public class UserDetailDto
{
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string CreatedAt { get; set; } = string.Empty;
}
