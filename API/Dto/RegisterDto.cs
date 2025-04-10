using Microsoft.AspNetCore.Identity;

namespace API.Dto;

public class RegisterDto : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
}
