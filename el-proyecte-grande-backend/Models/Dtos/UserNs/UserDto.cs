using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Models.Dtos.UserNs
{
    public record UserDto(
        long Id,
        string Name,
        string Email,
        string Password,
        bool IsActive,
        List<RoleDto> Roles
        );
}
