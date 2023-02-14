using System.Security.Claims;

namespace el_proyecte_grande_backend.Services.AuthServices
{
    public interface IAuthService
    {
        Task<ClaimsIdentity?> LoginAttemptAsync(string username, string password);
    }
}
